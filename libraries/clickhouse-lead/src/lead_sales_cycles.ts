import { z } from 'zod'
import type { Inserter, Querier } from './client'
import { SalesCycleEventSchema } from './types/lead-sales-cycle-event'
import { dateTimeToUnix } from './util'

/**
 * Enumeration of possible sales cycle activity types.
 * Defines the different types of interactions in the sales process.
 */
const activityType = z.enum(['CALL', 'MEETING', 'EMAIL', 'DEMO', 'PROPOSAL', 'NEGOTIATION', 'CONTRACT_REVIEW', 'FOLLOW_UP'])

/**
 * Enumeration of possible activity statuses.
 * Tracks the current state of each sales activity.
 */
const activityStatus = z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'])

/**
 * Enumeration of possible activity outcomes.
 * Indicates the result or impact of a sales activity.
 */
const activityOutcome = z.enum(['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'NEEDS_FOLLOW_UP'])

/**
 * Base parameters schema for sales cycle queries.
 *
 * @property workspaceId - Unique identifier for the workspace
 * @property leadId - Optional filter for specific lead
 * @property opportunityId - Optional filter for specific opportunity
 * @property activityType - Optional filter for specific activity type
 * @property start - Start timestamp in Unix milliseconds (defaults to 0)
 * @property end - End timestamp in Unix milliseconds (defaults to current time)
 */
const params = z.object({
    workspaceId: z.string(),
    leadId: z.string().optional(),
    opportunityId: z.string().optional(),
    activityType: activityType.optional(),
    start: z.number().default(0),
    end: z.number().default(() => Date.now())
})

/**
 * Creates a function to insert new sales cycle events into the database.
 *
 * @param ch - The ClickHouse inserter instance
 * @returns A function that can insert sales cycle events
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const insert = insertSalesCycleEvent(ch);
 *
 * await insert({
 *   workspace_id: 'ws_123',
 *   lead_id: 'lead_456',
 *   activity_type: 'MEETING',
 *   activity_status: 'COMPLETED',
 *   activity_outcome: 'POSITIVE',
 *   meeting_sentiment_score: 0.85
 * });
 * ```
 */
export function insertSalesCycleEvent(ch: Inserter) {
    return ch.insert({
        table: 'leads.sales_cycle_events_v1',
        schema: SalesCycleEventSchema.partial()
    })
}

/**
 * Creates a function to get sales activity metrics aggregated by minute.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns per-minute metrics
 *
 * @remarks
 * Returns basic activity metrics including:
 * - Total activities count
 * - Positive outcome count
 * - Average sentiment score
 * - Average deal health score
 *
 * Results are filled with zeros for minutes with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getMinutely = getSalesActivitiesPerMinute(ch);
 *
 * const metrics = await getMinutely({
 *   workspaceId: 'ws_123',
 *   start: Date.now() - 3600000, // Last hour
 *   end: Date.now(),
 *   activityType: 'CALL'
 * });
 * ```
 */
export function getSalesActivitiesPerMinute(ch: Querier) {
    return async (args: z.input<typeof params>) => {
        const query = ch.query({
            query: `
    SELECT
      time,
      activity_type,
      count() as total_activities,
      countIf(activity_outcome = 'POSITIVE') as positive_outcomes,
      avg(meeting_sentiment_score) as avg_sentiment,
      avg(deal_health_score) as avg_deal_health
    FROM leads.sales_cycle_events_v1
    WHERE workspace_id = {workspaceId: String}
      ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
      ${args.opportunityId ? 'AND opportunity_id = {opportunityId: String}' : ''}
      ${args.activityType ? 'AND activity_type = {activityType: String}' : ''}
      AND time >= fromUnixTimestamp64Milli({start: Int64})
      AND time <= fromUnixTimestamp64Milli({end: Int64})
      AND is_deleted = 0
    GROUP BY time, activity_type
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfMinute(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfMinute(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 MINUTE
    ;`,
            params,
            schema: z.object({
                time: dateTimeToUnix,
                activity_type: activityType,
                total_activities: z.number(),
                positive_outcomes: z.number(),
                avg_sentiment: z.number().nullable(),
                avg_deal_health: z.number().nullable()
            })
        })

        return query(args)
    }
}

/**
 * Creates a function to get detailed sales activity metrics aggregated by hour.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns hourly metrics
 *
 * @remarks
 * Returns comprehensive metrics including:
 * - Activity counts (total, positive, completed)
 * - Sentiment and deal health scores
 * - Deal values and win probabilities
 *
 * Results are filled with zeros for hours with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getHourly = getSalesActivitiesPerHour(ch);
 *
 * const metrics = await getHourly({
 *   workspaceId: 'ws_123',
 *   start: 1709251200000, // 2024-03-01 00:00:00
 *   end: 1709337600000,   // 2024-03-02 00:00:00
 *   opportunityId: 'opp_789'
 * });
 * ```
 */
export function getSalesActivitiesPerHour(ch: Querier) {
    return async (args: z.infer<typeof params>) => {
        const query = ch.query({
            query: `
    SELECT
      time,
      activity_type,
      count() as total_activities,
      countIf(activity_outcome = 'POSITIVE') as positive_outcomes,
      countIf(activity_status = 'COMPLETED') as completed_activities,
      avg(meeting_sentiment_score) as avg_sentiment,
      avg(deal_health_score) as avg_deal_health,
      sum(current_deal_size) as total_deal_value,
      avg(win_probability) as avg_win_probability
    FROM leads.sales_cycle_events_v1
    WHERE workspace_id = {workspaceId: String}
      ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
      ${args.opportunityId ? 'AND opportunity_id = {opportunityId: String}' : ''}
      ${args.activityType ? 'AND activity_type = {activityType: String}' : ''}
      AND time >= fromUnixTimestamp64Milli({start: Int64})
      AND time <= fromUnixTimestamp64Milli({end: Int64})
      AND is_deleted = 0
    GROUP BY time, activity_type
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfHour(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfHour(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 HOUR
    ;`,
            params,
            schema: z.object({
                time: dateTimeToUnix,
                activity_type: activityType,
                total_activities: z.number(),
                positive_outcomes: z.number(),
                completed_activities: z.number(),
                avg_sentiment: z.number().nullable(),
                avg_deal_health: z.number().nullable(),
                total_deal_value: z.number(),
                avg_win_probability: z.number().nullable()
            })
        })

        return query(args)
    }
}

/**
 * Creates a function to retrieve the most recent sales activities.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns recent activities
 *
 * @remarks
 * Returns detailed information about the 50 most recent activities including:
 * - Event details (ID, time, type, status)
 * - Lead and opportunity information
 * - Meeting metrics (sentiment, topics)
 * - Deal metrics (size, probability, health)
 *
 * Results are ordered by time in descending order.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getLatest = getLatestSalesActivities(ch);
 *
 * const activities = await getLatest({
 *   workspaceId: 'ws_123',
 *   leadId: 'lead_456',
 *   activityType: 'DEMO'
 * });
 * ```
 */
export function getLatestSalesActivities(ch: Querier) {
    return async (args: z.input<typeof params>) => {
        const query = ch.query({
            query: `
    SELECT
      event_id,
      time,
      lead_id,
      opportunity_id,
      activity_type,
      activity_status,
      activity_outcome,
      primary_rep_id,
      meeting_sentiment_score,
      key_topics_discussed,
      current_deal_size,
      win_probability,
      deal_health_score
    FROM leads.sales_cycle_events_v1
    WHERE workspace_id = {workspaceId: String}
      ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
      ${args.opportunityId ? 'AND opportunity_id = {opportunityId: String}' : ''}
      ${args.activityType ? 'AND activity_type = {activityType: String}' : ''}
      AND is_deleted = 0
    ORDER BY time DESC
    LIMIT 50
    ;`,
            params,
            schema: z.object({
                event_id: z.string(),
                time: z.number(),
                lead_id: z.string(),
                opportunity_id: z.string().nullable(),
                activity_type: activityType,
                activity_status: activityStatus,
                activity_outcome: activityOutcome.nullable(),
                primary_rep_id: z.string(),
                meeting_sentiment_score: z.number().nullable(),
                key_topics_discussed: z.array(z.string()).nullable(),
                current_deal_size: z.number().nullable(),
                win_probability: z.number().nullable(),
                deal_health_score: z.number().nullable()
            })
        })

        return query(args)
    }
}

/**
 * Creates a function to get comprehensive sales activity metrics aggregated by day.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns daily metrics
 *
 * @remarks
 * Returns extensive metrics including:
 * - Activity metrics (total, positive, completed)
 * - Deal metrics (value, probability, health)
 * - Team performance (active reps, regions)
 * - Priority and clarity scores
 *
 * Results are filled with zeros for days with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getDaily = getSalesActivitiesPerDay(ch);
 *
 * const metrics = await getDaily({
 *   workspaceId: 'ws_123',
 *   start: 1709251200000, // 2024-03-01 00:00:00
 *   end: 1711929600000,   // 2024-04-01 00:00:00
 * });
 * ```
 */
export function getSalesActivitiesPerDay(ch: Querier) {
    return async (args: z.infer<typeof params>) => {
        const query = ch.query({
            query: `
    SELECT
      time,
      activity_type,
      count() as total_activities,
      countIf(activity_outcome = 'POSITIVE') as positive_outcomes,
      countIf(activity_status = 'COMPLETED') as completed_activities,
      avg(meeting_sentiment_score) as avg_sentiment,
      avg(deal_health_score) as avg_deal_health,
      sum(current_deal_size) as total_deal_value,
      avg(win_probability) as avg_win_probability,
      -- Additional daily metrics
      countIf(activity_priority = 'HIGH') as high_priority_activities,
      avg(next_steps_clarity_score) as avg_next_steps_clarity,
      groupArray(distinct sales_region) as active_regions,
      count(distinct primary_rep_id) as active_reps
    FROM leads.sales_cycle_events_v1
    WHERE workspace_id = {workspaceId: String}
      ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
      ${args.opportunityId ? 'AND opportunity_id = {opportunityId: String}' : ''}
      ${args.activityType ? 'AND activity_type = {activityType: String}' : ''}
      AND time >= fromUnixTimestamp64Milli({start: Int64})
      AND time <= fromUnixTimestamp64Milli({end: Int64})
      AND is_deleted = 0
    GROUP BY time, activity_type
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfDay(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfDay(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 DAY
    ;`,
            params,
            schema: z.object({
                time: dateTimeToUnix,
                activity_type: activityType,
                total_activities: z.number(),
                positive_outcomes: z.number(),
                completed_activities: z.number(),
                avg_sentiment: z.number().nullable(),
                avg_deal_health: z.number().nullable(),
                total_deal_value: z.number(),
                avg_win_probability: z.number().nullable(),
                high_priority_activities: z.number(),
                avg_next_steps_clarity: z.number().nullable(),
                active_regions: z.array(z.string()),
                active_reps: z.number()
            })
        })

        return query(args)
    }
}

/**
 * Creates a function to get comprehensive sales activity metrics with trend analysis by month.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns monthly metrics with trends
 *
 * @remarks
 * Returns extensive metrics and trends including:
 * - Activity Metrics (total, positive, completed)
 * - Deal Metrics (value, probability, health)
 * - Engagement Metrics (sentiment, clarity)
 * - Team Performance (active reps, regions)
 * - Monthly Specific Metrics (complex activities, long meetings)
 * - Conversion Metrics (high probability ratio)
 * - Efficiency Metrics (meeting duration, cancellation rate)
 *
 * Results are filled with zeros for months with no data.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getMonthly = getSalesActivitiesPerMonth(ch);
 *
 * const metrics = await getMonthly({
 *   workspaceId: 'ws_123',
 *   start: 1704067200000, // 2024-01-01 00:00:00
 *   end: 1714608000000,   // 2024-05-01 00:00:00
 * });
 * ```
 */
export function getSalesActivitiesPerMonth(ch: Querier) {
    return async (args: z.infer<typeof params>) => {
        const query = ch.query({
            query: `
    SELECT
      time,
      activity_type,
      -- Activity Metrics
      count() as total_activities,
      countIf(activity_outcome = 'POSITIVE') as positive_outcomes,
      countIf(activity_status = 'COMPLETED') as completed_activities,
      
      -- Deal Metrics
      sum(current_deal_size) as total_deal_value,
      avg(win_probability) as avg_win_probability,
      avg(deal_health_score) as avg_deal_health,
      
      -- Engagement Metrics
      avg(meeting_sentiment_score) as avg_sentiment,
      avg(next_steps_clarity_score) as avg_next_steps_clarity,
      
      -- Team Performance
      count(distinct primary_rep_id) as active_reps,
      groupArray(distinct sales_region) as active_regions,
      
      -- Monthly Specific Metrics
      countIf(activity_complexity >= 80) as complex_activities,
      countIf(meeting_duration_seconds > 1800) as long_meetings,
      
      -- Conversion Metrics
      countIf(win_probability >= 80) / countIf(win_probability > 0) as high_probability_ratio,
      
      -- Efficiency Metrics
      avg(meeting_duration_seconds) as avg_meeting_duration,
      countIf(activity_status = 'CANCELLED') / count() as cancellation_rate
      
    FROM leads.sales_cycle_events_v1
    WHERE workspace_id = {workspaceId: String}
      ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
      ${args.opportunityId ? 'AND opportunity_id = {opportunityId: String}' : ''}
      ${args.activityType ? 'AND activity_type = {activityType: String}' : ''}
      AND time >= fromUnixTimestamp64Milli({start: Int64})
      AND time <= fromUnixTimestamp64Milli({end: Int64})
      AND is_deleted = 0
    GROUP BY time, activity_type
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfMonth(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfMonth(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 MONTH
    ;`,
            params,
            schema: z.object({
                time: dateTimeToUnix,
                activity_type: activityType,
                // Activity Metrics
                total_activities: z.number(),
                positive_outcomes: z.number(),
                completed_activities: z.number(),

                // Deal Metrics
                total_deal_value: z.number(),
                avg_win_probability: z.number().nullable(),
                avg_deal_health: z.number().nullable(),

                // Engagement Metrics
                avg_sentiment: z.number().nullable(),
                avg_next_steps_clarity: z.number().nullable(),

                // Team Performance
                active_reps: z.number(),
                active_regions: z.array(z.string()),

                // Monthly Specific Metrics
                complex_activities: z.number(),
                long_meetings: z.number(),

                // Conversion Metrics
                high_probability_ratio: z.number().nullable(),

                // Efficiency Metrics
                avg_meeting_duration: z.number().nullable(),
                cancellation_rate: z.number()
            })
        })

        return query(args)
    }
}
