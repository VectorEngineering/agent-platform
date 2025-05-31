import { metricSchema } from '@playbookmedia/metrics'
import { z } from 'zod'

/**
 * Schema for log context that must be included with every log entry
 * @remarks
 * This schema enforces that every log entry must have a requestId for tracing purposes
 */
export const logContext = z.object({
    requestId: z.string()
})

/**
 * Common fields that are required for all log and metric entries
 * @remarks
 * These fields provide essential metadata for every logging event
 */
const commonFields = z.object({
    /** The environment where the log was generated */
    environment: z.enum(['test', 'development', 'preview', 'canary', 'production', 'unknown']),

    /** The application component that generated the log */
    application: z.enum([
        'api',
        'semantic-cache',
        'agent',
        'logdrain',
        'vault',
        'payments',
        'accounts',
        'transactions',
        'fraud-detection',
        'kyc',
        'trading',
        'portfolio',
        'risk-management',
        'compliance',
        'reporting'
    ]),

    /** Optional ID for isolating specific execution contexts */
    isolateId: z.string().optional(),

    /** Unique identifier for the request that generated this log */
    requestId: z.string(),

    /** Unix timestamp when the log was generated */
    time: z.number()
})

/**
 * Comprehensive schema for all log and metric entries in the system
 * @remarks
 * This schema uses a discriminated union to handle different types of logs:
 * - Regular logs with levels and messages
 * - Metric events with specific measurement data
 */
export const logSchema = z.discriminatedUnion('type', [
    commonFields.merge(
        z.object({
            /** Identifies this as a regular log entry */
            type: z.literal('log'),

            /** The severity level of the log */
            level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),

            /** The main log message */
            message: z.string(),

            /** Additional structured context data */
            context: z.record(z.any())
        })
    ),
    commonFields.merge(
        z.object({
            /** Identifies this as a metric entry */
            type: z.literal('metric'),

            /** The metric data following the metrics schema */
            metric: metricSchema
        })
    )
])

/** Type definition extracted from the log schema */
export type LogSchema = z.infer<typeof logSchema>

/**
 * Class representing a structured log entry
 * @typeParam TLog - The specific type of log entry, defaults to LogSchema
 *
 * @example
 * ```typescript
 * // Creating a regular log
 * const logEntry = new Log({
 *   type: "log",
 *   level: "info",
 *   message: "User logged in",
 *   context: { userId: "123" },
 *   environment: "production",
 *   application: "api",
 *   requestId: "req-abc",
 *   time: Date.now()
 * });
 *
 * // Creating a metric log
 * const metricEntry = new Log({
 *   type: "metric",
 *   metric: {
 *     metric: "metric.cache.read",
 *     key: "user:123",
 *     hit: true,
 *     latency: 50,
 *     tier: "memory",
 *     namespace: "users",
 *     status: "fresh"
 *   },
 *   environment: "production",
 *   application: "api",
 *   requestId: "req-abc",
 *   time: Date.now()
 * });
 * ```
 */
export class Log<TLog extends LogSchema = LogSchema> {
    /** The validated log entry */
    public readonly log: TLog

    /**
     * Creates a new Log instance
     * @param log - The log entry to store
     */
    constructor(log: TLog) {
        this.log = log
    }

    /**
     * Converts the log entry to a JSON string
     * @returns The stringified log entry
     */
    public toString(): string {
        return JSON.stringify(this.log)
    }
}
