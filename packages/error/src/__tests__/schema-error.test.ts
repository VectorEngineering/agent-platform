import { z } from 'zod'
import { SchemaError } from '../errors/schema-error'
import { BaseError } from '../errors/base'

describe('SchemaError', () => {
    const userSchema = z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email().optional(),
        roles: z.array(z.string()),
        metadata: z.record(z.string(), z.unknown()).optional()
    })

    describe('constructor', () => {
        it('should create error with raw data', () => {
            const invalidData = { name: 123, age: 'invalid' }
            const error = new SchemaError({
                message: 'Invalid user data',
                context: { raw: invalidData }
            })

            expect(error.message).toBe('Invalid user data')
            expect(error.name).toBe('SchemaError')
            expect(error.retry).toBe(false)
            expect(error.context?.raw).toBe(invalidData)
        })

        it('should be instance of correct classes', () => {
            const error = new SchemaError({
                message: 'test error',
                context: { raw: {} }
            })
            expect(error).toBeInstanceOf(SchemaError)
            expect(error).toBeInstanceOf(BaseError)
            expect(error).toBeInstanceOf(Error)
        })

        it('should handle undefined context', () => {
            const error = new SchemaError({ message: 'Schema error' })
            expect(error.context).toBeUndefined()
        })

        it('should preserve stack trace', () => {
            const error = new SchemaError({
                message: 'test error',
                context: { raw: {} }
            })
            expect(error.stack).toBeDefined()
            expect(error.stack).toContain('test error')
            expect(error.stack).toContain('schema-error.test.ts')
        })
    })

    describe('fromZod', () => {
        it('should create error from Zod error with invalid types', () => {
            const invalidData = {
                name: 123,
                age: 'invalid',
                email: 'not-an-email',
                roles: 'not-an-array',
                metadata: null
            }

            let zodError: z.ZodError | undefined
            try {
                userSchema.parse(invalidData)
            } catch (e) {
                if (e instanceof z.ZodError) {
                    zodError = e
                }
            }

            expect(zodError).toBeDefined()
            if (!zodError) return

            const error = SchemaError.fromZod(zodError, invalidData, {
                schemaName: 'userSchema'
            })

            expect(error).toBeInstanceOf(SchemaError)
            expect(error.context).toEqual({
                raw: JSON.stringify(invalidData),
                schemaName: 'userSchema'
            })
            expect(error.message).toBeTruthy()
        })

        it('should handle missing required fields', () => {
            const invalidData = {}
            let error: SchemaError | undefined

            try {
                userSchema.parse(invalidData)
            } catch (e) {
                if (e instanceof z.ZodError) {
                    error = SchemaError.fromZod(e, invalidData, {
                        schemaName: 'userSchema'
                    })
                }
            }

            expect(error).toBeDefined()
            expect(error?.context?.raw).toBe('{}')
            expect(error?.message).toBeTruthy()
            expect(JSON.parse(error?.message || '')).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        code: 'invalid_type',
                        message: 'Required'
                    })
                ])
            )
        })

        it('should handle nested validation errors', () => {
            const nestedSchema = z.object({
                user: userSchema,
                settings: z.object({
                    theme: z.enum(['light', 'dark']),
                    notifications: z.boolean()
                })
            })

            const invalidData = {
                user: {
                    name: 'test',
                    age: 'invalid',
                    roles: []
                },
                settings: {
                    theme: 'blue',
                    notifications: 'yes'
                }
            }

            let error: SchemaError | undefined

            try {
                nestedSchema.parse(invalidData)
            } catch (e) {
                if (e instanceof z.ZodError) {
                    error = SchemaError.fromZod(e, invalidData, {
                        schemaName: 'nestedSchema'
                    })
                }
            }

            expect(error).toBeDefined()
            expect(error?.context?.raw).toBe(JSON.stringify(invalidData))
            expect(error?.message).toBeTruthy()
            expect(JSON.parse(error?.message || '')).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        code: expect.stringMatching(/invalid_type|invalid_enum_value/)
                    })
                ])
            )
        })

        it('should handle array validation errors', () => {
            const arraySchema = z.array(userSchema)
            const invalidData = [
                { name: 'valid', age: 25, roles: ['user'] },
                { name: 123, age: 'invalid', roles: null },
                { name: 'missing-age', roles: [] }
            ]

            let error: SchemaError | undefined

            try {
                arraySchema.parse(invalidData)
            } catch (e) {
                if (e instanceof z.ZodError) {
                    error = SchemaError.fromZod(e, invalidData, {
                        schemaName: 'arraySchema'
                    })
                }
            }

            expect(error).toBeDefined()
            expect(error?.context?.raw).toBe(JSON.stringify(invalidData))
            expect(error?.message).toBeTruthy()
            expect(JSON.parse(error?.message || '')).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        code: 'invalid_type'
                    })
                ])
            )
        })
    })

    describe('error handling', () => {
        it('should be catchable in try-catch block', () => {
            expect(() => {
                throw new SchemaError({
                    message: 'Schema validation failed',
                    context: { raw: {} }
                })
            }).toThrow(SchemaError)
        })

        it('should work with async/await error handling', async () => {
            const promise = (async () => {
                throw new SchemaError({
                    message: 'Async schema error',
                    context: { raw: {} }
                })
            })()

            await expect(promise).rejects.toThrow(SchemaError)
        })

        it('should handle error chaining', () => {
            const cause = new SchemaError({
                message: 'Original validation error',
                context: { raw: {} }
            })
            const error = new SchemaError({
                message: 'Schema validation failed',
                cause,
                context: { raw: {} }
            })

            expect(error.cause).toBe(cause)
            expect(error.toString()).toContain('Original validation error')
        })
    })

    describe('context handling', () => {
        it('should handle non-serializable data', () => {
            const circularRef: any = { prop: null }
            circularRef.prop = circularRef

            const error = new SchemaError({
                message: 'Circular reference',
                context: { raw: circularRef }
            })

            expect(() => JSON.stringify(error.context?.raw)).toThrow()
        })

        it('should handle undefined schema name', () => {
            const zodError = new z.ZodError([])
            const error = SchemaError.fromZod(zodError, {})
            expect(error.context?.raw).toBe('{}')
        })
    })
})
