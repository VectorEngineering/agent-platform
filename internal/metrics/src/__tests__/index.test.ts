import { describe, expect, it } from 'vitest'
import { metricSchema, type Metric } from '../index'

describe('metricSchema', () => {
    describe('metric.cache.read', () => {
        it('should validate valid cache read metrics', () => {
            const validMetric = {
                metric: 'metric.cache.read',
                key: 'test-key',
                hit: true,
                status: 'fresh',
                latency: 100,
                tier: 'memory',
                namespace: 'test'
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should allow optional status field', () => {
            const metricWithoutStatus = {
                metric: 'metric.cache.read',
                key: 'test-key',
                hit: true,
                latency: 100,
                tier: 'memory',
                namespace: 'test'
            }

            const result = metricSchema.safeParse(metricWithoutStatus)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.http.request', () => {
        it('should validate valid http request metrics', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'example.com',
                path: '/api/test',
                method: 'GET',
                status: 200,
                serviceLatency: 150,
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should validate with all optional fields', () => {
            const fullMetric = {
                metric: 'metric.http.request',
                host: 'example.com',
                path: '/api/test',
                method: 'GET',
                status: 200,
                isolateLifetime: 1000,
                isolateId: 'test-isolate',
                error: 'test error',
                coldStart: true,
                serviceLatency: 150,
                colo: 'SFO',
                continent: 'NA',
                country: 'US',
                city: 'San Francisco',
                userAgent: 'Mozilla/5.0',
                fromAgent: 'test-agent',
                context: { custom: 'data' }
            }

            const result = metricSchema.safeParse(fullMetric)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.ratelimit', () => {
        it('should validate valid ratelimit metrics', () => {
            const validMetric = {
                metric: 'metric.ratelimit',
                workspaceId: 'ws-123',
                identifier: 'test-id',
                latency: 50,
                mode: 'sync' as const,
                source: 'agent' as const
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should validate with optional fields', () => {
            const metricWithOptionals = {
                metric: 'metric.ratelimit',
                workspaceId: 'ws-123',
                namespaceId: 'ns-123',
                identifier: 'test-id',
                latency: 50,
                mode: 'sync' as const,
                success: true,
                error: false,
                source: 'agent' as const
            }

            const result = metricSchema.safeParse(metricWithOptionals)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.cache.write', () => {
        it('should validate valid cache write metrics', () => {
            const validMetric = {
                metric: 'metric.cache.write',
                key: 'test-key',
                tier: 'memory',
                latency: 100,
                namespace: 'test'
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.cache.size', () => {
        it('should validate valid cache size metrics', () => {
            const validMetric = {
                metric: 'metric.cache.size',
                name: 'test-cache',
                tier: 'memory',
                size: 1024
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should reject non-memory tier', () => {
            const invalidMetric = {
                metric: 'metric.cache.size',
                name: 'test-cache',
                tier: 'disk', // only 'memory' is allowed
                size: 1024
            }

            const result = metricSchema.safeParse(invalidMetric)
            expect(result.success).toBe(false)
        })
    })

    describe('metric.vault.latency', () => {
        it('should validate all vault operations', () => {
            const operations = ['encrypt', 'encryptBulk', 'decrypt', 'reEncrypt', 'createDEK', 'liveness', 'reEncryptDEKs'] as const

            operations.forEach((op) => {
                const metric = {
                    metric: 'metric.vault.latency',
                    op,
                    latency: 100
                }

                const result = metricSchema.safeParse(metric)
                expect(result.success).toBe(true)
            })
        })
    })

    describe('metric.server.latency', () => {
        it('should validate server latency metrics', () => {
            const validMetric = {
                metric: 'metric.server.latency',
                status: 200,
                country: 'US',
                continent: 'NA',
                latency: 150,
                platform: 'cloudflare',
                colo: 'SFO'
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.db.transaction', () => {
        it('should validate transaction metrics with required fields', () => {
            const validMetric = {
                metric: 'metric.db.transaction',
                name: 'create-user',
                latency: 50
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should validate transaction metrics with all fields', () => {
            const validMetric = {
                metric: 'metric.db.transaction',
                name: 'create-user',
                path: '/api/users',
                latency: 50,
                attempts: 2
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })
    })

    describe('invalid metrics', () => {
        it('should reject metrics with invalid discriminator', () => {
            const invalidMetric = {
                metric: 'invalid.metric',
                value: 'test'
            }

            const result = metricSchema.safeParse(invalidMetric)
            expect(result.success).toBe(false)
        })

        it('should reject metrics with missing required fields', () => {
            const invalidMetric = {
                metric: 'metric.cache.read',
                key: 'test-key'
                // missing required fields: hit, latency, tier, namespace
            }

            const result = metricSchema.safeParse(invalidMetric)
            expect(result.success).toBe(false)
        })

        it('should reject metrics with invalid field types', () => {
            const invalidMetric = {
                metric: 'metric.cache.read',
                key: 'test-key',
                hit: 'true', // should be boolean
                latency: '100', // should be number
                tier: 123, // should be string
                namespace: true // should be string
            }

            const result = metricSchema.safeParse(invalidMetric)
            expect(result.success).toBe(false)
        })
    })

    describe('metric.cache.remove', () => {
        it('should validate valid cache remove metrics', () => {
            const validMetric = {
                metric: 'metric.cache.remove',
                key: 'test-key',
                tier: 'memory',
                namespace: 'test',
                latency: 50
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should accept any numeric latency', () => {
            const metricWithNegativeLatency = {
                metric: 'metric.cache.remove',
                key: 'test-key',
                tier: 'memory',
                namespace: 'test',
                latency: -50
            }

            const result = metricSchema.safeParse(metricWithNegativeLatency)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.fetch.egress', () => {
        it('should validate valid fetch egress metrics', () => {
            const validMetric = {
                metric: 'metric.fetch.egress',
                url: 'https://api.example.com',
                latency: 200,
                status: 200
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should accept different HTTP status codes', () => {
            const statusCodes = [200, 201, 400, 404, 500]

            statusCodes.forEach((status) => {
                const metric = {
                    metric: 'metric.fetch.egress',
                    url: 'https://api.example.com',
                    latency: 150,
                    status
                }

                const result = metricSchema.safeParse(metric)
                expect(result.success).toBe(true)
            })
        })

        it('should validate with HTTPS URLs', () => {
            const metric = {
                metric: 'metric.fetch.egress',
                url: 'https://secure.example.com',
                latency: 150,
                status: 200
            }

            const result = metricSchema.safeParse(metric)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.key.verification', () => {
        it('should validate basic key verification metrics', () => {
            const validMetric = {
                metric: 'metric.key.verification',
                valid: true,
                code: 'AUTH_SUCCESS'
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should validate with all optional fields', () => {
            const validMetric = {
                metric: 'metric.key.verification',
                valid: true,
                code: 'AUTH_SUCCESS',
                workspaceId: 'ws-123',
                apiId: 'api-456',
                keyId: 'key-789'
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should accept false validation result', () => {
            const validMetric = {
                metric: 'metric.key.verification',
                valid: false,
                code: 'AUTH_FAILED'
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })
    })

    describe('metric.http.request', () => {
        it('should validate minimal http request metrics', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: 100,
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should accept different HTTP methods', () => {
            const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

            methods.forEach((method) => {
                const metric = {
                    metric: 'metric.http.request',
                    host: 'api.example.com',
                    path: '/users',
                    method,
                    status: 200,
                    serviceLatency: 100,
                    context: {}
                }

                const result = metricSchema.safeParse(metric)
                expect(result.success).toBe(true)
            })
        })

        it('should validate with cold start information', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: 100,
                coldStart: true,
                isolateLifetime: 0,
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should validate with geographical information', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: 100,
                colo: 'SFO',
                continent: 'NA',
                country: 'US',
                city: 'San Francisco',
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should validate with error information', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 500,
                serviceLatency: 100,
                error: 'Internal Server Error',
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })
    })

    describe('edge cases and validation', () => {
        it('should accept empty strings in string fields', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: '', // empty string is valid per schema
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: 100,
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should reject invalid context types', () => {
            const invalidMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: 100,
                context: null // should be an object
            }

            const result = metricSchema.safeParse(invalidMetric)
            expect(result.success).toBe(false)
        })

        it('should validate complex context objects', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: 100,
                context: {
                    userId: 123,
                    features: ['a', 'b', 'c'],
                    settings: {
                        enabled: true,
                        mode: 'advanced'
                    }
                }
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should accept any numeric status code', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 600, // Any number is valid per schema
                serviceLatency: 100,
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })

        it('should accept any numeric latency value', () => {
            const validMetric = {
                metric: 'metric.http.request',
                host: 'api.example.com',
                path: '/users',
                method: 'GET',
                status: 200,
                serviceLatency: -100, // Any number is valid per schema
                context: {}
            }

            const result = metricSchema.safeParse(validMetric)
            expect(result.success).toBe(true)
        })
    })
})
