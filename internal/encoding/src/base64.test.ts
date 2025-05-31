import { describe, expect, test } from 'vitest'
import { base64 } from './base64'

describe('base64', () => {
    describe('encode', () => {
        test('encodes string data correctly', () => {
            expect(base64.encode('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ==')
            expect(base64.encode('')).toBe('')
            expect(base64.encode('f')).toBe('Zg==')
            expect(base64.encode('fo')).toBe('Zm8=')
            expect(base64.encode('foo')).toBe('Zm9v')
        })

        test('encodes ArrayBuffer data correctly', () => {
            const data = new TextEncoder().encode('Hello')
            expect(base64.encode(data)).toBe('SGVsbG8=')
        })

        test('encodes Uint8Array data correctly', () => {
            const data = new TextEncoder().encode('Hello')
            expect(base64.encode(data)).toBe('SGVsbG8=')
        })
    })

    describe('decode', () => {
        test('decodes base64 strings correctly', () => {
            const cases = [
                ['SGVsbG8sIFdvcmxkIQ==', 'Hello, World!'],
                ['', ''],
                ['Zg==', 'f'],
                ['Zm8=', 'fo'],
                ['Zm9v', 'foo']
            ] as const

            cases.forEach(([input, expected]) => {
                const decoded = base64.decode(input)
                const text = new TextDecoder().decode(decoded)
                expect(text).toBe(expected)
            })
        })

        test('decoded data matches original when encoding and decoding', () => {
            const original = 'Hello, 世界!' // Testing with Unicode characters
            const encoded = base64.encode(original)
            const decoded = base64.decode(encoded)
            const text = new TextDecoder().decode(decoded)
            expect(text).toBe(original)
        })

        test('handles padding correctly', () => {
            // Test different padding scenarios
            const oneByteCase = base64.decode('YQ==') // "a"
            const twoByteCase = base64.decode('YWI=') // "ab"
            const threeByteCase = base64.decode('YWJj') // "abc"

            expect(new TextDecoder().decode(oneByteCase)).toBe('a')
            expect(new TextDecoder().decode(twoByteCase)).toBe('ab')
            expect(new TextDecoder().decode(threeByteCase)).toBe('abc')
        })
    })
})
