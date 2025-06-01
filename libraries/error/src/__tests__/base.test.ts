import { BaseError } from '../errors/base'

// Test implementation of BaseError for testing
class TestError extends BaseError<{ testId: string }> {
    public readonly retry = false
    public readonly name = 'TestError'
}

describe('BaseError', () => {
    describe('constructor', () => {
        it('should create error with basic message', () => {
            const error = new TestError({ message: 'test error' })
            expect(error.message).toBe('test error')
            expect(error.name).toBe('TestError')
            expect(error.retry).toBe(false)
            expect(error.context).toBeUndefined()
            expect(error.cause).toBeUndefined()
        })

        it('should create error with context', () => {
            const context = { testId: 'test-123' }
            const error = new TestError({ message: 'test error', context })
            expect(error.context).toEqual(context)
        })

        it('should create error with cause', () => {
            const cause = new TestError({ message: 'cause error' })
            const error = new TestError({ message: 'test error', cause })
            expect(error.cause).toBe(cause)
        })

        it('should handle empty context object', () => {
            const error = new TestError({
                message: 'test error',
                context: {} as { testId: string }
            })
            expect(error.context).toEqual({})
            expect(error.toString()).toBe('TestError: test error - {} - caused by undefined')
        })

        it('should handle deeply nested cause chain', () => {
            const cause3 = new TestError({ message: 'root cause' })
            const cause2 = new TestError({ message: 'intermediate cause', cause: cause3 })
            const cause1 = new TestError({ message: 'direct cause', cause: cause2 })
            const error = new TestError({ message: 'main error', cause: cause1 })

            expect(error.cause).toBe(cause1)
            expect(error.cause?.cause).toBe(cause2)
            expect(error.cause?.cause?.cause).toBe(cause3)
        })

        it('should handle both context and cause', () => {
            const cause = new TestError({
                message: 'cause error',
                context: { testId: 'cause-123' }
            })
            const error = new TestError({
                message: 'test error',
                context: { testId: 'test-123' },
                cause
            })

            expect(error.context).toEqual({ testId: 'test-123' })
            expect(error.cause).toBe(cause)
            expect(error.cause?.context).toEqual({ testId: 'cause-123' })
        })
    })

    describe('toString', () => {
        it('should format error without context or cause', () => {
            const error = new TestError({ message: 'test error' })
            expect(error.toString()).toBe('TestError: test error - undefined - caused by undefined')
        })

        it('should format error with context', () => {
            const error = new TestError({
                message: 'test error',
                context: { testId: 'test-123' }
            })
            expect(error.toString()).toBe('TestError: test error - {"testId":"test-123"} - caused by undefined')
        })

        it('should format error with cause', () => {
            const cause = new TestError({ message: 'cause error' })
            const error = new TestError({ message: 'test error', cause })
            expect(error.toString()).toBe(
                'TestError: test error - undefined - caused by TestError: cause error - undefined - caused by undefined'
            )
        })

        it('should handle deeply nested cause chain in toString', () => {
            const cause2 = new TestError({
                message: 'root cause',
                context: { testId: 'root' }
            })
            const cause1 = new TestError({
                message: 'intermediate',
                context: { testId: 'mid' },
                cause: cause2
            })
            const error = new TestError({
                message: 'main error',
                context: { testId: 'main' },
                cause: cause1
            })

            expect(error.toString()).toBe(
                'TestError: main error - {"testId":"main"} - caused by ' +
                    'TestError: intermediate - {"testId":"mid"} - caused by ' +
                    'TestError: root cause - {"testId":"root"} - caused by undefined'
            )
        })

        it('should handle special characters in message', () => {
            const error = new TestError({
                message: 'test\nerror\twith "special" \'chars\''
            })
            expect(error.toString()).toBe('TestError: test\nerror\twith "special" \'chars\' - undefined - caused by undefined')
        })

        it('should handle special characters in context', () => {
            const error = new TestError({
                message: 'test error',
                context: { testId: 'test\nwith\t"quotes"' }
            })
            expect(error.toString()).toBe('TestError: test error - {"testId":"test\\nwith\\t\\"quotes\\""} - caused by undefined')
        })
    })

    describe('inheritance', () => {
        // Create a new base class for testing inheritance
        class ExtendableError extends BaseError<{ testId: string }> {
            public readonly retry: boolean = false
            public readonly name: string = 'ExtendableError'
        }

        class ChildError extends ExtendableError {
            public readonly name = 'ChildError'
            public readonly retry = true
        }

        it('should properly inherit from parent error', () => {
            const error = new ChildError({ message: 'child error' })
            expect(error).toBeInstanceOf(ExtendableError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error).toBeInstanceOf(Error)
        })

        it('should allow overriding properties', () => {
            const error = new ChildError({ message: 'child error' })
            expect(error.name).toBe('ChildError')
            expect(error.retry).toBe(true)
        })

        it('should maintain toString functionality', () => {
            const error = new ChildError({
                message: 'child error',
                context: { testId: 'child-123' }
            })
            expect(error.toString()).toBe('ChildError: child error - {"testId":"child-123"} - caused by undefined')
        })
    })

    describe('error properties', () => {
        it('should preserve stack trace', () => {
            const error = new TestError({ message: 'test error' })
            expect(error.stack).toBeDefined()
            expect(error.stack).toContain('test error')
            expect(error.stack).toContain('base.test.ts')
        })

        it('should be catchable as standard error', () => {
            try {
                throw new TestError({ message: 'test error' })
            } catch (e) {
                expect(e).toBeInstanceOf(Error)
                expect(e).toBeInstanceOf(BaseError)
                expect(e).toBeInstanceOf(TestError)
            }
        })
    })
})
