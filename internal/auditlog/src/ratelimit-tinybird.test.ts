import { priorityLevel, rateLimitStrategy, ratelimitSchemaV1, sharding } from './ratelimit-tinybird'

describe('Rate Limit Schema', () => {
    const validRateLimit = {
        workspaceId: 'ws_123',
        namespaceId: 'ns_123',
        requestId: 'req_123',
        identifier: 'api_123',
        time: Date.now(),
        serviceLatency: 100,
        success: true,
        remaining: 95,
        config: {
            limit: 100,
            duration: 3600,
            async: false,
            sharding: 'global'
        },
        context: {
            ipAddress: '127.0.0.1'
        }
    }

    // Core Validation Tests
    test('validates a correct rate limit entry', () => {
        const result = ratelimitSchemaV1.safeParse(validRateLimit)
        expect(result.success).toBe(true)
    })

    test('requires all mandatory fields', () => {
        const requiredFields = ['workspaceId', 'namespaceId', 'requestId', 'identifier']
        for (const field of requiredFields) {
            const invalidLimit: any = { ...validRateLimit }
            delete invalidLimit[field]
            const result = ratelimitSchemaV1.safeParse(invalidLimit)
            expect(result.success).toBe(false)
        }
    })

    // Sharding Tests
    test('validates all sharding options', () => {
        const shardingOptions = Object.values(sharding.enum)
        shardingOptions.forEach((shardingOption) => {
            const rateLimit = {
                ...validRateLimit,
                config: { ...validRateLimit.config, sharding: shardingOption }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Strategy Tests
    test('validates all rate limit strategies', () => {
        const strategies = Object.values(rateLimitStrategy.enum)
        strategies.forEach((strategy) => {
            const rateLimit = {
                ...validRateLimit,
                config: { ...validRateLimit.config, strategy }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Priority Tests
    test('validates all priority levels', () => {
        const priorities = Object.values(priorityLevel.enum)
        priorities.forEach((priority) => {
            const rateLimit = {
                ...validRateLimit,
                config: { ...validRateLimit.config, priority }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Quota Policy Tests
    test('validates quota policy configurations', () => {
        const quotaPolicies = [
            { resetPeriod: 'daily', carryOver: false },
            { resetPeriod: 'monthly', carryOver: true, gracePeriod: 3600 },
            { resetPeriod: 'weekly', overageAllowed: true, overageLimit: 10 }
        ]

        quotaPolicies.forEach((quotaPolicy) => {
            const rateLimit = {
                ...validRateLimit,
                config: {
                    ...validRateLimit.config,
                    quotaPolicy
                }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Circuit Breaker Tests
    test('validates circuit breaker configurations', () => {
        const circuitBreakers = [
            { enabled: true, errorThreshold: 0.5 },
            { enabled: true, breakDuration: 300, halfOpenRequests: 5 },
            { enabled: false }
        ]

        circuitBreakers.forEach((circuitBreaker) => {
            const rateLimit = {
                ...validRateLimit,
                config: {
                    ...validRateLimit.config,
                    circuitBreaker
                }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Metrics Tests
    test('validates different metric combinations', () => {
        const metricsCases = [
            { concurrentRequests: 10, requestSize: 1024 },
            { cpuTime: 30, memoryUsage: 1048576, ioOperations: 5 },
            { customMetrics: { cache_hits: 100, cache_misses: 20 } }
        ]

        metricsCases.forEach((metrics) => {
            const rateLimit = {
                ...validRateLimit,
                metrics
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Context Tests
    test('validates context with different geo locations', () => {
        const geoContexts = [
            { country: 'US', continent: 'NA', city: 'New York' },
            { country: 'GB', region: 'eu-west-1', timezone: 'Europe/London' },
            { country: 'JP', colo: 'NRT', city: 'Tokyo' }
        ]

        geoContexts.forEach((geoContext) => {
            const rateLimit = {
                ...validRateLimit,
                context: {
                    ...validRateLimit.context,
                    ...geoContext
                }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Client Information Tests
    test('validates different client contexts', () => {
        const clientContexts = [
            { clientId: 'mobile_app', clientType: 'ios', clientVersion: '2.0.0' },
            { clientId: 'web_app', clientType: 'browser', sdkVersion: '1.5.0' },
            { clientId: 'api_client', clientType: 'server', apiVersion: '3' }
        ]

        clientContexts.forEach((clientContext) => {
            const rateLimit = {
                ...validRateLimit,
                context: {
                    ...validRateLimit.context,
                    ...clientContext
                }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Error Cases
    test('rejects invalid numeric values', () => {
        const invalidCases = [
            { remaining: -1 },
            { serviceLatency: -100 },
            { config: { ...validRateLimit.config, limit: 0 } },
            { config: { ...validRateLimit.config, duration: -1 } }
        ]

        invalidCases.forEach((invalidCase) => {
            const rateLimit = {
                ...validRateLimit,
                ...invalidCase
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(false)
        })
    })

    // Security Context Tests
    test('validates security-related context', () => {
        const securityContexts = [
            { authenticated: true, authMethod: 'bearer', roles: ['admin'] },
            { authenticated: true, authMethod: 'oauth', permissions: ['read', 'write'] },
            { riskScore: 0.1, authenticated: false }
        ]

        securityContexts.forEach((securityContext) => {
            const rateLimit = {
                ...validRateLimit,
                context: {
                    ...validRateLimit.context,
                    ...securityContext
                }
            }
            const result = ratelimitSchemaV1.safeParse(rateLimit)
            expect(result.success).toBe(true)
        })
    })

    // Complex Scenarios
    test('validates complete rate limit with all optional fields', () => {
        const complexRateLimit = {
            ...validRateLimit,
            config: {
                ...validRateLimit.config,
                strategy: 'token_bucket',
                priority: 'high',
                burst: 20,
                costPerRequest: 1.5,
                quotaPolicy: {
                    resetPeriod: 'daily',
                    carryOver: true,
                    gracePeriod: 3600
                },
                circuitBreaker: {
                    enabled: true,
                    errorThreshold: 0.5,
                    breakDuration: 300
                }
            },
            metrics: {
                concurrentRequests: 15,
                requestSize: 2048,
                cpuTime: 45,
                customMetrics: {
                    cache_hit_ratio: 0.95
                }
            },
            context: {
                ...validRateLimit.context,
                country: 'US',
                region: 'us-east-1',
                clientId: 'enterprise_app',
                authenticated: true,
                roles: ['premium']
            }
        }
        const result = ratelimitSchemaV1.safeParse(complexRateLimit)
        expect(result.success).toBe(true)
    })
})
