import { z } from 'zod'
import type { Inserter, Querier } from './client/interface'
import { LeadInteractionEventSchema } from './types'
import { LeadInteractionEvent } from './types/lead-interaction-event'
import { dateTimeToUnix } from './util'

/**
 * Base parameters schema for interaction queries.
 *
 * @property workspaceId - Unique identifier for the workspace
 * @property start - Start timestamp in Unix milliseconds
 * @property end - End timestamp in Unix milliseconds
 * @property channel - Optional filter for specific interaction channel
 * @property interactionType - Optional filter for specific type of interaction
 * @property email - Optional filter for specific user email
 */
const baseParams = z.object({
    workspaceId: z.string(),
    start: z.number().int(),
    end: z.number().int(),
    channel: z.string().optional(),
    interactionType: z.string().optional(),
    email: z.string().optional()
})

/**
 * Creates a function to insert new lead interaction events into the database.
 *
 * @param ch - The ClickHouse inserter instance
 * @returns A function that can insert lead interaction events
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const insert = insertInteraction(ch);
 *
 * await insert({
 *   workspace_id: 'ws_123',
 *   lead_id: 'lead_456',
 *   channel: 'email',
 *   interaction_type: 'open',
 *   depth_of_engagement: 0.75
 * });
 * ```
 */
export function insertInteraction(ch: Inserter) {
    return ch.insert({
        table: 'leads.raw_interaction_events_v1',
        schema: LeadInteractionEventSchema.partial()
    })
}

/**
 * Creates a function to get hourly lead interaction metrics.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns hourly metrics
 *
 * @remarks
 * Returns the following metrics aggregated by hour:
 * - Number of unique active leads
 * - Total number of interactions
 * - Number of unique sessions
 * - Average engagement score
 * - Array of unique channels used
 * - Array of unique interaction types
 *
 * Results are filled with zeros for hours with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getHourly = getActiveInteractionsPerHour(ch);
 *
 * const metrics = await getHourly({
 *   workspaceId: 'ws_123',
 *   start: 1709251200000, // 2024-03-01 00:00:00
 *   end: 1709337600000,   // 2024-03-02 00:00:00
 *   channel: 'email'      // optional
 * });
 * ```
 */
export function getActiveInteractionsPerHour(ch: Querier) {
    return async (args: z.infer<typeof baseParams>) => {
        const query = ch.query({
            query: `
      SELECT
        time,
        count(DISTINCT lead_id) as active_leads,
        count() as total_interactions,
        count(DISTINCT session_id) as unique_sessions,
        avg(depth_of_engagement) as engagement_score,
        groupArray(DISTINCT channel) as channels,
        groupArray(DISTINCT interaction_type) as interaction_types
      FROM leads.raw_interaction_events_v1
      WHERE 
        workspace_id = {workspaceId: String}
        AND time >= fromUnixTimestamp64Milli({start: Int64})
        AND time < fromUnixTimestamp64Milli({end: Int64})
        ${args.channel ? 'AND channel = {channel: String}' : ''}
        ${args.interactionType ? 'AND interaction_type = {interactionType: String}' : ''}
        AND is_deleted = 0
      GROUP BY time
      ORDER BY time ASC
      WITH FILL
        FROM toStartOfHour(fromUnixTimestamp64Milli({start: Int64}))
        TO toStartOfHour(fromUnixTimestamp64Milli({end: Int64}))
        STEP INTERVAL 1 HOUR
      ;`,
            params: baseParams,
            schema: LeadInteractionEventSchema.partial()
        })

        return query(args)
    }
}

/**
 * Creates a function to get daily lead interaction metrics.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns daily metrics
 *
 * @remarks
 * Returns the following metrics aggregated by day:
 * - Number of unique active leads
 * - Total number of interactions
 * - Number of unique sessions
 * - Average engagement score
 * - Array of unique channels used
 * - Array of unique interaction types
 *
 * Results are filled with zeros for days with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getDaily = getActiveInteractionsPerDay(ch);
 *
 * const metrics = await getDaily({
 *   workspaceId: 'ws_123',
 *   start: 1709251200000, // 2024-03-01 00:00:00
 *   end: 1711929600000,   // 2024-04-01 00:00:00
 *   interactionType: 'click' // optional
 * });
 * ```
 */
export function getActiveInteractionsPerDay(ch: Querier) {
    return async (args: z.infer<typeof baseParams>) => {
        const query = ch.query({
            query: `
      SELECT
        time,
        count(DISTINCT lead_id) as active_leads,
        count() as total_interactions,
        count(DISTINCT session_id) as unique_sessions,
        avg(depth_of_engagement) as engagement_score,
        groupArray(DISTINCT channel) as channels,
        groupArray(DISTINCT interaction_type) as interaction_types
      FROM leads.raw_interaction_events_v1
      WHERE
        workspace_id = {workspaceId: String}
        AND time >= fromUnixTimestamp64Milli({start: Int64})
        AND time < fromUnixTimestamp64Milli({end: Int64})
        ${args.channel ? 'AND channel = {channel: String}' : ''}
        ${args.interactionType ? 'AND interaction_type = {interactionType: String}' : ''}
        AND is_deleted = 0
      GROUP BY time
      ORDER BY time ASC
      WITH FILL
        FROM toStartOfDay(fromUnixTimestamp64Milli({start: Int64}))
        TO toStartOfDay(fromUnixTimestamp64Milli({end: Int64}))
        STEP INTERVAL 1 DAY
      ;`,
            params: baseParams,
            schema: LeadInteractionEventSchema.partial()
        })

        return query(args)
    }
}

/**
 * Creates a function to get monthly lead interaction metrics.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns monthly metrics
 *
 * @remarks
 * Returns the following metrics aggregated by month:
 * - Number of unique active leads
 * - Total number of interactions
 * - Number of unique sessions
 * - Average engagement score
 * - Array of unique channels used
 * - Array of unique interaction types
 *
 * Results are filled with zeros for months with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getMonthly = getActiveInteractionsPerMonth(ch);
 *
 * const metrics = await getMonthly({
 *   workspaceId: 'ws_123',
 *   start: 1704067200000, // 2024-01-01 00:00:00
 *   end: 1714608000000,   // 2024-05-01 00:00:00
 * });
 * ```
 */
export function getActiveInteractionsPerMonth(ch: Querier) {
    return async (args: z.infer<typeof baseParams>) => {
        const query = ch.query({
            query: `
      SELECT
        time,
        count(DISTINCT lead_id) as active_leads,
        count() as total_interactions,
        count(DISTINCT session_id) as unique_sessions,
        avg(depth_of_engagement) as engagement_score,
        groupArray(DISTINCT channel) as channels,
        groupArray(DISTINCT interaction_type) as interaction_types
      FROM leads.raw_interaction_events_v1
      WHERE
        workspace_id = {workspaceId: String}
        AND time >= fromUnixTimestamp64Milli({start: Int64})
        AND time < fromUnixTimestamp64Milli({end: Int64})
        ${args.channel ? 'AND channel = {channel: String}' : ''}
        ${args.interactionType ? 'AND interaction_type = {interactionType: String}' : ''}
        AND is_deleted = 0
      GROUP BY time
      ORDER BY time ASC
      WITH FILL
        FROM toStartOfMonth(fromUnixTimestamp64Milli({start: Int64}))
        TO toStartOfMonth(fromUnixTimestamp64Milli({end: Int64}))
        STEP INTERVAL 1 MONTH
      ;`,
            params: baseParams,
            schema: LeadInteractionEventSchema.partial()
        })

        return query(args)
    }
}
