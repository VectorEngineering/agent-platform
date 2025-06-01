import { describe, expect, it } from 'vitest'
import { validation } from './index'

describe('validation schemas', () => {
    describe('identifier', () => {
        it('should accept valid identifiers', () => {
            const validIdentifiers = ['abc', 'test-123', 'my_identifier', 'some.identifier', 'complex:identifier-123', 'a'.repeat(256)]

            validIdentifiers.forEach((id) => {
                expect(() => validation.identifier.parse(id)).not.toThrow()
            })
        })

        it('should reject invalid identifiers', () => {
            const invalidIdentifiers = [
                'ab', // too short
                'invalid@character', // invalid character
                'spaces not allowed',
                'special#chars',
                'a'.repeat(257) // too long
            ]

            invalidIdentifiers.forEach((id) => {
                expect(() => validation.identifier.parse(id)).toThrow()
            })
        })
    })

    describe('name', () => {
        it('should accept valid names', () => {
            const validNames = ['John Doe', 'Project Name 123', 'Valid Name!@#$%^&*()', 'a'.repeat(256)]

            validNames.forEach((n) => {
                expect(() => validation.name.parse(n)).not.toThrow()
            })
        })

        it('should reject invalid names', () => {
            const invalidNames = [
                'ab', // too short
                'a'.repeat(257) // too long
            ]

            invalidNames.forEach((n) => {
                expect(() => validation.name.parse(n)).toThrow()
            })
        })
    })

    describe('description', () => {
        it('should accept valid descriptions', () => {
            const validDescriptions = ['A simple description', 'Description with numbers 123', 'Special chars !@#$%^&*()', 'a'.repeat(256)]

            validDescriptions.forEach((desc) => {
                expect(() => validation.description.parse(desc)).not.toThrow()
            })
        })

        it('should reject invalid descriptions', () => {
            const invalidDescriptions = [
                'ab', // too short
                'a'.repeat(257) // too long
            ]

            invalidDescriptions.forEach((desc) => {
                expect(() => validation.description.parse(desc)).toThrow()
            })
        })
    })

    describe('solomonAiId', () => {
        it('should accept valid Solomon AI IDs', () => {
            const validIds = ['key_12345678', 'usr_abcdefghijklm', 'api_123456789abc', 'keyy_12345678']

            validIds.forEach((id) => {
                expect(() => validation.solomonAiId.parse(id)).not.toThrow()
            })
        })

        it('should reject invalid Solomon AI IDs', () => {
            const testCases = [
                { id: 'ke_12345678', reason: 'prefix too short' },
                { id: 'keyys_12345678', reason: 'prefix too long' },
                { id: 'key12345678', reason: 'missing underscore' },
                { id: 'key_123', reason: 'id part too short' },
                { id: 'key_', reason: 'missing id part' },
                { id: 'KEY_12345678', reason: 'uppercase prefix' }
            ]

            testCases.forEach(({ id, reason }) => {
                expect(() => validation.solomonAiId.parse(id), `Should reject "${id}" (${reason})`).toThrow()
            })
        })

        // Add specific test for uppercase rejection
        it('should specifically reject uppercase prefixes', () => {
            const result = validation.solomonAiId.safeParse('KEY_12345678')
            expect(result.success).toBe(false)
        })
    })
})
