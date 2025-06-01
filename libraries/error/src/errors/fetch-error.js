var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
                }
            return extendStatics(d, b)
        }
        return function (d, b) {
            if (typeof b !== 'function' && b !== null)
                throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
            extendStatics(d, b)
            function __() {
                this.constructor = d
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
        }
    })()
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
var FetchError = /** @class */ (function (_super) {
    __extends(FetchError, _super)
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
    function FetchError(opts) {
        var _this = _super.call(this, opts) || this
        /**
         * The name of the error class, used for error identification.
         * Uses the class name directly to ensure consistency.
         */
        _this.name = FetchError.name
        _this.retry = opts.retry
        return _this
    }
    return FetchError
})(BaseError)
export { FetchError }
