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
/**
 * Abstract base class for custom error handling with support for error chaining,
 * contextual information, and retry behavior.
 *
 * @template TContext - The type of the context object, extends ErrorContext
 *
 * @example
 * ```typescript
 * class CustomError extends BaseError<{ userId: string }> {
 *   public readonly name = 'CustomError';
 *   public readonly retry = false;
 *
 *   constructor(message: string) {
 *     super({ message, context: { userId: 'user123' } });
 *   }
 * }
 * ```
 */
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super)
    /**
     * Creates a new instance of BaseError.
     *
     * @param opts - The options for creating the error
     * @param opts.message - A descriptive message about what went wrong
     * @param opts.cause - The underlying error that caused this error (optional)
     * @param opts.context - Additional contextual information about the error (optional)
     */
    function BaseError(opts) {
        var _this = _super.call(this, opts.message) || this
        _this.message = opts.message
        _this.cause = opts.cause
        _this.context = opts.context
        return _this
    }
    /**
     * Returns a string representation of the error, including the error name,
     * message, context, and cause (if any).
     *
     * @returns A formatted string containing all error information
     *
     * @example
     * ```typescript
     * const error = new CustomError("Something went wrong");
     * console.log(error.toString());
     * // Output: CustomError: Something went wrong - {"userId":"user123"} - caused by undefined
     * ```
     */
    BaseError.prototype.toString = function () {
        var _a
        return ''
            .concat(this.name, ': ')
            .concat(this.message, ' - ')
            .concat(JSON.stringify(this.context), ' - caused by ')
            .concat((_a = this.cause) === null || _a === void 0 ? void 0 : _a.toString())
    }
    return BaseError
})(Error)
export { BaseError }
