import 'server-only'

import { Redis, SetCommandOptions } from '@upstash/redis'

// Declare process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            UPSTASH_REDIS_REST_URL: string
            UPSTASH_REDIS_REST_TOKEN: string
        }
    }
}

/**
 * Cache configuration options
 */
export interface CacheOptions {
    /** Time-to-live in seconds */
    ttl?: number
    /** Optional tags for cache invalidation */
    tags?: string[]
}

/**
 * Default cache options
 */
const DEFAULT_CACHE_OPTIONS: CacheOptions = {
    ttl: 3600, // 1 hour
    tags: []
}

/**
 * Enhanced Redis client with additional functionality for dev platforms
 */
class EnhancedRedis extends Redis {
    /**
     * Cache a value with optional TTL and tags
     */
    async cache<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
        const { ttl, tags } = { ...DEFAULT_CACHE_OPTIONS, ...options }

        // Store the value with TTL
        if (ttl) {
            await this.set(key, value, { ex: ttl } as SetCommandOptions)
        } else {
            await this.set(key, value)
        }

        // Store tags for cache invalidation
        if (tags && tags.length > 0) {
            await Promise.all([this.sadd(`tags:${key}`, tags), ...tags.map((tag) => this.sadd(`keys:${tag}`, key))])
        }
    }

    /**
     * Get a cached value
     */
    async getCached<T>(key: string): Promise<T | null> {
        return this.get<T>(key)
    }

    /**
     * Invalidate cache by tags
     */
    async invalidateByTags(tags: string[]): Promise<void> {
        for (const tag of tags) {
            const keys = await this.smembers<string[]>(`keys:${tag}`)
            if (keys && keys.length > 0) {
                await this.del(...keys)
                await this.del(...keys.map((key) => `tags:${key}`))
                await this.del(`keys:${tag}`)
            }
        }
    }

    /**
     * Store a feature flag
     */
    async setFeatureFlag(flag: string, enabled: boolean, options: { groups?: string[]; percentage?: number } = {}): Promise<void> {
        const key = `feature:${flag}`
        await this.hset(key, {
            enabled,
            ...options,
            updatedAt: new Date().toISOString()
        })
    }

    /**
     * Check if a feature flag is enabled
     */
    async checkFeatureFlag(flag: string, context: { userId?: string; groups?: string[] } = {}): Promise<boolean> {
        const key = `feature:${flag}`
        const flagData = await this.hgetall<{
            enabled: boolean
            groups?: string[]
            percentage?: number
        }>(key)

        if (!flagData) return false

        // Check if globally enabled/disabled
        if (!flagData.enabled) return false

        // Check user groups
        if (flagData.groups?.length && context.groups?.length) {
            const hasMatchingGroup = flagData.groups.some((group) => context.groups?.includes(group))
            if (!hasMatchingGroup) return false
        }

        // Check percentage rollout
        if (flagData.percentage !== undefined && context.userId) {
            const hash = await this.deterministicHash(`${flag}:${context.userId}`)
            if (hash > flagData.percentage) return false
        }

        return true
    }

    /**
     * Add a job to a queue
     */
    async enqueue<T>(queue: string, data: T, options: { priority?: 'low' | 'normal' | 'high'; delay?: number } = {}): Promise<string> {
        const { priority = 'normal', delay = 0 } = options
        const jobId = await this.generateId()
        const score = Date.now() + delay

        const job = {
            id: jobId,
            data,
            status: 'pending',
            priority,
            createdAt: new Date().toISOString()
        }

        // Store job data
        await this.set(`job:${jobId}`, job)

        // Add to queue with priority-based score
        const priorityMultiplier = { low: 1, normal: 2, high: 3 }[priority]
        const finalScore = score * priorityMultiplier

        // Use simpler zadd overload
        await this.zadd(`queue:${queue}`, { score: finalScore, member: jobId })

        return jobId
    }

    /**
     * Process jobs from a queue
     */
    async processQueue<T>(queue: string, processor: (job: { id: string; data: T }) => Promise<void>): Promise<void> {
        while (true) {
            // Get next job
            const [jobId] = await this.zpopmin(`queue:${queue}`)
            if (!jobId) break

            // Get job data
            const job = await this.get<{ id: string; data: T }>(`job:${jobId}`)
            if (!job) continue

            try {
                // Process job
                await processor(job)
                // Mark as completed
                await this.hset(`job:${jobId}`, {
                    status: 'completed',
                    completedAt: new Date().toISOString()
                })
            } catch (error) {
                // Mark as failed
                await this.hset(`job:${jobId}`, {
                    status: 'failed',
                    error: error instanceof Error ? error.message : String(error),
                    failedAt: new Date().toISOString()
                })
            }
        }
    }

    /**
     * Generate a deterministic hash for consistent percentage-based rollouts
     */
    private async deterministicHash(input: string): Promise<number> {
        const encoder = new TextEncoder()
        const data = encoder.encode(input)
        const hashBuffer = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b: number) => b.toString(16).padStart(2, '0')).join('')
        return Number.parseInt(hashHex.slice(0, 8), 16) % 100
    }

    /**
     * Generate a unique ID
     */
    private async generateId(): Promise<string> {
        return `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }
}

/**
 * Redis client instance for interacting with Upstash Redis.
 *
 * @example
 * ```typescript
 * // Cache management
 * await kv.cache('key', value, { ttl: 3600, tags: ['user:123'] });
 * const value = await kv.getCached('key');
 * await kv.invalidateByTags(['user:123']);
 *
 * // Feature flags
 * await kv.setFeatureFlag('new-ui', true, { groups: ['beta'] });
 * const isEnabled = await kv.checkFeatureFlag('new-ui', {
 *   userId: '123',
 *   groups: ['beta']
 * });
 *
 * // Job queues
 * const jobId = await kv.enqueue('builds', buildData, { priority: 'high' });
 * await kv.processQueue('builds', async (job) => {
 *   await processBuild(job.data);
 * });
 * ```
 */
export const kv = new EnhancedRedis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
})

export const client = kv
