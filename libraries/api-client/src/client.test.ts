import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { SolomonAI } from './client'

describe('SolomonAI Client', () => {
    // Store the original fetch
    const originalFetch = global.fetch

    beforeEach(() => {
        // Reset fetch mock before each test
        global.fetch = vi.fn()
    })

    afterEach(() => {
        // Restore original fetch after each test
        global.fetch = originalFetch
        vi.clearAllMocks()
    })

    describe('initialization', () => {
        test('initializes with root key', () => {
            const client = new SolomonAI({ rootKey: 'test-key' })
            expect(client).toBeInstanceOf(SolomonAI)
        })

        test('initializes with deprecated token', () => {
            const client = new SolomonAI({ token: 'test-token' })
            expect(client).toBeInstanceOf(SolomonAI)
        })

        test('throws error when no key is provided', () => {
            expect(() => {
                // @ts-expect-error testing invalid input
                new SolomonAI({})
            }).toThrow('SolomonAI root key must be set')
        })

        test('uses custom base URL when provided', () => {
            const client = new SolomonAI({
                rootKey: 'test-key',
                baseUrl: 'https://custom-api.example.com'
            })
            expect(client.baseUrl).toBe('https://custom-api.example.com')
        })
    })

    describe('API calls', () => {
        test('keys.create makes correct POST request', async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({ result: { key: 'new-key' } }),
                headers: new Headers()
            }
            global.fetch = vi.fn().mockResolvedValue(mockResponse)

            const client = new SolomonAI({ rootKey: 'test-key' })
            const result = await client.keys.create({
                apiId: 'test-api',
                prefix: 'test',
                byteLength: 16
            })

            const fetchCalls = (global.fetch as any).mock.calls
            expect(fetchCalls.length).toBe(1)

            const [urlString, options] = fetchCalls[0]
            const url = new URL(urlString)
            expect(url.pathname).toContain('/v1/keys.createKey')
            expect(options.method).toBe('POST')
            expect(options.headers['Authorization']).toBe('Bearer test-key')
            expect(options.headers['Content-Type']).toBe('application/json')
            expect(result.result).toBeDefined()
        })

        test('apis.listKeys handles undefined parameters', async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({ result: { keys: [] } }),
                headers: new Headers()
            }
            global.fetch = vi.fn().mockResolvedValue(mockResponse)

            const client = new SolomonAI({ rootKey: 'test-key' })
            const result = await client.apis.listKeys({
                apiId: 'test-api',
                cursor: undefined
            })

            const fetchCall = (global.fetch as any).mock.calls[0]
            const url = new URL(fetchCall[0])

            expect(url.searchParams.has('cursor')).toBe(false)
            expect(url.searchParams.get('apiId')).toBe('test-api')
            expect(result.result).toBeDefined()
        })
    })

    describe('telemetry', () => {
        test('includes telemetry headers when enabled', async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({ result: {} }),
                headers: new Headers()
            }
            global.fetch = vi.fn().mockResolvedValue(mockResponse)

            const client = new SolomonAI({
                rootKey: 'test-key',
                disableTelemetry: false
            })

            await client.keys.get({ keyId: 'test' })

            const fetchCalls = (global.fetch as any).mock.calls
            expect(fetchCalls.length).toBe(1)

            const [_, options] = fetchCalls[0]
            expect(options.headers['SolomonAI-Telemetry-Runtime']).toBeDefined()
        })

        test('excludes telemetry headers when disabled', async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({ result: {} }),
                headers: new Headers()
            }
            global.fetch = vi.fn().mockResolvedValue(mockResponse)

            const client = new SolomonAI({
                rootKey: 'test-key',
                disableTelemetry: true
            })

            await client.keys.get({ keyId: 'test' })

            const fetchCall = (global.fetch as any).mock.calls[0]
            const headers = fetchCall[1].headers

            expect(headers['SolomonAI-Telemetry-Runtime']).toBeUndefined()
            expect(headers['SolomonAI-Telemetry-Platform']).toBeUndefined()
            expect(headers['SolomonAI-Telemetry-SDK']).toBeUndefined()
        })
    })
})
