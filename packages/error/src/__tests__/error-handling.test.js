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
import { Err, Ok, wrap } from '../error-handling';
import { FetchError } from '../errors/fetch-error';
describe('Result type utilities', function () {
    describe('Ok', function () {
        it('should create successful result with value', function () {
            var result = Ok({ id: 1, name: 'test' });
            expect(result.val).toEqual({ id: 1, name: 'test' });
            expect(result.err).toBeUndefined();
        });
        it('should create successful result with no value', function () {
            var result = Ok();
            expect(result.val).toBeUndefined();
            expect(result.err).toBeUndefined();
        });
        it('should handle complex object values', function () {
            var complexValue = {
                user: { id: 1, name: 'test' },
                metadata: { timestamp: new Date(), tags: ['a', 'b'] },
                nested: { deep: { deeper: { value: 42 } } }
            };
            var result = Ok(complexValue);
            expect(result.val).toEqual(complexValue);
        });
        it('should handle primitive values', function () {
            expect(Ok(42).val).toBe(42);
            expect(Ok('string').val).toBe('string');
            expect(Ok(true).val).toBe(true);
            expect(Ok(null).val).toBeNull();
        });
    });
    describe('Err', function () {
        it('should create error result', function () {
            var error = new FetchError({
                message: 'Failed',
                retry: true,
                context: { url: 'test', method: 'GET' },
            });
            var result = Err(error);
            expect(result.err).toBe(error);
            expect(result.val).toBeUndefined();
        });
        it('should handle error with cause chain', function () {
            var _a;
            var rootCause = new FetchError({
                message: 'Network timeout',
                retry: true,
                context: { url: 'test', method: 'GET' }
            });
            var error = new FetchError({
                message: 'Failed',
                retry: false,
                cause: rootCause,
                context: { url: 'test', method: 'GET' }
            });
            var result = Err(error);
            expect(result.err).toBe(error);
            expect((_a = result.err) === null || _a === void 0 ? void 0 : _a.cause).toBe(rootCause);
        });
        it('should preserve error context', function () {
            var _a;
            var context = { url: 'test', method: 'POST', body: { data: 'test' } };
            var error = new FetchError({
                message: 'Failed',
                retry: true,
                context: context
            });
            var result = Err(error);
            expect((_a = result.err) === null || _a === void 0 ? void 0 : _a.context).toEqual(context);
        });
    });
    describe('wrap', function () {
        it('should wrap successful promise', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = Promise.resolve({ data: 'test' });
                        return [4 /*yield*/, wrap(promise, function (e) { return new FetchError({
                                message: e.message,
                                retry: true,
                                context: { url: 'test', method: 'GET' },
                            }); })];
                    case 1:
                        result = _a.sent();
                        expect(result.val).toEqual({ data: 'test' });
                        expect(result.err).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should wrap failed promise', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promise = Promise.reject(new Error('Network error'));
                        return [4 /*yield*/, wrap(promise, function (e) { return new FetchError({
                                message: e.message,
                                retry: true,
                                context: { url: 'test', method: 'GET' },
                            }); })];
                    case 1:
                        result = _b.sent();
                        expect(result.val).toBeUndefined();
                        expect(result.err).toBeInstanceOf(FetchError);
                        expect((_a = result.err) === null || _a === void 0 ? void 0 : _a.message).toBe('Network error');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle promise rejection with non-Error objects', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promise = Promise.reject('string error');
                        return [4 /*yield*/, wrap(promise, function (e) { return new FetchError({
                                message: String(e),
                                retry: false,
                                context: { url: 'test', method: 'GET' }
                            }); })];
                    case 1:
                        result = _b.sent();
                        expect((_a = result.err) === null || _a === void 0 ? void 0 : _a.message).toBe('string error');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle async errors in error mapping function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promise = Promise.reject(new Error('Original error'));
                        return [4 /*yield*/, wrap(promise, function (e) { return new FetchError({
                                message: 'Mapper error',
                                retry: false,
                                context: { url: 'test', method: 'GET' }
                            }); })];
                    case 1:
                        result = _b.sent();
                        expect((_a = result.err) === null || _a === void 0 ? void 0 : _a.message).toBe('Mapper error');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle null/undefined promise values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var nullPromise, nullResult, undefinedPromise, undefinedResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nullPromise = Promise.resolve(null);
                        return [4 /*yield*/, wrap(nullPromise, function (e) { return new FetchError({ message: e.message, retry: false }); })];
                    case 1:
                        nullResult = _a.sent();
                        expect(nullResult.val).toBeNull();
                        undefinedPromise = Promise.resolve(undefined);
                        return [4 /*yield*/, wrap(undefinedPromise, function (e) { return new FetchError({ message: e.message, retry: false }); })];
                    case 2:
                        undefinedResult = _a.sent();
                        expect(undefinedResult.val).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Result type usage patterns', function () {
        // Helper function to simulate an API call
        function fetchData(shouldSucceed) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (shouldSucceed) {
                        return [2 /*return*/, Ok({ data: 'success' })];
                    }
                    return [2 /*return*/, Err(new FetchError({
                            message: 'Failed to fetch',
                            retry: true,
                            context: { url: 'test', method: 'GET' }
                        }))];
                });
            });
        }
        it('should handle successful chain of operations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchData(true)];
                    case 1:
                        result = _a.sent();
                        if (result.val) {
                            expect(result.val.data).toBe('success');
                        }
                        else {
                            fail('Expected successful result');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle failed chain of operations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchData(false)];
                    case 1:
                        result = _a.sent();
                        if (result.err) {
                            expect(result.err.message).toBe('Failed to fetch');
                            expect(result.err.retry).toBe(true);
                        }
                        else {
                            fail('Expected error result');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with type narrowing', function () {
            function processResult(result) {
                if (result.val !== undefined) {
                    // TypeScript should recognize this as number
                    var num = result.val;
                    expect(typeof num).toBe('number');
                }
                else {
                    // TypeScript should recognize this as FetchError
                    var error = result.err;
                    expect(error).toBeInstanceOf(FetchError);
                }
            }
            processResult(Ok(42));
            processResult(Err(new FetchError({ message: 'error', retry: false })));
        });
    });
});
