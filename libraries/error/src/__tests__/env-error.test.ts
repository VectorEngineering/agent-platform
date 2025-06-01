import { BaseError } from '../errors/base'
import { EnvError } from '../errors/env-error'

describe('EnvError', () => {
    it('should create error with required properties', () => {
        const error = new EnvError({
            message: 'Missing environment variable',
            context: { name: 'API_KEY' }
        })

        expect(error.message).toBe('Missing environment variable')
        expect(error.name).toBe('EnvError')
        expect(error.retry).toBe(false)
        expect(error.context).toEqual({ name: 'API_KEY' })
    })

    it('should handle error without context', () => {
        const error = new EnvError({ message: 'Invalid environment variable' })
        expect(error.context).toBeUndefined()
    })

    it('should handle error with cause', () => {
        const cause = new EnvError({ message: 'Original error' })
        const error = new EnvError({
            message: 'Wrapped error',
            cause,
            context: { name: 'PORT' }
        })

        expect(error.cause).toBe(cause)
    })

    describe('error properties', () => {
        it('should be instance of correct classes', () => {
            const error = new EnvError({ message: 'test error' })
            expect(error).toBeInstanceOf(EnvError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error).toBeInstanceOf(Error)
        })

        it('should have non-retryable flag', () => {
            const error = new EnvError({ message: 'test error' })
            expect(error.retry).toBe(false)
        })

        it('should preserve stack trace', () => {
            const error = new EnvError({ message: 'test error' })
            expect(error.stack).toBeDefined()
            expect(error.stack).toContain('test error')
            expect(error.stack).toContain('env-error.test.ts')
        })
    })

    describe('error chaining', () => {
        it('should handle nested causes with different error types', () => {
            const rootCause = new EnvError({ message: 'System error' })
            const midCause = new EnvError({
                message: 'Config parsing failed',
                cause: rootCause,
                context: { name: 'DATABASE_URL' }
            })
            const error = new EnvError({
                message: 'Environment setup failed',
                cause: midCause,
                context: { name: 'APP_CONFIG' }
            })

            expect(error.cause).toBe(midCause)
            expect(error.cause?.cause).toBe(rootCause)
        })

        it('should properly format deeply nested errors', () => {
            const cause2 = new EnvError({
                message: 'Invalid format',
                context: { name: 'PORT' }
            })
            const cause1 = new EnvError({
                message: 'Parse error',
                context: { name: 'DATABASE_URL' },
                cause: cause2
            })
            const error = new EnvError({
                message: 'Configuration failed',
                context: { name: 'APP_CONFIG' },
                cause: cause1
            })

            expect(error.toString()).toBe(
                'EnvError: Configuration failed - {"name":"APP_CONFIG"} - caused by ' +
                    'EnvError: Parse error - {"name":"DATABASE_URL"} - caused by ' +
                    'EnvError: Invalid format - {"name":"PORT"} - caused by undefined'
            )
        })
    })

    describe('context handling', () => {
        it('should handle multiple environment variables in context', () => {
            const error = new EnvError({
                message: 'Multiple variables missing',
                context: { name: 'API_KEY,SECRET_KEY,DATABASE_URL' }
            })
            expect(error.context?.name).toBe('API_KEY,SECRET_KEY,DATABASE_URL')
        })

        it('should handle special characters in variable names', () => {
            const error = new EnvError({
                message: 'Invalid variable name',
                context: { name: 'MY_APP_ENV_VAR$123' }
            })
            expect(error.context?.name).toBe('MY_APP_ENV_VAR$123')
        })

        it('should handle empty variable name', () => {
            const error = new EnvError({
                message: 'Empty variable name',
                context: { name: '' }
            })
            expect(error.context?.name).toBe('')
        })
    })

    describe('error handling', () => {
        it('should be catchable in try-catch block', () => {
            expect(() => {
                throw new EnvError({
                    message: 'Missing required variable',
                    context: { name: 'API_KEY' }
                })
            }).toThrow(EnvError)
        })

        it('should maintain error properties when caught', () => {
            try {
                throw new EnvError({
                    message: 'Missing variable',
                    context: { name: 'API_KEY' }
                })
            } catch (e) {
                expect(e instanceof EnvError).toBe(true)
                if (e instanceof EnvError) {
                    expect(e.message).toBe('Missing variable')
                    expect(e.context?.name).toBe('API_KEY')
                    expect(e.retry).toBe(false)
                }
            }
        })

        it('should work with async/await error handling', async () => {
            const promise = (async () => {
                throw new EnvError({
                    message: 'Async error',
                    context: { name: 'ASYNC_VAR' }
                })
            })()

            await expect(promise).rejects.toThrow(EnvError)
        })
    })
})
