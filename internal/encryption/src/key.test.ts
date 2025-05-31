import { EncryptionKey, SerializationError } from './key'
import { Err, Ok } from '@playbookmedia/error'
import { describe, expect, it } from 'vitest'

describe('EncryptionKey', () => {
    describe('new()', () => {
        it('should create a new encryption key with correct properties', () => {
            const key = EncryptionKey.new({ keyVersion: 1 })

            expect(key.algorithm).toBe('AES-GCM')
            expect(key.schemaVersion).toBe('v1')
            expect(key.keyVersion).toBe(1)
            expect(key.random).toBeDefined()
            expect(typeof key.random).toBe('string')
            // Base64 string should be 88 characters for 64 bytes
            expect(key.random.length).toBe(88)
        })

        it('should generate unique random values for each key', () => {
            const key1 = EncryptionKey.new({ keyVersion: 1 })
            const key2 = EncryptionKey.new({ keyVersion: 1 })

            expect(key1.random).not.toBe(key2.random)
        })
    })

    describe('toString()', () => {
        it('should serialize key to correct string format', () => {
            const key = EncryptionKey.new({ keyVersion: 1 })
            const serialized = key.toString()

            const parts = serialized.split('_')
            expect(parts).toHaveLength(4)
            expect(parts[0]).toBe('v1')
            expect(parts[1]).toBe('1')
            expect(parts[2]).toBe('AES-GCM')
            expect(parts[3]).toBe(key.random)
        })
    })

    describe('fromString()', () => {
        it('should deserialize valid v1 key string', () => {
            const original = EncryptionKey.new({ keyVersion: 1 })
            const serialized = original.toString()
            const result = EncryptionKey.fromString(serialized)

            expect(result.val).toBeDefined()
            const deserialized = result.val as EncryptionKey
            expect(deserialized.schemaVersion).toBe('v1')
            expect(deserialized.keyVersion).toBe(1)
            expect(deserialized.algorithm).toBe('AES-GCM')
            expect(deserialized.random).toBe(original.random)
        })

        it('should return error for empty string', () => {
            const result = EncryptionKey.fromString('')
            expect(result.err).toBeInstanceOf(SerializationError)
            expect(result.err?.message).toContain('unable to extract schema version')
        })

        it('should return error for invalid schema version', () => {
            const result = EncryptionKey.fromString('v2_1_AES-GCM_abc123')
            expect(result.err).toBeInstanceOf(SerializationError)
            expect(result.err?.message).toContain('unable to deserialize version')
        })

        it('should return error for malformed key string', () => {
            const result = EncryptionKey.fromString('v1_invalid')
            expect(result.err).toBeInstanceOf(SerializationError)
        })

        it('should handle roundtrip serialization/deserialization', () => {
            const original = EncryptionKey.new({ keyVersion: 1 })
            const serialized = original.toString()
            const result = EncryptionKey.fromString(serialized)

            expect(result.val).toBeDefined()
            const deserialized = result.val as EncryptionKey
            expect(deserialized.toString()).toBe(serialized)
        })
    })
})
