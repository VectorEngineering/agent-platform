import { expect, test } from 'bun:test'
import { extractRootDomain, getAllowedAttachments, getCurrency, getDomainFromEmail } from './utils'

/**
 * @fileoverview Test suite for utility functions.
 */

test('extractRootDomain - should handle various URL formats', () => {
    const testCases = [
        { input: 'https://www.example.com/path', expected: 'example.com' },
        { input: 'http://subdomain.example.co.uk', expected: 'example.co.uk' },
        { input: 'example.com', expected: 'example.com' },
        { input: 'www.example.com', expected: 'example.com' },
        { input: '', expected: null },
        { input: 'invalid-url', expected: null }
    ]

    testCases.forEach(({ input, expected }) => {
        expect(extractRootDomain(input)).toBe(expected)
    })
})

test('getDomainFromEmail - should extract domain from email addresses', () => {
    const testCases = [
        { input: 'user@example.com', expected: 'example.com' },
        { input: 'invoice@supabase.com', expected: 'supabase.com' },
        { input: 'test.user@subdomain.example.co.uk', expected: 'subdomain.example.co.uk' },
        { input: 'invalid-email', expected: null },
        { input: '', expected: null },
        { input: null, expected: null }
    ]

    testCases.forEach(({ input, expected }) => {
        expect(getDomainFromEmail(input ?? undefined)).toBe(expected)
    })
})

test('getCurrency - should extract currency code from field values', () => {
    const testCases = [
        {
            input: { valueCurrency: { currencyCode: 'USD' } },
            expected: 'USD'
        },
        {
            input: { valueCurrency: { currencyCode: 'EUR' } },
            expected: 'EUR'
        },
        { input: {}, expected: null },
        { input: undefined, expected: null }
    ]

    testCases.forEach(({ input, expected }) => {
        expect(getCurrency(input)).toBe(expected)
    })
})

test('getAllowedAttachments - should filter allowed attachments', () => {
    const attachments = [
        {
            ContentLength: 51899,
            Name: 'DigitalOcean Invoice 2023 Apr (33-11).pdf',
            ContentType: 'application/pdf',
            ContentID: '',
            Content: ''
        },
        {
            ContentLength: 51899,
            Name: 'Photo.jpg',
            ContentType: 'image/jpeg',
            ContentID: '',
            Content: ''
        },
        {
            ContentLength: 673,
            Name: 'ergerwed',
            ContentType: 'application/pgp-keys',
            ContentID: '',
            Content: ''
        },
        {
            ContentLength: 249,
            Name: 'wedwed',
            ContentType: 'application/pgp-signature',
            ContentID: '',
            Content: ''
        }
    ]

    const result = getAllowedAttachments(attachments)
    expect(result).toBeDefined()
    if (!result) return

    expect(result).toBeArrayOfSize(2)
    expect(result[0].ContentType).toBe('application/pdf')
    expect(result[1].ContentType).toBe('image/jpeg')
})
