import { beforeEach, describe, expect, test } from 'bun:test'

import { getInboxEmail, getInboxIdFromEmail } from '.'

describe('getInboxIdFromEmail', () => {
    test('extracts inbox id from production email', () => {
        expect(getInboxIdFromEmail('user123@inbox.solomon-ai.app')).toBe('user123')
    })

    test('extracts inbox id from staging email', () => {
        expect(getInboxIdFromEmail('test456@inbox.staging.solomon-ai.app')).toBe('test456')
    })

    test('handles email with special characters', () => {
        expect(getInboxIdFromEmail('user.name-123@inbox.solomon-ai.app')).toBe('user.name-123')
    })

    test('returns null for invalid email format', () => {
        expect(getInboxIdFromEmail('invalid-email-format')).toBeNull()
    })
})

describe('getInboxEmail', () => {
    const originalNodeEnv = process.env.NODE_ENV

    beforeEach(() => {
        // Reset NODE_ENV after each test
        process.env.NODE_ENV = originalNodeEnv
    })

    test('generates staging email in non-production environment', () => {
        process.env.NODE_ENV = 'development'
        expect(getInboxEmail('user123')).toBe('user123@inbox.staging.solomon-ai.app')
    })

    test('generates production email in production environment', () => {
        process.env.NODE_ENV = 'production'
        expect(getInboxEmail('user123')).toBe('user123@inbox.solomon-ai.app')
    })

    test('handles inbox ids with special characters', () => {
        expect(getInboxEmail('user.name-123')).toMatch(/^user\.name-123@inbox\./)
    })

    test('handles numeric inbox ids', () => {
        expect(getInboxEmail('123456')).toMatch(/^123456@inbox\./)
    })

    test('handles empty string inbox id', () => {
        expect(getInboxEmail('')).toMatch(/^@inbox\./)
    })
})
