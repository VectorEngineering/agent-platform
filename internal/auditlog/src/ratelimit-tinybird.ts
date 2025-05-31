import { z } from 'zod'

// Enhanced sharding options
export const sharding = z.enum(['edge', 'global', 'regional', 'zone', 'custom'])

// Rate limit strategies
export const rateLimitStrategy = z.enum(['fixed_window', 'sliding_window', 'token_bucket', 'leaky_bucket', 'adaptive'])

// Priority levels for rate limit rules
export const priorityLevel = z.enum(['critical', 'high', 'medium', 'low', 'custom'])

export const ratelimitSchemaV1 = z.object({
    // Core identifiers
    workspaceId: z.string().describe('The workspace owning this rate limit'),
    namespaceId: z.string().describe('Namespace for grouping related rate limits'),
    requestId: z.string().describe('Unique identifier for the request'),
    identifier: z.string().describe('Target identifier for rate limiting'),

    // Timing and performance metrics
    time: z.number().describe('Timestamp of the rate limit check'),
    serviceLatency: z.number().nonnegative(),
    requestStartTime: z.number().optional().describe('When the request started'),
    requestEndTime: z.number().optional().describe('When the request completed'),

    // Rate limit status
    success: z.boolean().describe('Whether the request was allowed'),
    remaining: z.number().min(0, 'Remaining requests must be non-negative'),
    reset: z.number().optional().describe('Timestamp when the limit resets'),
    retryAfter: z.number().optional().describe('Seconds until retry is allowed'),

    // Enhanced configuration
    config: z.object({
        limit: z.number().positive('Limit must be greater than 0'),
        duration: z.number().positive('Duration must be greater than 0'),
        async: z.boolean(),
        sharding: sharding.optional().default('global'),
        strategy: rateLimitStrategy.optional().default('fixed_window'),
        priority: priorityLevel.optional().default('medium'),

        // Advanced configuration
        burst: z.number().int().optional().describe('Allowed burst size'),
        costPerRequest: z.number().optional().describe('Request cost multiplier'),
        grouping: z.array(z.string()).optional().describe('Group related limits'),
        bypassTokens: z.array(z.string()).optional().describe('Bypass tokens'),

        // Quota management
        quotaPolicy: z
            .object({
                resetPeriod: z.string().optional(), // e.g., "daily", "monthly"
                carryOver: z.boolean().optional(),
                gracePeriod: z.number().optional(),
                overageAllowed: z.boolean().optional(),
                overageLimit: z.number().optional()
            })
            .optional(),

        // Circuit breaker
        circuitBreaker: z
            .object({
                enabled: z.boolean().optional(),
                errorThreshold: z.number().optional(),
                breakDuration: z.number().optional(),
                halfOpenRequests: z.number().optional()
            })
            .optional()
    }),

    // Enhanced context
    context: z.object({
        // Request context
        ipAddress: z.string(),
        userAgent: z.string().optional().default(''),
        method: z.string().optional(),
        path: z.string().optional(),
        protocol: z.string().optional(),

        // Geo information
        country: z.string().optional().default(''),
        continent: z.string().optional().default(''),
        city: z.string().optional().default(''),
        colo: z.string().optional().default(''),
        region: z.string().optional(),
        timezone: z.string().optional(),

        // Client information
        clientId: z.string().optional(),
        clientType: z.string().optional(),
        clientVersion: z.string().optional(),
        sdkVersion: z.string().optional(),

        // Request metadata
        headers: z.record(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        priority: z.number().optional(),

        // Security context
        authenticated: z.boolean().optional(),
        authMethod: z.string().optional(),
        roles: z.array(z.string()).optional(),
        permissions: z.array(z.string()).optional(),

        // Error handling
        errorCode: z.string().optional(),
        errorMessage: z.string().optional(),
        backoffMultiplier: z.number().optional()
    }),

    // Metrics and monitoring
    metrics: z
        .object({
            concurrentRequests: z.number().optional(),
            requestSize: z.number().optional(),
            responseSize: z.number().optional(),
            processingTime: z.number().optional(),
            queueTime: z.number().optional(),
            upstreamLatency: z.number().optional(),

            // Resource usage
            cpuTime: z.number().optional(),
            memoryUsage: z.number().optional(),
            ioOperations: z.number().optional(),

            // Custom metrics
            customMetrics: z.record(z.number()).optional()
        })
        .optional()
})

// Type for rate limit response
export type RateLimitResponse = z.infer<typeof ratelimitSchemaV1>
