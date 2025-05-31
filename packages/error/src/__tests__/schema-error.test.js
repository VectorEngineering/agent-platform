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
import { z } from 'zod';
import { SchemaError } from '../errors/schema-error';
import { BaseError } from '../errors/base';
describe('SchemaError', function () {
    var userSchema = z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email().optional(),
        roles: z.array(z.string()),
        metadata: z.record(z.string(), z.unknown()).optional()
    });
    describe('constructor', function () {
        it('should create error with raw data', function () {
            var _a;
            var invalidData = { name: 123, age: 'invalid' };
            var error = new SchemaError({
                message: 'Invalid user data',
                context: { raw: invalidData },
            });
            expect(error.message).toBe('Invalid user data');
            expect(error.name).toBe('SchemaError');
            expect(error.retry).toBe(false);
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.raw).toBe(invalidData);
        });
        it('should be instance of correct classes', function () {
            var error = new SchemaError({
                message: 'test error',
                context: { raw: {} }
            });
            expect(error).toBeInstanceOf(SchemaError);
            expect(error).toBeInstanceOf(BaseError);
            expect(error).toBeInstanceOf(Error);
        });
        it('should handle undefined context', function () {
            var error = new SchemaError({ message: 'Schema error' });
            expect(error.context).toBeUndefined();
        });
        it('should preserve stack trace', function () {
            var error = new SchemaError({
                message: 'test error',
                context: { raw: {} }
            });
            expect(error.stack).toBeDefined();
            expect(error.stack).toContain('test error');
            expect(error.stack).toContain('schema-error.test.ts');
        });
    });
    describe('fromZod', function () {
        it('should create error from Zod error with invalid types', function () {
            var invalidData = {
                name: 123,
                age: 'invalid',
                email: 'not-an-email',
                roles: 'not-an-array',
                metadata: null
            };
            var zodError;
            try {
                userSchema.parse(invalidData);
            }
            catch (e) {
                if (e instanceof z.ZodError) {
                    zodError = e;
                }
            }
            expect(zodError).toBeDefined();
            if (!zodError)
                return;
            var error = SchemaError.fromZod(zodError, invalidData, {
                schemaName: 'userSchema'
            });
            expect(error).toBeInstanceOf(SchemaError);
            expect(error.context).toEqual({
                raw: JSON.stringify(invalidData),
                schemaName: 'userSchema'
            });
            expect(error.message).toBeTruthy();
        });
        it('should handle missing required fields', function () {
            var _a;
            var invalidData = {};
            var error;
            try {
                userSchema.parse(invalidData);
            }
            catch (e) {
                if (e instanceof z.ZodError) {
                    error = SchemaError.fromZod(e, invalidData, {
                        schemaName: 'userSchema'
                    });
                }
            }
            expect(error).toBeDefined();
            expect((_a = error === null || error === void 0 ? void 0 : error.context) === null || _a === void 0 ? void 0 : _a.raw).toBe('{}');
            expect(error === null || error === void 0 ? void 0 : error.message).toBeTruthy();
            expect(JSON.parse((error === null || error === void 0 ? void 0 : error.message) || '')).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    code: 'invalid_type',
                    message: 'Required'
                })
            ]));
        });
        it('should handle nested validation errors', function () {
            var _a;
            var nestedSchema = z.object({
                user: userSchema,
                settings: z.object({
                    theme: z.enum(['light', 'dark']),
                    notifications: z.boolean()
                })
            });
            var invalidData = {
                user: {
                    name: 'test',
                    age: 'invalid',
                    roles: []
                },
                settings: {
                    theme: 'blue',
                    notifications: 'yes'
                }
            };
            var error;
            try {
                nestedSchema.parse(invalidData);
            }
            catch (e) {
                if (e instanceof z.ZodError) {
                    error = SchemaError.fromZod(e, invalidData, {
                        schemaName: 'nestedSchema'
                    });
                }
            }
            expect(error).toBeDefined();
            expect((_a = error === null || error === void 0 ? void 0 : error.context) === null || _a === void 0 ? void 0 : _a.raw).toBe(JSON.stringify(invalidData));
            expect(error === null || error === void 0 ? void 0 : error.message).toBeTruthy();
            expect(JSON.parse((error === null || error === void 0 ? void 0 : error.message) || '')).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    code: expect.stringMatching(/invalid_type|invalid_enum_value/)
                })
            ]));
        });
        it('should handle array validation errors', function () {
            var _a;
            var arraySchema = z.array(userSchema);
            var invalidData = [
                { name: 'valid', age: 25, roles: ['user'] },
                { name: 123, age: 'invalid', roles: null },
                { name: 'missing-age', roles: [] }
            ];
            var error;
            try {
                arraySchema.parse(invalidData);
            }
            catch (e) {
                if (e instanceof z.ZodError) {
                    error = SchemaError.fromZod(e, invalidData, {
                        schemaName: 'arraySchema'
                    });
                }
            }
            expect(error).toBeDefined();
            expect((_a = error === null || error === void 0 ? void 0 : error.context) === null || _a === void 0 ? void 0 : _a.raw).toBe(JSON.stringify(invalidData));
            expect(error === null || error === void 0 ? void 0 : error.message).toBeTruthy();
            expect(JSON.parse((error === null || error === void 0 ? void 0 : error.message) || '')).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    code: 'invalid_type'
                })
            ]));
        });
    });
    describe('error handling', function () {
        it('should be catchable in try-catch block', function () {
            expect(function () {
                throw new SchemaError({
                    message: 'Schema validation failed',
                    context: { raw: {} }
                });
            }).toThrow(SchemaError);
        });
        it('should work with async/await error handling', function () { return __awaiter(void 0, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = (function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                throw new SchemaError({
                                    message: 'Async schema error',
                                    context: { raw: {} }
                                });
                            });
                        }); })();
                        return [4 /*yield*/, expect(promise).rejects.toThrow(SchemaError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should handle error chaining', function () {
            var cause = new SchemaError({
                message: 'Original validation error',
                context: { raw: {} }
            });
            var error = new SchemaError({
                message: 'Schema validation failed',
                cause: cause,
                context: { raw: {} }
            });
            expect(error.cause).toBe(cause);
            expect(error.toString()).toContain('Original validation error');
        });
    });
    describe('context handling', function () {
        it('should handle non-serializable data', function () {
            var circularRef = { prop: null };
            circularRef.prop = circularRef;
            var error = new SchemaError({
                message: 'Circular reference',
                context: { raw: circularRef }
            });
            expect(function () { var _a; return JSON.stringify((_a = error.context) === null || _a === void 0 ? void 0 : _a.raw); }).toThrow();
        });
        it('should handle undefined schema name', function () {
            var _a;
            var zodError = new z.ZodError([]);
            var error = SchemaError.fromZod(zodError, {});
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.raw).toBe('{}');
        });
    });
});
