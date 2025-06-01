import { z } from 'zod'
import type { Inserter, Querier } from './client'
import { LeadEventSchema } from './types/lead'
import { dateTimeToUnix } from './util'

/**
 * Enumeration of possible lead stages in the sales pipeline.
 * Represents the progression of a lead through the sales process.
 */
export const leadStage = z.enum([
    'NEW', // Fresh lead, not yet qualified
    'QUALIFIED', // Lead has been qualified as a potential opportunity
    'OPPORTUNITY', // Qualified lead converted to sales opportunity
    'NEGOTIATION', // Active price/terms negotiation
    'CLOSED_WON', // Successfully closed deal
    'CLOSED_LOST', // Lost opportunity
    'CUSTOMER', // Active customer
    '' // Default/unset state
])

/**
 * Enumeration of possible lead statuses.
 * Indicates the current state or disposition of a lead.
 */
export const leadStatus = z.enum([
    'ACTIVE', // Lead is currently being worked
    'INACTIVE', // Lead is temporarily paused
    'ARCHIVED', // Lead has been archived
    'DELETED', // Lead has been deleted
    'DUPLICATE', // Lead is a duplicate of another lead
    '' // Default/unset state
])

/**
 * Parameters schema for lead queries.
 *
 * @property workspaceId - Unique identifier for the workspace
 * @property start - Start timestamp in Unix milliseconds
 * @property end - End timestamp in Unix milliseconds
 * @property industry - Optional filter for specific industry
 * @property leadId - Optional filter for specific lead
 * @property companySize - Optional filter for company size range
 * @property minScore - Optional minimum lead score filter
 * @property stage - Optional filter for specific lead stage
 * @property status - Optional filter for specific lead status
 */
const params = z.object({
    workspaceId: z.string(),
    start: z.number().int(),
    end: z.number().int(),
    // Optional filters
    industry: z.string().optional(),
    leadId: z.string().optional(),
    companySize: z.string().optional(),
    minScore: z.number().optional(),
    stage: leadStage.optional(),
    status: leadStatus.optional()
})

/**
 * Creates a function to insert new lead events into the database.
 *
 * @param ch - The ClickHouse inserter instance
 * @returns A function that can insert lead events
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const insert = insertLead(ch);
 *
 * await insert({
 *   workspace_id: 'ws_123',
 *   lead_id: 'lead_456',
 *   company: 'Acme Corp',
 *   current_stage: 'QUALIFIED',
 *   current_status: 'ACTIVE',
 *   final_score: 85
 * });
 * ```
 */
export function insertLead(ch: Inserter) {
    return ch.insert({
        table: 'leads.raw_lead_events_v1',
        schema: LeadEventSchema.partial()
    })
}

/**
 * Creates a function to get lead metrics aggregated by hour.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns hourly metrics
 *
 * @remarks
 * Returns comprehensive lead metrics including:
 * - Lead counts by stage
 * - Total deal value
 * - Average scores and probabilities
 * - Engagement metrics
 * - Industry distribution
 * - Conversion rates
 *
 * Results are filtered to exclude test/demo leads and inactive statuses.
 * Data is filled with zeros for hours with no activity.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getHourly = getLeadsPerHour(ch);
 *
 * const metrics = await getHourly({
 *   workspaceId: 'ws_123',
 *   start: 1709251200000, // 2024-03-01 00:00:00
 *   end: 1709337600000,   // 2024-03-02 00:00:00
 *   industry: 'Technology',
 *   minScore: 70
 * });
 * ```
 */
export function getLeadsPerHour(ch: Querier) {
    return async (args: z.input<typeof params>) => {
        const query = `
    SELECT
      time,
      current_stage,
      count() as count,
      sum(deal_size) as total_value,
      avg(final_score) as avg_score,
      avg(probability) as avg_probability,
      avg(website_engagement_score + content_engagement_score + email_engagement_score) / 3 as engagement_score,
      groupArray(distinct industry) as industries,
      tags,
      countIf(current_stage = 'CLOSED_WON') / countIf(current_stage IN ('CLOSED_WON', 'CLOSED_LOST')) as conversion_rate
    FROM leads.raw_lead_events_v1
    WHERE
      workspace_id = {workspaceId: String}
      AND time >= fromUnixTimestamp64Milli({start: Int64})
      AND time <= fromUnixTimestamp64Milli({end: Int64})
      ${args.industry ? 'AND industry = {industry: String}' : ''}
      ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
      ${args.companySize ? 'AND company_size_range = {companySize: String}' : ''}
      ${args.minScore ? 'AND final_score >= {minScore: Int32}' : ''}
      ${args.stage ? 'AND current_stage = {stage: String}' : ''}
      ${args.status ? 'AND current_status = {status: String}' : ''}
      AND NOT (company ILIKE '%test%' OR company ILIKE '%demo%')
      AND current_status NOT IN ('archived', 'deleted', 'duplicate')
    GROUP BY time, current_stage, tags
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfHour(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfHour(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 HOUR
    ;`

        return ch.query({
            query,
            params,
            schema: LeadEventSchema.partial()
        })(args)
    }
}

