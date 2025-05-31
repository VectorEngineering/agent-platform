import { expect, test } from 'vitest'
import { KeyV1 } from './v1'

test('create v1 key', () => {
    const key = new KeyV1({ byteLength: 16 })
    expect(key.toString()).toMatch(/^[a-zA-Z0-9]+$/)
})

test('does not collide easily', () => {
    const n = 1_000_000
    const keys = new Set<string>()
    for (let i = 0; i < n; i++) {
        keys.add(new KeyV1({ byteLength: 16 }).toString())
    }
    expect(keys.size).toEqual(n)
})

test('unmarshal', () => {
    const key = new KeyV1({ prefix: 'prfx', byteLength: 16 })
    const key2 = KeyV1.fromString(key.toString())
    expect(key2.toString()).toEqual(key.toString())
    expect(key2.prefix).toEqual('prfx')
    expect(key2.random).toEqual(key.random)
})

test('rejects invalid version', () => {
    const invalidKey = '2' + new KeyV1({ byteLength: 16 }).toString().slice(1)
    expect(() => KeyV1.fromString(invalidKey)).toThrow('Only version 1 keys are supported')
})

test('validates byteLength boundaries', () => {
    // Test minimum length
    expect(() => new KeyV1({ byteLength: 7 })).toThrow('v1 keys must be between 8 and 255 bytes long')
    expect(() => new KeyV1({ byteLength: 8 })).not.toThrow()

    // Test maximum length
    expect(() => new KeyV1({ byteLength: 255 })).not.toThrow()
    expect(() => new KeyV1({ byteLength: 256 })).toThrow('v1 keys must be between 8 and 255 bytes long')
})

test('handles keys without prefix', () => {
    const key = new KeyV1({ byteLength: 16 })
    expect(key.prefix).toBeUndefined()
    expect(key.toString()).not.toContain('_')
})

test('handles keys with prefix', () => {
    const key = new KeyV1({ prefix: 'test', byteLength: 16 })
    expect(key.prefix).toBe('test')
    expect(key.toString()).toContain('_')
    expect(key.toString().split('_')[0]).toBe('test')
})

test('random bytes have correct length', () => {
    const byteLength = 32
    const key = new KeyV1({ byteLength })
    expect(key.random.length).toBe(byteLength)
})

test('fromString and toString are inverse operations', () => {
    const originalKey = new KeyV1({ byteLength: 16, prefix: 'test' })
    const originalString = originalKey.toString()
    const parsedKey = KeyV1.fromString(originalString)
    const parsedString = parsedKey.toString()

    expect(parsedString).toBe(originalString)
})
