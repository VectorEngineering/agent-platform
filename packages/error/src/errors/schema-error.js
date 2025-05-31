var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BaseError } from "./base";
/**
 * Error class for schema validation failures.
 * Used when data doesn't conform to its expected structure or type definition.
 *
 * @extends BaseError<{ raw: unknown }>
 *
 * @example
 * ```typescript
 * // Direct instantiation
 * throw new SchemaError({
 *   message: "Invalid user data",
 *   context: {
 *     raw: invalidUserData
 *   }
 * });
 *
 * // Using with Zod
 * try {
 *   userSchema.parse(data);
 * } catch (error) {
 *   if (error instanceof ZodError) {
 *     throw SchemaError.fromZod(error, data, {
 *       userId: data.id,
 *       operation: 'createUser'
 *     });
 *   }
 * }
 * ```
 *
 * @remarks
 * This error is non-retryable as schema validation failures are deterministic -
 * the same input will always fail validation in the same way.
 */
var SchemaError = /** @class */ (function (_super) {
    __extends(SchemaError, _super);
    /**
     * Creates a new SchemaError instance.
     *
     * @param opts - The options for creating the error
     * @param opts.message - A descriptive message about what validation failed
     * @param opts.context - Contains the raw data that failed validation
     * @param opts.cause - The underlying error that caused this error (optional)
     */
    function SchemaError(opts) {
        var _this = _super.call(this, __assign({}, opts)) || this;
        /**
         * Always false as schema validation errors are deterministic
         * and won't be resolved by retrying.
         */
        _this.retry = false;
        /**
         * The name of the error class, used for error identification.
         * Uses the class name directly to ensure consistency.
         */
        _this.name = SchemaError.name;
        return _this;
    }
    /**
     * Creates a SchemaError from a Zod validation error.
     * Provides a convenient way to convert Zod errors into SchemaErrors.
     *
     * @param e - The Zod error that occurred during validation
     * @param raw - The raw data that failed validation
     * @param context - Additional context to include in the error (optional)
     * @returns A new SchemaError instance
     *
     * @example
     * ```typescript
     * const userSchema = z.object({
     *   name: z.string(),
     *   age: z.number()
     * });
     *
     * try {
     *   userSchema.parse(invalidData);
     * } catch (error) {
     *   if (error instanceof ZodError) {
     *     throw SchemaError.fromZod(error, invalidData, {
     *       validatedAt: new Date(),
     *       schemaVersion: '1.0'
     *     });
     *   }
     * }
     * ```
     */
    SchemaError.fromZod = function (e, raw, context) {
        return new SchemaError({
            message: e.message,
            context: __assign({ raw: JSON.stringify(raw) }, context),
        });
    };
    return SchemaError;
}(BaseError));
export { SchemaError };