/**
 * Creates a function to get lead metrics aggregated by day.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns daily metrics
 *
 * @remarks
 * Returns the same comprehensive metrics as getLeadsPerHour, but aggregated by day:
 * - Lead counts by stage
 * - Total deal value
 * - Average scores and probabilities
 * - Engagement metrics
 * - Industry distribution
 * - Conversion rates
 *
 * Results are filtered to exclude test/demo leads and inactive statuses.
 * Data is filled with zeros for days with no activity.
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getDaily = getLeadsPerDay(ch);
 *
 * const metrics = await getDaily({
 *   workspaceId: 'ws_123',
 *   start: 1709251200000, // 2024-03-01 00:00:00
 *   end: 1711929600000,   // 2024-04-01 00:00:00
 *   stage: 'OPPORTUNITY',
 *   status: 'ACTIVE'
 * });
 * ```
 */
export function getLeadsPerDay(ch: Querier) {
    return async (args: z.input<typeof params>) => {
        const query = `
    SELECT
      time,
      current_stage,
      count() as count,
      sum(deal_size) as total_value,
      avg(final_score) as avg_score,
      avg(probability) as avg_probability,
      avg(website_engagement_score + content_engagement_score + email_engagement_score) / 3 as engagement_score,
      groupArray(distinct industry) as industries,
      tags,
      countIf(current_stage = 'CLOSED_WON') / countIf(current_stage IN ('CLOSED_WON', 'CLOSED_LOST')) as conversion_rate
    FROM leads.raw_lead_events_v1
    WHERE
      workspace_id = {workspaceId: String}
    AND time >= fromUnixTimestamp64Milli({start: Int64})
    AND time <= fromUnixTimestamp64Milli({end: Int64})
    ${args.industry ? 'AND industry = {industry: String}' : ''}
    ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
    ${args.companySize ? 'AND company_size_range = {companySize: String}' : ''}
    ${args.minScore ? 'AND final_score >= {minScore: Int32}' : ''}
    ${args.stage ? 'AND current_stage = {stage: String}' : ''}
    ${args.status ? 'AND current_status = {status: String}' : ''}
    AND NOT (company ILIKE '%test%' OR company ILIKE '%demo%')
    AND current_status NOT IN ('archived', 'deleted', 'duplicate')
    GROUP BY time, current_stage, tags
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfDay(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfDay(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 DAY
    ;`

        return ch.query({
            query,
            params,
            schema: LeadEventSchema.partial()
        })(args)
    }
}

/**
 * Creates a function to get lead metrics aggregated by month.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts query parameters and returns monthly metrics
 *
 * @remarks
 * Returns the same comprehensive metrics as getLeadsPerHour/Day, but aggregated by month:
 * - Lead counts by stage
 * - Total deal value
 * - Average scores and probabilities
 * - Engagement metrics
 * - Industry distribution
 * - Conversion rates
 *
 * Results are filtered to exclude test/demo leads and inactive statuses.
 * Data is filled with zeros for months with no activity.
 *
 * This function is particularly useful for:
 * - Analyzing long-term trends
 * - Measuring month-over-month growth
 * - Tracking seasonal patterns
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getMonthly = getLeadsPerMonth(ch);
 *
 * const metrics = await getMonthly({
 *   workspaceId: 'ws_123',
 *   start: 1704067200000, // 2024-01-01 00:00:00
 *   end: 1714608000000,   // 2024-05-01 00:00:00
 *   companySize: 'ENTERPRISE'
 * });
 * ```
 */
export function getLeadsPerMonth(ch: Querier) {
    return async (args: z.input<typeof params>) => {
        const query = `
    SELECT
      time,
      current_stage,
      count() as count,
      sum(deal_size) as total_value,
      avg(final_score) as avg_score,
      avg(probability) as avg_probability,
      avg(website_engagement_score + content_engagement_score + email_engagement_score) / 3 as engagement_score,
      groupArray(distinct industry) as industries,
      tags,
      countIf(current_stage = 'CLOSED_WON') / countIf(current_stage IN ('CLOSED_WON', 'CLOSED_LOST')) as conversion_rate
    FROM leads.raw_lead_events_v1
    WHERE
      workspace_id = {workspaceId: String}
    AND time >= fromUnixTimestamp64Milli({start: Int64})
    AND time <= fromUnixTimestamp64Milli({end: Int64})
    ${args.industry ? 'AND industry = {industry: String}' : ''}
    ${args.leadId ? 'AND lead_id = {leadId: String}' : ''}
    ${args.companySize ? 'AND company_size_range = {companySize: String}' : ''}
    ${args.minScore ? 'AND final_score >= {minScore: Int32}' : ''}
    ${args.stage ? 'AND current_stage = {stage: String}' : ''}
    ${args.status ? 'AND current_status = {status: String}' : ''}
    AND NOT (company ILIKE '%test%' OR company ILIKE '%demo%')
    AND current_status NOT IN ('archived', 'deleted', 'duplicate')
    GROUP BY time, current_stage, tags
    ORDER BY time ASC
    WITH FILL
      FROM toStartOfMonth(fromUnixTimestamp64Milli({start: Int64}))
      TO toStartOfMonth(fromUnixTimestamp64Milli({end: Int64}))
      STEP INTERVAL 1 MONTH
    ;`

        return ch.query({
            query,
            params,
            schema: LeadEventSchema.partial()
        })(args)
    }
}
