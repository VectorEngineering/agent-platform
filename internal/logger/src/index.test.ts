import { Log, logContext, logSchema, LogSchema } from './index'

describe('Log schemas and class', () => {
    describe('logContext', () => {
        it('should validate valid log context', () => {
            const validContext = { requestId: '123-abc' }
            expect(logContext.parse(validContext)).toEqual(validContext)
        })

        it('should reject invalid log context', () => {
            const invalidContext = { requestId: 123 }
            expect(() => logContext.parse(invalidContext)).toThrow()
        })
    })

    describe('logSchema', () => {
        const baseFields = {
            environment: 'production' as const,
            application: 'api' as const,
            requestId: 'req-123',
            time: Date.now()
        }

        describe('log type', () => {
            it('should validate valid log entry', () => {
                const validLog = {
                    ...baseFields,
                    type: 'log' as const,
                    level: 'info' as const,
                    message: 'Test message',
                    context: { foo: 'bar' }
                }
                expect(logSchema.parse(validLog)).toEqual(validLog)
            })

            it('should validate log with optional isolateId', () => {
                const validLog = {
                    ...baseFields,
                    isolateId: 'iso-123',
                    type: 'log' as const,
                    level: 'info' as const,
                    message: 'Test message',
                    context: {}
                }
                expect(logSchema.parse(validLog)).toEqual(validLog)
            })

            it('should reject log with invalid level', () => {
                const invalidLog = {
                    ...baseFields,
                    type: 'log' as const,
                    level: 'invalid',
                    message: 'Test message',
                    context: {}
                }
                expect(() => logSchema.parse(invalidLog)).toThrow()
            })

            it('should reject log with missing required fields', () => {
                const invalidLog = {
                    ...baseFields,
                    type: 'log' as const,
                    level: 'info' as const,
                    // message is missing
                    context: {}
                }
                expect(() => logSchema.parse(invalidLog)).toThrow()
            })
        })

        describe('metric type', () => {
            it('should validate valid metric entry', () => {
                const validMetric = {
                    ...baseFields,
                    type: 'metric' as const,
                    metric: {
                        metric: 'metric.cache.read',
                        key: 'test-key',
                        hit: true,
                        latency: 100,
                        tier: 'memory',
                        namespace: 'default',
                        status: 'fresh'
                    }
                }
                expect(logSchema.parse(validMetric)).toEqual(validMetric)
            })

            it('should validate different metric type', () => {
                const validMetric = {
                    ...baseFields,
                    type: 'metric' as const,
                    metric: {
                        metric: 'metric.http.request',
                        method: 'GET',
                        path: '/api/test',
                        status: 200,
                        serviceLatency: 45,
                        host: 'api.example.com',
                        userAgent: 'test-agent',
                        context: {}
                    }
                }
                expect(logSchema.parse(validMetric)).toEqual(validMetric)
            })

            it('should reject metric with invalid metric type', () => {
                const invalidMetric = {
                    ...baseFields,
                    type: 'metric' as const,
                    metric: {
                        metric: 'invalid.metric.type',
                        value: 123
                    }
                }
                expect(() => logSchema.parse(invalidMetric)).toThrow()
            })

            it('should reject metric with missing required fields', () => {
                const invalidMetric = {
                    ...baseFields,
                    type: 'metric' as const,
                    metric: {
                        metric: 'metric.cache.read'
                        // missing required fields like key, hit, latency, etc.
                    }
                }
                expect(() => logSchema.parse(invalidMetric)).toThrow()
            })
        })

        it('should reject unknown log types', () => {
            const invalidType = {
                ...baseFields,
                type: 'unknown' as const
            }
            expect(() => logSchema.parse(invalidType)).toThrow()
        })
    })

    describe('Log class', () => {
        it('should store and stringify log entries', () => {
            const logEntry: LogSchema = {
                environment: 'production',
                application: 'api',
                requestId: 'req-123',
                time: 1234567890,
                type: 'log',
                level: 'info',
                message: 'Test message',
                context: { foo: 'bar' }
            }

            const log = new Log(logEntry)
            expect(log.log).toEqual(logEntry)
            expect(log.toString()).toBe(JSON.stringify(logEntry))
        })

        it('should store and stringify metric entries', () => {
            const metricEntry: LogSchema = {
                environment: 'production',
                application: 'api',
                requestId: 'req-123',
                time: 1234567890,
                type: 'metric',
                metric: {
                    metric: 'metric.cache.read',
                    key: 'test-key',
                    hit: true,
                    latency: 100,
                    tier: 'memory',
                    namespace: 'default',
                    status: 'fresh'
                }
            }

            const log = new Log(metricEntry)
            expect(log.log).toEqual(metricEntry)
            expect(log.toString()).toBe(JSON.stringify(metricEntry))
        })
    })
})
