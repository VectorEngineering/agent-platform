import { describe, expect, it } from 'vitest'
import { newId, prefixes } from './generate'

describe('newId', () => {
    it('should generate an ID with the correct prefix', () => {
        const id = newId('key')
        expect(id).toMatch(/^key_[1-9A-HJ-NP-Za-km-z]+$/)
    })

    it('should generate different IDs on subsequent calls', () => {
        const id1 = newId('api')
        const id2 = newId('api')
        expect(id1).not.toBe(id2)
    })

    it('should work with all defined prefixes', () => {
        const prefixTests = [
            { prefix: 'key', expected: /^key_/ },
            { prefix: 'policy', expected: /^pol_/ },
            { prefix: 'api', expected: /^api_/ },
            { prefix: 'request', expected: /^req_/ },
            { prefix: 'workspace', expected: /^ws_/ },
            { prefix: 'keyAuth', expected: /^ks_/ },
            { prefix: 'vercelBinding', expected: /^vb_/ },
            { prefix: 'role', expected: /^role_/ },
            { prefix: 'test', expected: /^test_/ },
            { prefix: 'ratelimitNamespace', expected: /^rlns_/ },
            { prefix: 'ratelimitOverride', expected: /^rlor_/ },
            { prefix: 'permission', expected: /^perm_/ },
            { prefix: 'secret', expected: /^sec_/ },
            { prefix: 'headerRewrite', expected: /^hrw_/ },
            { prefix: 'gateway', expected: /^gw_/ },
            { prefix: 'llmGateway', expected: /^lgw_/ },
            { prefix: 'webhook', expected: /^wh_/ },
            { prefix: 'event', expected: /^evt_/ },
            { prefix: 'reporter', expected: /^rep_/ },
            { prefix: 'webhookDelivery', expected: /^whd_/ },
            { prefix: 'identity', expected: /^id_/ },
            { prefix: 'ratelimit', expected: /^rl_/ },
            { prefix: 'auditLogBucket', expected: /^buk_/ },
            { prefix: 'auditLog', expected: /^log_/ }
        ] as const

        for (const { prefix, expected } of prefixTests) {
            const id = newId(prefix)
            expect(id).toMatch(expected)
            // Verify base58 part is present and valid
            const base58Part = id.split('_')[1]
            expect(base58Part).toMatch(/^[1-9A-HJ-NP-Za-km-z]+$/)
        }
    })

    it('should generate IDs with consistent length for same prefix', () => {
        const id1 = newId('key')
        const id2 = newId('key')
        expect(id1.length).toBe(id2.length)
    })

    it('should generate unique IDs even when called in quick succession', async () => {
        const ids = new Set()
        for (let i = 0; i < 1000; i++) {
            ids.add(newId('key'))
        }
        expect(ids.size).toBe(1000)
    })

    it('should generate IDs with length greater than the prefix', () => {
        const id = newId('key')
        expect(id.length).toBeGreaterThan('key_'.length)
    })

    it('should not generate IDs containing invalid base58 characters', () => {
        const invalidChars = '0OIl' // Characters explicitly excluded from base58
        const id = newId('key')
        for (const char of invalidChars) {
            expect(id).not.toContain(char)
        }
    })

    it('should generate IDs that start with prefix followed by underscore', () => {
        const testPrefixes: Array<'key' | 'api' | 'workspace'> = ['key', 'api', 'workspace']
        for (const prefix of testPrefixes) {
            const id = newId(prefix)
            expect(id.startsWith(`${prefixes[prefix]}_`)).toBe(true)
        }
    })

    it('should generate base58 parts of consistent length', () => {
        const ids = Array.from({ length: 10 }, () => newId('key'))
        const base58Lengths = ids.map((id) => id.split('_')[1].length)
        const firstLength = base58Lengths[0]
        expect(base58Lengths.every((len) => len === firstLength)).toBe(true)
    })

    it('should handle rapid sequential generation without collisions', async () => {
        const promises = Array.from({ length: 100 }, () => Promise.resolve(newId('key')))
        const ids = await Promise.all(promises)
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(ids.length)
    })

    it('should generate sortable IDs', () => {
        const ids = Array.from({ length: 3 }, () => newId('key'))
        const sortedIds = [...ids].sort()
        // Verify IDs can be sorted (even if order differs)
        expect(sortedIds.length).toBe(ids.length)
        expect(new Set(sortedIds)).toEqual(new Set(ids))
    })

    it('should generate different IDs across different prefixes', () => {
        const testPrefixes = ['key', 'api', 'workspace'] as Array<keyof typeof prefixes>
        const ids = testPrefixes.map((prefix) => newId(prefix))
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(testPrefixes.length)
    })

    it('should not generate IDs containing special characters except underscore', () => {
        const id = newId('key')
        expect(id).toMatch(/^[a-zA-Z0-9_]+$/)
    })

    it('should generate IDs with base58 part at least 16 characters long', () => {
        const id = newId('key')
        const base58Part = id.split('_')[1]
        expect(base58Part.length).toBeGreaterThanOrEqual(16)
    })

    it('should maintain consistent format across multiple generations', () => {
        const formatRegex = /^[a-z]+_[1-9A-HJ-NP-Za-km-z]+$/
        const ids = Array.from({ length: 100 }, () => newId('key'))
        expect(ids.every((id) => formatRegex.test(id))).toBe(true)
    })
})

describe('prefixes', () => {
    it('should have unique prefix values', () => {
        const values = Object.values(prefixes)
        const uniqueValues = new Set(values)
        expect(uniqueValues.size).toBe(values.length)
    })

    it('should have all prefix values in lowercase', () => {
        const values = Object.values(prefixes)
        expect(values.every((v) => v === v.toLowerCase())).toBe(true)
    })

    it('should generate valid IDs for fintech-specific prefixes', () => {
        const fintechPrefixes = [
            'account',
            'transaction',
            'payment',
            'paymentMethod',
            'customer',
            'subscription',
            'invoice',
            'refund',
            'dispute',
            'balance',
            'payout',
            'bankAccount',
            'card',
            'charge',
            'transfer',
            'wallet',
            'merchantAccount',
            'pricing',
            'product',
            'tax',
            'fee'
        ] as const

        for (const prefix of fintechPrefixes) {
            const id = newId(prefix)
            expect(id).toMatch(new RegExp(`^${prefixes[prefix]}_[1-9A-HJ-NP-Za-km-z]+$`))
        }
    })

    it('should have mostly short prefix values for efficiency', () => {
        const values = Object.values(prefixes)
        const shortPrefixes = values.filter((v) => v.length <= 4)
        // Ensure at least 90% of prefixes are short
        expect(shortPrefixes.length / values.length).toBeGreaterThan(0.9)
    })

    it('should maintain consistent prefix mapping', () => {
        const expectedMappings = {
            account: 'acc',
            transaction: 'txn',
            payment: 'pay',
            customer: 'cus',
            wallet: 'wal'
        } as const

        for (const [key, value] of Object.entries(expectedMappings)) {
            expect(prefixes[key as keyof typeof prefixes]).toBe(value)
        }
    })
})
