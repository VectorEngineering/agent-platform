import type { Result } from '../error-handling'
import { Err, Ok, wrap } from '../error-handling'
import { FetchError } from '../errors/fetch-error'

describe('Result type utilities', () => {
    describe('Ok', () => {
        it('should create successful result with value', () => {
            const result = Ok({ id: 1, name: 'test' })
            expect(result.val).toEqual({ id: 1, name: 'test' })
            expect(result.err).toBeUndefined()
        })

        it('should create successful result with no value', () => {
            const result = Ok()
            expect(result.val).toBeUndefined()
            expect(result.err).toBeUndefined()
        })

        it('should handle complex object values', () => {
            const complexValue = {
                user: { id: 1, name: 'test' },
                metadata: { timestamp: new Date(), tags: ['a', 'b'] },
                nested: { deep: { deeper: { value: 42 } } }
            }
            const result = Ok(complexValue)
            expect(result.val).toEqual(complexValue)
        })

        it('should handle primitive values', () => {
            expect(Ok(42).val).toBe(42)
            expect(Ok('string').val).toBe('string')
            expect(Ok(true).val).toBe(true)
            expect(Ok(null).val).toBeNull()
        })
    })

    describe('Err', () => {
        it('should create error result', () => {
            const error = new FetchError({
                message: 'Failed',
                retry: true,
                context: { url: 'test', method: 'GET' }
            })
            const result = Err(error)
            expect(result.err).toBe(error)
            expect(result.val).toBeUndefined()
        })

        it('should handle error with cause chain', () => {
            const rootCause = new FetchError({
                message: 'Network timeout',
                retry: true,
                context: { url: 'test', method: 'GET' }
            })
            const error = new FetchError({
                message: 'Failed',
                retry: false,
                cause: rootCause,
                context: { url: 'test', method: 'GET' }
            })

            const result = Err(error)
            expect(result.err).toBe(error)
            expect(result.err?.cause).toBe(rootCause)
        })

        it('should preserve error context', () => {
            const context = { url: 'test', method: 'POST', body: { data: 'test' } }
            const error = new FetchError({
                message: 'Failed',
                retry: true,
                context
            })

            const result = Err(error)
            expect(result.err?.context).toEqual(context)
        })
    })

    describe('wrap', () => {
        it('should wrap successful promise', async () => {
            const promise = Promise.resolve({ data: 'test' })
            const result = await wrap(
                promise,
                (e) =>
                    new FetchError({
                        message: e.message,
                        retry: true,
                        context: { url: 'test', method: 'GET' }
                    })
            )

            expect(result.val).toEqual({ data: 'test' })
            expect(result.err).toBeUndefined()
        })

        it('should wrap failed promise', async () => {
            const promise = Promise.reject(new Error('Network error'))
            const result = await wrap(
                promise,
                (e) =>
                    new FetchError({
                        message: e.message,
                        retry: true,
                        context: { url: 'test', method: 'GET' }
                    })
            )

            expect(result.val).toBeUndefined()
            expect(result.err).toBeInstanceOf(FetchError)
            expect(result.err?.message).toBe('Network error')
        })

        it('should handle promise rejection with non-Error objects', async () => {
            const promise = Promise.reject('string error')
            const result = await wrap(
                promise,
                (e) =>
                    new FetchError({
                        message: String(e),
                        retry: false,
                        context: { url: 'test', method: 'GET' }
                    })
            )

            expect(result.err?.message).toBe('string error')
        })

        it('should handle async errors in error mapping function', async () => {
            const promise = Promise.reject(new Error('Original error'))
            const result = await wrap(
                promise,
                (e) =>
                    new FetchError({
                        message: 'Mapper error',
                        retry: false,
                        context: { url: 'test', method: 'GET' }
                    })
            )

            expect(result.err?.message).toBe('Mapper error')
        })

        it('should handle null/undefined promise values', async () => {
            const nullPromise = Promise.resolve(null)
            const nullResult = await wrap(nullPromise, (e) => new FetchError({ message: e.message, retry: false }))
            expect(nullResult.val).toBeNull()

            const undefinedPromise = Promise.resolve(undefined)
            const undefinedResult = await wrap(undefinedPromise, (e) => new FetchError({ message: e.message, retry: false }))
            expect(undefinedResult.val).toBeUndefined()
        })
    })

    describe('Result type usage patterns', () => {
        // Helper function to simulate an API call
        async function fetchData(shouldSucceed: boolean): Promise<Result<{ data: string }, FetchError>> {
            if (shouldSucceed) {
                return Ok({ data: 'success' })
            }
            return Err(
                new FetchError({
                    message: 'Failed to fetch',
                    retry: true,
                    context: { url: 'test', method: 'GET' }
                })
            )
        }

        it('should handle successful chain of operations', async () => {
            const result = await fetchData(true)

            if (result.val) {
                expect(result.val.data).toBe('success')
            } else {
                fail('Expected successful result')
            }
        })

        it('should handle failed chain of operations', async () => {
            const result = await fetchData(false)

            if (result.err) {
                expect(result.err.message).toBe('Failed to fetch')
                expect(result.err.retry).toBe(true)
            } else {
                fail('Expected error result')
            }
        })

        it('should work with type narrowing', () => {
            function processResult(result: Result<number, FetchError>) {
                if (result.val !== undefined) {
                    // TypeScript should recognize this as number
                    const num: number = result.val
                    expect(typeof num).toBe('number')
                } else {
                    // TypeScript should recognize this as FetchError
                    const error: FetchError = result.err
                    expect(error).toBeInstanceOf(FetchError)
                }
            }

            processResult(Ok(42))
            processResult(Err(new FetchError({ message: 'error', retry: false })))
        })
    })
})
