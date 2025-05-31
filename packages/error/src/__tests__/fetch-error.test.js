import { BaseError } from '../errors/base';
import { FetchError } from '../errors/fetch-error';
describe('FetchError', function () {
    it('should create retryable error', function () {
        var error = new FetchError({
            message: 'Server error',
            retry: true,
            context: {
                url: 'https://api.example.com',
                method: 'GET',
                statusCode: 500,
            },
        });
        expect(error.message).toBe('Server error');
        expect(error.name).toBe('FetchError');
        expect(error.retry).toBe(true);
        expect(error.context).toEqual({
            url: 'https://api.example.com',
            method: 'GET',
            statusCode: 500,
        });
    });
    it('should create non-retryable error', function () {
        var error = new FetchError({
            message: 'Not found',
            retry: false,
            context: {
                url: 'https://api.example.com/users/123',
                method: 'GET',
                statusCode: 404,
            },
        });
        expect(error.retry).toBe(false);
    });
    it('should handle additional context properties', function () {
        var error = new FetchError({
            message: 'Timeout',
            retry: true,
            context: {
                url: 'https://api.example.com',
                method: 'POST',
                timeout: 5000,
                requestBody: { data: 'test' },
                headers: { 'Content-Type': 'application/json' },
            },
        });
        expect(error.context).toMatchObject({
            timeout: 5000,
            requestBody: { data: 'test' },
            headers: { 'Content-Type': 'application/json' },
        });
    });
    describe('error properties', function () {
        it('should be instance of correct classes', function () {
            var error = new FetchError({
                message: 'test error',
                retry: false,
                context: { url: 'https://api.example.com', method: 'GET' }
            });
            expect(error).toBeInstanceOf(FetchError);
            expect(error).toBeInstanceOf(BaseError);
            expect(error).toBeInstanceOf(Error);
        });
        it('should preserve stack trace', function () {
            var error = new FetchError({
                message: 'test error',
                retry: false,
                context: { url: 'https://api.example.com', method: 'GET' }
            });
            expect(error.stack).toBeDefined();
            expect(error.stack).toContain('test error');
            expect(error.stack).toContain('fetch-error.test.ts');
        });
    });
    describe('HTTP methods', function () {
        it.each([
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH',
            'HEAD',
            'OPTIONS'
        ])('should handle %s requests', function (method) {
            var _a;
            var error = new FetchError({
                message: "".concat(method, " request failed"),
                retry: true,
                context: {
                    url: 'https://api.example.com',
                    method: method,
                    statusCode: 500
                }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.method).toBe(method);
        });
    });
    describe('status codes', function () {
        var statusCodes = {
            '4xx': [400, 401, 403, 404, 422, 429],
            '5xx': [500, 502, 503, 504]
        };
        it.each(statusCodes['4xx'])('should handle %i client error', function (statusCode) {
            var _a;
            var error = new FetchError({
                message: 'Client error',
                retry: false,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode: statusCode
                }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.statusCode).toBe(statusCode);
            expect(error.retry).toBe(false);
        });
        it.each(statusCodes['5xx'])('should handle %i server error', function (statusCode) {
            var _a;
            var error = new FetchError({
                message: 'Server error',
                retry: true,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode: statusCode
                }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.statusCode).toBe(statusCode);
            expect(error.retry).toBe(true);
        });
    });
    describe('error chaining', function () {
        it('should handle nested network errors', function () {
            var _a;
            var rootCause = new FetchError({
                message: 'Connection reset',
                retry: false,
                context: { url: 'https://api.example.com', method: 'GET' }
            });
            var networkError = new FetchError({
                message: 'Network failure',
                retry: true,
                cause: rootCause,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode: 0
                }
            });
            var requestError = new FetchError({
                message: 'Request failed',
                retry: false,
                cause: networkError,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode: null
                }
            });
            expect(requestError.cause).toBe(networkError);
            expect((_a = requestError.cause) === null || _a === void 0 ? void 0 : _a.cause).toBe(rootCause);
        });
        it('should format nested errors correctly', function () {
            var cause = new FetchError({
                message: 'Timeout',
                retry: true,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    timeout: 5000
                }
            });
            var error = new FetchError({
                message: 'Request failed',
                retry: false,
                cause: cause,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    requestBody: { data: 'test' }
                }
            });
            expect(error.toString()).toContain('Request failed');
            expect(error.toString()).toContain('Timeout');
            expect(error.toString()).toContain('requestBody');
            expect(error.toString()).toContain('timeout');
        });
    });
    describe('context handling', function () {
        it('should handle URLs with query parameters', function () {
            var _a;
            var error = new FetchError({
                message: 'Failed request',
                retry: false,
                context: {
                    url: 'https://api.example.com/users?page=1&limit=10',
                    method: 'GET',
                    params: { page: 1, limit: 10 }
                }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.url).toContain('?page=1&limit=10');
        });
        it('should handle complex request bodies', function () {
            var _a;
            var requestBody = {
                user: { id: 1, name: 'test' },
                metadata: { timestamp: new Date().toISOString() },
                options: { nested: { deep: true } }
            };
            var error = new FetchError({
                message: 'Failed request',
                retry: false,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    requestBody: requestBody
                }
            });
            expect((_a = error.context) === null || _a === void 0 ? void 0 : _a.requestBody).toEqual(requestBody);
        });
        it('should handle various header combinations', function () {
            var _a, _b, _c, _d;
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token',
                'X-Custom-Header': 'value',
                'Accept-Language': 'en-US'
            };
            var error = new FetchError({
                message: 'Failed request',
                retry: false,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    headers: headers
                }
            });
            expect((_b = (_a = error.context) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['Content-Type']).toBe('application/json');
            expect((_d = (_c = error.context) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d['Authorization']).toBe('Bearer token');
        });
    });
});
