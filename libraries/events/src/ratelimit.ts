import 'server-only'

import { Ratelimit } from '@upstash/ratelimit'
import { client } from '.'

/**
 * Rate limiter instance configured with a fixed window strategy.
 *
 * @remarks
 * This is a server-side only module and should not be imported in client-side code.
 * The rate limiter is configured to allow:
 * - 10 requests per window
 * - Window duration: 10 seconds
 *
 * @example
 * ```typescript
 * import { ratelimit } from './ratelimit';
 *
 * // Check if request is allowed
 * const result = await ratelimit.limit('identifier');
 * if (!result.success) {
 *   throw new Error('Too many requests');
 * }
 * ```
 *
 * @see {@link https://github.com/upstash/ratelimit Documentation for @upstash/ratelimit}
 */
export const ratelimit = new Ratelimit({
    limiter: Ratelimit.fixedWindow(10, '10s'),
    redis: client
})
