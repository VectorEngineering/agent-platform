import 'server-only'

import { Duration, Ratelimit } from '@upstash/ratelimit'

import { client } from '.'

/**
 * Configuration options for rate limiting.
 * @interface RateLimitConfig
 */
export interface RateLimitConfig {
    /** Maximum number of requests allowed per window */
    limit: number
    /** Time window duration in seconds or formatted string (e.g., "10s", "1m", "1h") */
    window: Duration
    /** Optional prefix for Redis keys to prevent collisions */
    prefix?: string
    /** Optional timeout for Redis operations in milliseconds */
    timeout?: number
    /** Optional flag to enable analytics (counts total requests, blocked requests, etc.) */
    analytics?: boolean
}

/**
 * Result of a rate limit check.
 * @interface RateLimitResult
 */
export interface RateLimitResult {
    /** Whether the request is allowed */
    success: boolean
    /** Number of remaining requests in the current window */
    remaining: number
    /** Unix timestamp (in seconds) when the current window expires */
    reset: number
    /** Total number of requests allowed per window */
    limit: number
}

/**
 * Default configuration for rate limiting.
 * @const defaultConfig
 */
const defaultConfig: RateLimitConfig = {
    limit: 10,
    window: '10 s',
    prefix: 'ratelimit',
    timeout: 1000,
    analytics: false
}

/**
 * Creates a rate limiter instance with the specified configuration.
 *
 * @param {Partial<RateLimitConfig>} config - Optional configuration to override defaults
 * @returns {Ratelimit} A configured rate limiter instance
 *
 * @example
 * ```typescript
 * // Create a rate limiter with custom configuration
 * const customLimiter = createRateLimiter({
 *   limit: 100,
 *   window: "1m",
 *   prefix: "api",
 *   analytics: true
 * });
 *
 * // Basic usage
 * const result = await customLimiter.limit("user_123");
 * if (!result.success) {
 *   throw new Error("Too many requests");
 * }
 * ```
 *
 * @throws {Error} If Redis client is not properly configured
 */
export function createRateLimiter(config: Partial<RateLimitConfig> = {}): Ratelimit {
    const finalConfig = { ...defaultConfig, ...config }

    return new Ratelimit({
        redis: client,
        limiter: Ratelimit.fixedWindow(finalConfig.limit, finalConfig.window),
        prefix: finalConfig.prefix,
        timeout: finalConfig.timeout,
        analytics: finalConfig.analytics
    })
}

/**
 * Default rate limiter instance configured with fixed window strategy.
 * Uses the default configuration:
 * - 10 requests per window
 * - 10 second window duration
 * - "ratelimit" prefix for Redis keys
 * - 1000ms timeout for Redis operations
 * - Analytics disabled
 *
 * @example
 * ```typescript
 * // Basic usage
 * const result = await ratelimit.limit("user_123");
 * if (!result.success) {
 *   throw new Error("Too many requests");
 * }
 *
 * // With detailed response handling
 * const result = await ratelimit.limit("user_123");
 * console.log(`Remaining requests: ${result.remaining}`);
 * console.log(`Window resets at: ${new Date(result.reset * 1000).toISOString()}`);
 * ```
 */
export const ratelimit = createRateLimiter()

// Type definitions for framework-specific middleware
type GenericRequest = {
    headers: { [key: string]: string | string[] | undefined }
    socket?: { remoteAddress?: string }
}

type GenericResponse = {
    status(code: number): GenericResponse
    setHeader?(name: string, value: string | number): void
    header?(name: string, value: string): void
    json(body: unknown, status?: number): unknown
}

/**
 * Generic middleware function type
 */
type MiddlewareFunction<TRequest, TResponse, TNext = () => Promise<void>> = (
    req: TRequest,
    res: TResponse,
    next?: TNext
) => Promise<unknown>

/**
 * Creates a middleware function for handling rate limiting in HTTP servers.
 * This is a framework-agnostic implementation that can be adapted to various HTTP frameworks.
 *
 * @param {Ratelimit} limiter - Rate limiter instance to use
 * @param {object} options - Middleware options
 * @param {(req: TRequest) => string} [options.getIdentifier] - Function to extract identifier from request
 * @param {boolean} [options.throwError] - Whether to throw error instead of sending response
 * @returns {MiddlewareFunction} Middleware function
 *
 * @example
 * ```typescript
 * // Basic usage with Next.js API routes
 * import { NextApiRequest, NextApiResponse } from 'next';
 *
 * const apiLimiter = createRateLimiter({ limit: 50, window: "1m" });
 * const middleware = createMiddleware(apiLimiter);
 *
 * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *   try {
 *     await middleware(req, res);
 *     // Handle the request...
 *   } catch (error) {
 *     if (error instanceof RateLimitError) {
 *       return res.status(429).json({ error: error.message });
 *     }
 *     throw error;
 *   }
 * }
 * ```
 */
export function createMiddleware<TRequest extends GenericRequest = GenericRequest, TResponse extends GenericResponse = GenericResponse>(
    limiter: Ratelimit,
    options: {
        getIdentifier?: (req: TRequest) => string
        throwError?: boolean
    } = {}
): MiddlewareFunction<TRequest, TResponse> {
    return async (req: TRequest, res: TResponse) => {
        const identifier =
            options.getIdentifier?.(req) ||
            (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for']) ||
            req.socket?.remoteAddress ||
            '127.0.0.1'

        const result = await limiter.limit(String(identifier))

        if (!result.success) {
            const headers = {
                'Retry-After': String(result.reset),
                'X-RateLimit-Limit': String(result.limit),
                'X-RateLimit-Remaining': String(result.remaining),
                'X-RateLimit-Reset': String(result.reset)
            }

            if (options.throwError) {
                const error = new Error('Too Many Requests') as Error & {
                    status?: number
                    headers?: typeof headers
                }
                error.status = 429
                error.headers = headers
                throw error
            }

            // Set headers using the appropriate method
            const setHeader = (name: string, value: string) => {
                if (res.setHeader) {
                    res.setHeader(name, value)
                } else if (res.header) {
                    res.header(name, value)
                }
            }

            setHeader('Retry-After', String(result.reset))
            setHeader('X-RateLimit-Limit', String(result.limit))
            setHeader('X-RateLimit-Remaining', String(result.remaining))
            setHeader('X-RateLimit-Reset', String(result.reset))

            return res.json(
                {
                    error: 'Too Many Requests',
                    retryAfter: new Date(result.reset * 1000).toISOString()
                },
                429
            )
        }

        return result
    }
}

/**
 * Error class for rate limit errors
 */
export class RateLimitError extends Error {
    constructor(message: string, public readonly status: number = 429, public readonly headers?: Record<string, string>) {
        super(message)
        this.name = 'RateLimitError'
    }
}
