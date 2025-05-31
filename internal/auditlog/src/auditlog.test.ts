import { auditLogSchemaV1, unkeyAuditLogEvents } from './auditlog'

describe('Audit Log Schema', () => {
    const validAuditLog = {
        workspaceId: 'ws_123',
        bucket: 'api_logs',
        auditLogId: 'al_123',
        event: 'api.create',
        time: Date.now(),
        actor: {
            type: 'user',
            id: 'user_123',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin'
        },
        resources: [
            {
                type: 'api',
                id: 'api_123',
                name: 'Production API'
            }
        ],
        context: {
            location: 'us-east-1',
            userAgent: 'Mozilla/5.0',
            ipAddress: '127.0.0.1'
        }
    }

    // Core Schema Tests
    test('validates a correct audit log entry', () => {
        const result = auditLogSchemaV1.safeParse(validAuditLog)
        expect(result.success).toBe(true)
    })

    test('requires mandatory fields', () => {
        const invalidLog: any = { ...validAuditLog }
        delete invalidLog.workspaceId
        const result = auditLogSchemaV1.safeParse(invalidLog)
        expect(result.success).toBe(false)
    })

    // Actor Tests
    test('validates actor with minimum required fields', () => {
        const minimalActor = {
            ...validAuditLog,
            actor: { type: 'user', id: 'user_123' }
        }
        const result = auditLogSchemaV1.safeParse(minimalActor)
        expect(result.success).toBe(true)
    })

    test('validates all actor types', () => {
        const actorTypes = ['user', 'system', 'api']
        actorTypes.forEach((type) => {
            const log = { ...validAuditLog, actor: { ...validAuditLog.actor, type } }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    test('validates actor authentication types', () => {
        const authTypes = ['password', 'sso', 'mfa', 'api_key', 'oauth']
        authTypes.forEach((authenticationType) => {
            const log = {
                ...validAuditLog,
                actor: { ...validAuditLog.actor, authenticationType }
            }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    // Resource Tests
    test('validates empty resources array', () => {
        const log = { ...validAuditLog, resources: [] }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    test('validates multiple resources', () => {
        const log = {
            ...validAuditLog,
            resources: [
                { type: 'api', id: 'api_1' },
                { type: 'endpoint', id: 'ep_1' }
            ]
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    test('validates resource visibility options', () => {
        const visibilities = ['public', 'private', 'restricted']
        visibilities.forEach((visibility) => {
            const log = {
                ...validAuditLog,
                resources: [
                    {
                        ...validAuditLog.resources[0],
                        meta: { visibility }
                    }
                ]
            }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    // Meta Tests
    test('validates financial meta data', () => {
        const log = {
            ...validAuditLog,
            meta: {
                amount: 100.5,
                currency: 'USD',
                exchangeRate: 1.2,
                taxAmount: 20,
                taxRate: 0.2
            }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    test('validates threshold types in meta', () => {
        const thresholdTypes = ['amount', 'percentage', 'count', 'frequency']
        thresholdTypes.forEach((thresholdType) => {
            const log = {
                ...validAuditLog,
                meta: { thresholdType, thresholdValue: 100 }
            }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    test('validates priority levels in meta', () => {
        const priorities = ['low', 'medium', 'high', 'critical']
        priorities.forEach((priority) => {
            const log = { ...validAuditLog, meta: { priority } }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    // Context Tests
    test('validates environment types in context', () => {
        const environments = ['production', 'staging', 'development']
        environments.forEach((environment) => {
            const log = {
                ...validAuditLog,
                context: { ...validAuditLog.context, environment }
            }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    test('validates context with performance metrics', () => {
        const log = {
            ...validAuditLog,
            context: {
                ...validAuditLog.context,
                latency: 100,
                requestSize: 1024,
                responseSize: 512,
                heapUsage: 256,
                gcPause: 50,
                threadCount: 4
            }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    // Event Tests
    test('validates all audit log event types', () => {
        const events = Object.values(unkeyAuditLogEvents.enum)
        events.forEach((event) => {
            const log = { ...validAuditLog, event }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    // Developer Platform Specific Tests
    test('validates developer tier levels', () => {
        const tiers = ['free', 'pro', 'enterprise']
        tiers.forEach((developerTier) => {
            const log = {
                ...validAuditLog,
                actor: { ...validAuditLog.actor, developerTier }
            }
            const result = auditLogSchemaV1.safeParse(log)
            expect(result.success).toBe(true)
        })
    })

    test('validates API version and SDK information', () => {
        const log = {
            ...validAuditLog,
            meta: {
                sdkVersion: '1.2.3',
                apiVersion: 'v2',
                featureFlags: { beta: true, experimental: false }
            }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    // Error Cases
    test('rejects invalid workspace ID format', () => {
        const log = { ...validAuditLog, workspaceId: '' }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(false)
    })

    test('rejects invalid actor type', () => {
        const log = {
            ...validAuditLog,
            actor: { ...validAuditLog.actor, type: 'invalid' }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(false)
    })

    test('rejects invalid meta number values', () => {
        const log = {
            ...validAuditLog,
            meta: { amount: 'invalid' }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(false)
    })

    // Complex Scenarios
    test('validates complete audit trail with all optional fields', () => {
        const complexLog = {
            workspaceId: 'ws_123',
            bucket: 'api_logs',
            auditLogId: 'al_123',
            event: 'api.create',
            time: Date.now(),
            resources: [{ type: 'api', id: 'api_123' }],
            meta: {
                amount: 1000,
                currency: 'USD',
                billingPeriod: '2024-03',
                exchangeRate: 1.2,
                taxAmount: 200,
                taxRate: 0.2,
                previousValue: { status: 'draft' },
                newValue: { status: 'published' },
                thresholdType: 'amount',
                thresholdValue: 5000,
                status: 'completed',
                priority: 'high',
                requestCount: 1500,
                successRate: 99.9,
                modelVersion: '2.0.0',
                inferenceTime: 150
            },
            actor: {
                type: 'user',
                id: 'user_123',
                name: 'John Doe',
                email: 'john@example.com',
                authenticationType: 'sso',
                organizationRole: 'admin',
                accessScopes: ['read', 'write'],
                apiKeyType: 'production',
                verificationStatus: 'verified',
                developerTier: 'enterprise'
            },
            context: {
                location: 'us-east-1',
                userAgent: 'Mozilla/5.0',
                ipAddress: '127.0.0.1'
            }
        }
        const result = auditLogSchemaV1.safeParse(complexLog)
        expect(result.success).toBe(true)
    })

    test('validates resource with complete meta information', () => {
        const log = {
            ...validAuditLog,
            resources: [
                {
                    ...validAuditLog.resources[0],
                    meta: {
                        amount: 500,
                        currency: 'EUR',
                        category: 'compute',
                        status: 'active',
                        version: '1.0.0',
                        tags: ['production', 'high-priority'],
                        region: 'eu-west-1',
                        environment: 'production',
                        visibility: 'private',
                        accessLevel: 'admin',
                        createdAt: Date.now(),
                        endpoint: '/api/v1/resource',
                        method: 'POST',
                        rateLimitQuota: 1000,
                        uptime: 99.99,
                        healthScore: 0.98,
                        configVersion: '2.1.0',
                        customDomain: 'api.example.com'
                    }
                }
            ]
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    test('validates ML/AI specific audit fields', () => {
        const log = {
            ...validAuditLog,
            meta: {
                modelVersion: '2.0.0',
                modelAccuracy: 0.95,
                inferenceTime: 100,
                trainingDuration: 3600,
                cpuUsage: 80,
                memoryUsage: 1024,
                gpuUtilization: 75
            }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })

    test('validates security-related audit fields', () => {
        const log = {
            ...validAuditLog,
            context: {
                ...validAuditLog.context,
                tlsVersion: '1.3',
                cipherSuite: 'TLS_AES_256_GCM_SHA384',
                riskScore: 0.1,
                authenticated: true,
                authMethod: 'mfa',
                roles: ['admin'],
                permissions: ['read', 'write', 'delete']
            }
        }
        const result = auditLogSchemaV1.safeParse(log)
        expect(result.success).toBe(true)
    })
})
