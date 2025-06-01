import { z } from 'zod'
import type { Querier } from './client'

/**
 * Creates a function to get the count of billable leads for a workspace in a specific month.
 *
 * @param ch - The Querier instance used to execute the database query
 * @returns An async function that accepts workspace, year and month parameters
 *
 * @remarks
 * This function counts unique leads that had events in the specified period.
 * It excludes:
 * - Archived, deleted, or duplicate leads
 * - Test/demo leads (based on company name)
 * - Leads with empty email or company fields
 *
 * The month parameter is not zero-indexed (January = 1, December = 12)
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getBillable = getBillableLeads(ch);
 *
 * // Get billable leads for March 2024
 * const count = await getBillable({
 *   workspaceId: 'ws_123',
 *   year: 2024,
 *   month: 3
 * });
 * ```
 */
export function getBillableLeads(ch: Querier) {
    return async (args: {
        /** The unique identifier of the workspace */
        workspaceId: string
        /** The year to query leads for */
        year: number
        /** The month to query leads for (1-12) */
        month: number
    }): Promise<number> => {
        const query = ch.query({
            query: `
        SELECT
          count(DISTINCT lead_id) as count
        FROM leads.raw_lead_events_v1
        WHERE tenant_id = {workspaceId: String}
          AND toYear(time) = {year: Int64}
          AND toMonth(time) = {month: Int64}
          -- Only count leads that are actively being worked
          AND current_status NOT IN ('archived', 'deleted', 'duplicate')
          -- Ensure we're not counting test/demo leads
          AND NOT (company ILIKE '%test%' OR company ILIKE '%demo%')
          -- Basic data quality check
          AND email != ''
          AND company != ''
        GROUP BY tenant_id, toYear(time), toMonth(time)
      `,
            params: z.object({
                workspaceId: z.string(),
                year: z.number().int(),
                month: z.number().int().min(1).max(12)
            }),
            schema: z.object({
                count: z.number().int()
            })
        })

        const res = await query(args)
        if (res.err || res.val.length === 0) {
            return 0
        }
        return res.val.at(0)?.count ?? 0
    }
}

/**
 * Creates a function to get detailed billing metrics for leads in a workspace for a specific month.
 *
 * @param ch - The Querier instance used to execute the database query
 * @returns An async function that accepts workspace, year and month parameters and returns detailed metrics
 *
 * @remarks
 * This function provides detailed metrics including:
 * - Total number of unique leads
 * - Number of qualified leads (score >= 70)
 * - Number of leads with opportunities
 * - Average lead score
 * - Total opportunity value
 * - Number of converted leads (closed won or customer)
 *
 * The month parameter is not zero-indexed (January = 1, December = 12)
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getMetrics = getBillableLeadMetrics(ch);
 *
 * // Get metrics for March 2024
 * const metrics = await getMetrics({
 *   workspaceId: 'ws_123',
 *   year: 2024,
 *   month: 3
 * });
 *
 * console.log(metrics.qualified_leads); // Number of qualified leads
 * console.log(metrics.total_opportunity_value); // Total value of opportunities
 * ```
 *
 * @returns An object containing the following metrics:
 * - total_leads: Total number of unique leads
 * - qualified_leads: Number of leads with score >= 70
 * - leads_with_opportunity: Number of leads with deal size > 0
 * - avg_lead_score: Average score across all leads
 * - total_opportunity_value: Sum of all deal sizes
 * - converted_leads: Number of leads marked as closed won or customer
 */
export function getBillableLeadMetrics(ch: Querier) {
    return async (args: {
        /** The unique identifier of the workspace */
        workspaceId: string
        /** The year to query metrics for */
        year: number
        /** The month to query metrics for (1-12) */
        month: number
    }) => {
        const query = ch.query({
            query: `
        SELECT
          count(DISTINCT lead_id) as total_leads,
          count(DISTINCT CASE WHEN final_score >= 70 THEN lead_id END) as qualified_leads,
          count(DISTINCT CASE WHEN deal_size > 0 THEN lead_id END) as leads_with_opportunity,
          avg(final_score) as avg_lead_score,
          sum(deal_size) as total_opportunity_value,
          count(DISTINCT CASE 
            WHEN current_stage IN ('closed_won', 'customer') 
            THEN lead_id 
          END) as converted_leads
        FROM leads.raw_lead_events_v1
        WHERE tenant_id = {workspaceId: String}
          AND toYear(time) = {year: Int64}
          AND toMonth(time) = {month: Int64}
          AND current_status NOT IN ('archived', 'deleted', 'duplicate')
        GROUP BY tenant_id, toYear(time), toMonth(time)
      `,
            params: z.object({
                workspaceId: z.string(),
                year: z.number().int(),
                month: z.number().int().min(1).max(12)
            }),
            schema: z.object({
                total_leads: z.number().int(),
                qualified_leads: z.number().int(),
                leads_with_opportunity: z.number().int(),
                avg_lead_score: z.number(),
                total_opportunity_value: z.number(),
                converted_leads: z.number().int()
            })
        })

        const res = await query(args)
        if (res.err || res.val.length === 0) {
            return {
                total_leads: 0,
                qualified_leads: 0,
                leads_with_opportunity: 0,
                avg_lead_score: 0,
                total_opportunity_value: 0,
                converted_leads: 0
            }
        }
        return res.val[0]
    }
}
