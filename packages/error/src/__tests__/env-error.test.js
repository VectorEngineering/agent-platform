var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BaseError } from '../errors/base';
import { EnvError } from '../errors/env-error';
describe('EnvError', function () {
    it('should create error with required properties', function () {
        var error = new EnvError({
            message: 'Missing environment variable',
            context: { name: 'API_KEY' },
        });
        expect(error.message).toBe('Missing environment variable');
        expect(error.name).toBe('EnvError');
        expect(error.retry).toBe(false);
        expect(error.context).toEqual({ name: 'API_KEY' });
    });
    it('should handle error without context', function () {
        var error = new EnvError({ message: 'Invalid environment variable' });
        expect(error.context).toBeUndefined();
    });
    it('should handle error with cause', function () {
        var cause = new EnvError({ message: 'Original error' });
        var error = new EnvError({
            message: 'Wrapped error',
            cause: cause,
            context: { name: 'PORT' },
        });
        expect(error.cause).toBe(cause);
    });
    describe('error properties', function () {
        it('should be instance of correct classes', function () {
            var error = new EnvError({ message: 'test error' });
            expect(error).toBeInstanceOf(EnvError);
            expect(error).toBeInstanceOf(BaseError);
            expect(error).toBeInstanceOf(Error);
        });
        it('should have non-retryable flag', function () {
            var error = new EnvError({ message: 'test error' });
            expect(error.retry).toBe(false);
        });
        it('should preserve stack trace', function () {
            var error = new EnvError({ message: 'test error' });
            expect(error.stack).toBeDefined();
            expect(error.stack).toContain('test error');
            expect(error.stack).toContain('env-error.test.ts');
        });
    });
    describe('error chaining', function () {
        it('should handle nested causes with different error types', function () {
            var _a;
            var rootCause = new EnvError({ message: 'System error' });
            var midCause = new EnvError({
                message: 'Config parsing failed',
                cause: rootCause,
                context: { name: 'DATABASE_URL' }
            });
            var error = new EnvError({
                message: 'Environment setup failed',
                cause: midCause,
                context: { name: 'APP_CONFIG' }
            });
            expect(error.cause).toBe(midCause);
            expect((_a = error.cause) === null || _a === void 0 ? void 0 : _a.cause).toBe(rootCause);
        });
        it('should properly format deeply nested errors', function () {
            var cause2 = new EnvError({
                message: 'Invalid format',
                context: { name: 'PORT' }
            });
            var cause1 = new EnvError({
                message: 'Parse error',
                context: { name: 'DATABASE_URL' },
                cause: cause2
            });
            var error = new EnvError({
                message: 'Configuration failed',
                context: { name: 'APP_CONFIG' },
                cause: cause1
            });
            expect(error.toString()).toBe('EnvError: Configuration failed - {"name":"APP_CONFIG"} - caused by ' +
                'EnvError: Parse error - {"name":"DATABASE_URL"} - caused by ' +
                'EnvError: Invalid format - {"name":"PORT"} - caused by undefined');
        });
    });
    describe('context handling', function () {
        it('should handle multiple environment variables in context', function () {
            var _a;
            var error = new EnvError({
                message: 'Multiple variables missing',
                context: { name: 'API_KEY,SECRET_KEY,DATABASE_URL' }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.name).toBe('API_KEY,SECRET_KEY,DATABASE_URL');
        });
        it('should handle special characters in variable names', function () {
            var _a;
            var error = new EnvError({
                message: 'Invalid variable name',
                context: { name: 'MY_APP_ENV_VAR$123' }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.name).toBe('MY_APP_ENV_VAR$123');
        });
        it('should handle empty variable name', function () {
            var _a;
            var error = new EnvError({
                message: 'Empty variable name',
                context: { name: '' }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.name).toBe('');
        });
    });
    describe('error handling', function () {
        it('should be catchable in try-catch block', function () {
            expect(function () {
                throw new EnvError({
                    message: 'Missing required variable',
                    context: { name: 'API_KEY' }
                });
            }).toThrow(EnvError);
        });
        it('should maintain error properties when caught', function () {
            var _a;
            try {
                throw new EnvError({
                    message: 'Missing variable',
                    context: { name: 'API_KEY' }
                });
            }
            catch (e) {
                expect(e instanceof EnvError).toBe(true);
                if (e instanceof EnvError) {
                    expect(e.message).toBe('Missing variable');
                    expect((_a = e.context) === null || _a === void 0 ? void 0 : _a.name).toBe('API_KEY');
                    expect(e.retry).toBe(false);
                }
            }
        });
        it('should work with async/await error handling', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = (function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                throw new EnvError({
                                    message: 'Async error',
                                    context: { name: 'ASYNC_VAR' }
                                });
                            });
                        }); })();
                        return [4 /*yield*/, expect(promise).rejects.toThrow(EnvError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
