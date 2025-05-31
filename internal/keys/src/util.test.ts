import { expect, test } from 'vitest'

import { KeyV1 } from './v1'
import { newKey } from './util'
import { sha256 } from '@playbookmedia/hash'

test('newKey generates valid key structure', async () => {
    const result = await newKey({ byteLength: 16 })

    expect(result).toHaveProperty('key')
    expect(result).toHaveProperty('hash')
    expect(result).toHaveProperty('start')

    // Key should be base58 encoded
    expect(result.key).toMatch(/^[1-9A-HJ-NP-Za-km-z]+$/)

    // Hash should be base64 encoded
    expect(result.hash).toMatch(/^[A-Za-z0-9+/]+=*$/)
})

test('newKey with prefix', async () => {
    const prefix = 'test'
    const result = await newKey({ byteLength: 16, prefix })

    expect(result.key.startsWith(`${prefix}_`)).toBe(true)
    expect(result.start).toBe(`${prefix}_${result.key.split('_')[1].slice(0, 4)}`)
})

test('newKey without prefix', async () => {
    const result = await newKey({ byteLength: 16 })

    expect(result.key).not.toContain('_')
    expect(result.start).toBe(result.key.slice(0, 5))
})

test('newKey with different byteLengths', async () => {
    const lengths = [8, 16, 32, 64, 128]

    for (const byteLength of lengths) {
        const result = await newKey({ byteLength })
        const key = new KeyV1(result.key)
        expect(key.random.length).toBe(byteLength)
    }
})

test('newKey generates unique values', async () => {
    const n = 1000
    const results = await Promise.all(Array.from({ length: n }, () => newKey({ byteLength: 16 })))

    const uniqueKeys = new Set(results.map((r) => r.key))
    const uniqueHashes = new Set(results.map((r) => r.hash))

    expect(uniqueKeys.size).toBe(n)
    expect(uniqueHashes.size).toBe(n)
})

test('start property has correct length with prefix', async () => {
    const prefix = 'test'
    const result = await newKey({ byteLength: 16, prefix })

    // start should be prefix + '_' + 4 chars
    expect(result.start.length).toBe(prefix.length + 1 + 4)
})

test('start property has correct length without prefix', async () => {
    const result = await newKey({ byteLength: 16 })

    // start should be just 5 chars when no prefix
    expect(result.start.length).toBe(5)
})

test('hash is consistent for same key', async () => {
    const result1 = await newKey({ byteLength: 16 })

    // Same key should produce same hash
    const rehashed = await sha256(result1.key)
    expect(rehashed).toBe(result1.hash)
})

test('newKey with invalid byteLength', async () => {
    // Should throw for byteLength < 8
    await expect(newKey({ byteLength: 7 })).rejects.toThrow()

    // Should throw for byteLength > 255
    await expect(newKey({ byteLength: 256 })).rejects.toThrow()
})
