import { BaseError } from './base'

/**
 * Error class for handling HTTP/HTTPS request failures.
 * Used to wrap and enhance network-related errors with additional context.
 *
 * @extends BaseError
 *
 * @example
 * ```typescript
 * // For a failed API request
 * throw new FetchError({
 *   message: "Failed to fetch user data",
 *   retry: true,
 *   context: {
 *     url: "https://api.example.com/users",
 *     method: "GET",
 *     statusCode: 503,
 *     responseTime: 1500
 *   }
 * });
 *
 * // For a network timeout
 * throw new FetchError({
 *   message: "Request timed out",
 *   retry: true,
 *   context: {
 *     url: "https://api.example.com/data",
 *     method: "POST",
 *     timeout: 5000
 *   }
 * });
 * ```
 */
export class FetchError extends BaseError<{
    /**
     * The URL that was being accessed when the error occurred
     */
    url: string

    /**
     * The HTTP method used for the request (GET, POST, etc.)
     */
    method: string

    /**
     * Additional context properties that might be relevant to the error
     * Examples: statusCode, responseTime, requestHeaders, responseBody
     */
    [more: string]: unknown
}> {
    /**
     * Indicates whether the failed request can be retried.
     * True for transient errors (timeouts, 5xx responses),
     * False for permanent failures (4xx responses, invalid URLs)
     */
    public readonly retry: boolean

    /**
     * The name of the error class, used for error identification.
     * Uses the class name directly to ensure consistency.
     */
    public readonly name = FetchError.name

    /**
     * Creates a new FetchError instance.
     *
     * @param opts - The options for creating the error
     * @param opts.message - A descriptive message about what went wrong
     * @param opts.retry - Whether the operation should be retried
     * @param opts.cause - The underlying error that caused this error (optional)
     * @param opts.context - Additional context about the failed request (optional)
     * @param opts.context.url - The URL that was being accessed
     * @param opts.context.method - The HTTP method used
     * @param opts.context[more] - Any additional context properties
     *
     * @example
     * ```typescript
     * const error = new FetchError({
     *   message: "API request failed",
     *   retry: true,
     *   context: {
     *     url: "https://api.example.com",
     *     method: "POST",
     *     statusCode: 500,
     *     body: requestBody
     *   }
     * });
     * ```
     */
    constructor(opts: {
        message: string
        retry: boolean
        cause?: BaseError
        context?: {
            url: string
            method: string
            [more: string]: unknown
        }
    }) {
        super(opts)
        this.retry = opts.retry
    }
}
