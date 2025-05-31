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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { BaseError } from "./base";
/**
 * Error class for environment variable configuration issues.
 * Used when environment variables are missing, malformed, or have invalid values.
 *
 * @extends BaseError<{ name: string }>
 *
 * @example
 * ```typescript
 * // When an environment variable is missing
 * throw new EnvError({
 *   message: "Required environment variable not found",
 *   context: { name: "API_KEY" }
 * });
 *
 * // When an environment variable has an invalid value
 * throw new EnvError({
 *   message: "Environment variable must be a number",
 *   context: { name: "MAX_RETRIES" }
 * });
 * ```
 *
 * @remarks
 * This error is non-retryable as environment configuration issues
 * typically require manual intervention to resolve.
 */
var EnvError = /** @class */ (function (_super) {
    __extends(EnvError, _super);
    function EnvError() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        /**
         * Always false as environment configuration errors cannot be resolved
         * through retries - they require configuration changes.
         */
        _this.retry = false;
        /**
         * The name of the error class, used for error identification.
         * Uses the class name directly to ensure consistency.
         */
        _this.name = EnvError.name;
        return _this;
    }
    return EnvError;
}(BaseError));
export { EnvError };
