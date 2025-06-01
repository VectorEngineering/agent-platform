import { BaseError } from '../errors/base'
import { FetchError } from '../errors/fetch-error'

describe('FetchError', () => {
    it('should create retryable error', () => {
        const error = new FetchError({
            message: 'Server error',
            retry: true,
            context: {
                url: 'https://api.example.com',
                method: 'GET',
                statusCode: 500
            }
        })

        expect(error.message).toBe('Server error')
        expect(error.name).toBe('FetchError')
        expect(error.retry).toBe(true)
        expect(error.context).toEqual({
            url: 'https://api.example.com',
            method: 'GET',
            statusCode: 500
        })
    })

    it('should create non-retryable error', () => {
        const error = new FetchError({
            message: 'Not found',
            retry: false,
            context: {
                url: 'https://api.example.com/users/123',
                method: 'GET',
                statusCode: 404
            }
        })

        expect(error.retry).toBe(false)
    })

    it('should handle additional context properties', () => {
        const error = new FetchError({
            message: 'Timeout',
            retry: true,
            context: {
                url: 'https://api.example.com',
                method: 'POST',
                timeout: 5000,
                requestBody: { data: 'test' },
                headers: { 'Content-Type': 'application/json' }
            }
        })

        expect(error.context).toMatchObject({
            timeout: 5000,
            requestBody: { data: 'test' },
            headers: { 'Content-Type': 'application/json' }
        })
    })

    describe('error properties', () => {
        it('should be instance of correct classes', () => {
            const error = new FetchError({
                message: 'test error',
                retry: false,
                context: { url: 'https://api.example.com', method: 'GET' }
            })
            expect(error).toBeInstanceOf(FetchError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error).toBeInstanceOf(Error)
        })

        it('should preserve stack trace', () => {
            const error = new FetchError({
                message: 'test error',
                retry: false,
                context: { url: 'https://api.example.com', method: 'GET' }
            })
            expect(error.stack).toBeDefined()
            expect(error.stack).toContain('test error')
            expect(error.stack).toContain('fetch-error.test.ts')
        })
    })

    describe('HTTP methods', () => {
        it.each(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])('should handle %s requests', (method) => {
            const error = new FetchError({
                message: `${method} request failed`,
                retry: true,
                context: {
                    url: 'https://api.example.com',
                    method,
                    statusCode: 500
                }
            })
            expect(error.context?.method).toBe(method)
        })
    })

    describe('status codes', () => {
        const statusCodes = {
            '4xx': [400, 401, 403, 404, 422, 429],
            '5xx': [500, 502, 503, 504]
        }

        it.each(statusCodes['4xx'])('should handle %i client error', (statusCode) => {
            const error = new FetchError({
                message: 'Client error',
                retry: false,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode
                }
            })
            expect(error.context?.statusCode).toBe(statusCode)
            expect(error.retry).toBe(false)
        })

        it.each(statusCodes['5xx'])('should handle %i server error', (statusCode) => {
            const error = new FetchError({
                message: 'Server error',
                retry: true,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode
                }
            })
            expect(error.context?.statusCode).toBe(statusCode)
            expect(error.retry).toBe(true)
        })
    })

    describe('error chaining', () => {
        it('should handle nested network errors', () => {
            const rootCause = new FetchError({
                message: 'Connection reset',
                retry: false,
                context: { url: 'https://api.example.com', method: 'GET' }
            })
            const networkError = new FetchError({
                message: 'Network failure',
                retry: true,
                cause: rootCause,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode: 0
                }
            })
            const requestError = new FetchError({
                message: 'Request failed',
                retry: false,
                cause: networkError,
                context: {
                    url: 'https://api.example.com',
                    method: 'GET',
                    statusCode: null
                }
            })

            expect(requestError.cause).toBe(networkError)
            expect(requestError.cause?.cause).toBe(rootCause)
        })

        it('should format nested errors correctly', () => {
            const cause = new FetchError({
                message: 'Timeout',
                retry: true,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    timeout: 5000
                }
            })
            const error = new FetchError({
                message: 'Request failed',
                retry: false,
                cause,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    requestBody: { data: 'test' }
                }
            })

            expect(error.toString()).toContain('Request failed')
            expect(error.toString()).toContain('Timeout')
            expect(error.toString()).toContain('requestBody')
            expect(error.toString()).toContain('timeout')
        })
    })

    describe('context handling', () => {
        it('should handle URLs with query parameters', () => {
            const error = new FetchError({
                message: 'Failed request',
                retry: false,
                context: {
                    url: 'https://api.example.com/users?page=1&limit=10',
                    method: 'GET',
                    params: { page: 1, limit: 10 }
                }
            })
            expect(error.context?.url).toContain('?page=1&limit=10')
        })

        it('should handle complex request bodies', () => {
            const requestBody = {
                user: { id: 1, name: 'test' },
                metadata: { timestamp: new Date().toISOString() },
                options: { nested: { deep: true } }
            }

            const error = new FetchError({
                message: 'Failed request',
                retry: false,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    requestBody
                }
            })
            expect(error.context?.requestBody).toEqual(requestBody)
        })

        it('should handle various header combinations', () => {
            type Headers = {
                'Content-Type': string
                Authorization: string
                'X-Custom-Header': string
                'Accept-Language': string
            }

            const headers: Headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer token',
                'X-Custom-Header': 'value',
                'Accept-Language': 'en-US'
            }

            const error = new FetchError({
                message: 'Failed request',
                retry: false,
                context: {
                    url: 'https://api.example.com',
                    method: 'POST',
                    headers
                }
            })
            expect((error.context?.headers as Headers)?.['Content-Type']).toBe('application/json')
            expect((error.context?.headers as Headers)?.['Authorization']).toBe('Bearer token')
        })
    })
})
