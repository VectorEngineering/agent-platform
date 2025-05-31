import { describe, expect, it } from 'vitest'

import { AesGCM } from './aes-gcm'
import { base64 } from '@playbookmedia/encoding'

describe('AesGCM', () => {
    describe('withBase64Key()', () => {
        it('should create instance with valid base64 key', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32)) // 256 bits
            const base64Key = base64.encode(rawKey)

            const aesGcm = await AesGCM.withBase64Key(base64Key)
            expect(aesGcm).toBeInstanceOf(AesGCM)
            expect(aesGcm.key).toBeInstanceOf(CryptoKey)
        })

        it('should throw error with invalid base64 key', async () => {
            const invalidKey = 'invalid-base64-!@#$'
            await expect(AesGCM.withBase64Key(invalidKey)).rejects.toThrow()
        })
    })

    describe('encrypt()', () => {
        it('should encrypt string to different ciphertext', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const secret = 'my secret message'
            const result1 = await aesGcm.encrypt(secret)
            const result2 = await aesGcm.encrypt(secret)

            expect(result1.ciphertext).not.toBe(result2.ciphertext)
            expect(result1.iv).not.toBe(result2.iv)
            expect(base64.decode(result1.iv).length).toBe(32) // Match implementation's 32-byte IV
        })

        it('should handle empty string', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const encrypted = await aesGcm.encrypt('')
            const decrypted = await aesGcm.decrypt(encrypted)
            expect(decrypted).toBe('')
        })

        it('should handle unicode strings', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const secret = 'Hello 世界 🌍'
            const result = await aesGcm.encrypt(secret)
            expect(result.ciphertext).toBeDefined()
            expect(result.iv).toBeDefined()
        })
    })

    describe('decrypt()', () => {
        it('should decrypt encrypted message correctly', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const secret = 'my secret message'
            const encrypted = await aesGcm.encrypt(secret)
            const decrypted = await aesGcm.decrypt(encrypted)

            expect(decrypted).toBe(secret)
        })

        it('should handle empty string', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const encrypted = await aesGcm.encrypt('')
            const decrypted = await aesGcm.decrypt(encrypted)
            expect(decrypted).toBe('')
        })

        it('should handle unicode strings', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const secret = 'Hello 世界 🌍'
            const encrypted = await aesGcm.encrypt(secret)
            const decrypted = await aesGcm.decrypt(encrypted)

            expect(decrypted).toBe(secret)
        })

        it('should throw error with invalid iv', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const encrypted = await aesGcm.encrypt('test')
            const invalidRequest = {
                ...encrypted,
                iv: base64.encode(crypto.getRandomValues(new Uint8Array(32)))
            }

            await expect(aesGcm.decrypt(invalidRequest)).rejects.toThrow()
        })

        it('should throw error with invalid ciphertext', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const encrypted = await aesGcm.encrypt('test')
            const invalidRequest = {
                ...encrypted,
                ciphertext: base64.encode(crypto.getRandomValues(new Uint8Array(32)))
            }

            await expect(aesGcm.decrypt(invalidRequest)).rejects.toThrow()
        })
    })

    describe('roundtrip', () => {
        it('should handle multiple encrypt/decrypt operations with same key', async () => {
            const rawKey = crypto.getRandomValues(new Uint8Array(32))
            const aesGcm = await AesGCM.withBase64Key(base64.encode(rawKey))

            const messages = ['first message', 'second message', 'third message']

            for (const message of messages) {
                const encrypted = await aesGcm.encrypt(message)
                const decrypted = await aesGcm.decrypt(encrypted)
                expect(decrypted).toBe(message)
            }
        })
    })
})
