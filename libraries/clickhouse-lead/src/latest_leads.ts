import { z } from 'zod'
import type { Querier } from './client'

/**
 * Schema for the input parameters of the getLatestLead query.
 *
 * @property workspaceId - The unique identifier of the workspace
 * @property leadId - Optional lead identifier to filter results
 */
const params = z.object({
    workspaceId: z.string(),
    // Optional filters
    leadId: z.string().optional()
})

/**
 * Creates a function to retrieve the most recent lead information from the database.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that accepts workspace and optional lead ID parameters
 *
 * @remarks
 * This function queries the latest lead event with the following characteristics:
 * - Filters out test/demo leads based on company name
 * - Ensures data quality by checking for non-empty email and company
 * - Only returns active leads (current_status = 'ACTIVE')
 * - Orders results by timestamp in descending order
 * - Limits to 1 result (the most recent)
 *
 * The returned lead information includes:
 * - Timestamp (as Unix milliseconds)
 * - Lead ID
 * - Company name
 * - Current stage and status
 * - Final score
 * - Deal size and probability
 * - Tags and industry
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getLatest = getLatestLead(ch);
 *
 * // Get latest lead for a workspace
 * const result = await getLatest({
 *   workspaceId: 'ws_123'
 * });
 *
 * // Get latest lead for a specific lead ID
 * const result = await getLatest({
 *   workspaceId: 'ws_123',
 *   leadId: 'lead_456'
 * });
 * ```
 *
 * @returns A promise that resolves to an object containing the lead information,
 * or an error if the query fails. The result is validated against a Zod schema
 * that ensures type safety for all returned fields.
 */
export function getLatestLead(ch: Querier) {
    return async (args: z.input<typeof params>) => {
        const query = `
      SELECT
        toUnixTimestamp64Milli(toDateTime64(toString(time), 3)) AS time,
        lead_id,
        company,
        current_stage,
        current_status,
        final_score,
        deal_size,
        probability,
        tags,
        industry
      FROM leads.raw_lead_events_v1
      WHERE
        workspace_id = {workspaceId: String}
        AND lead_id = {leadId: String}
        -- Filter out test/demo leads and ensure data quality
        AND NOT (company ILIKE '%test%' OR company ILIKE '%demo%')
        AND email != ''
        AND company != ''
        -- Only get active leads
        AND current_status = 'ACTIVE'
      ORDER BY time DESC
      LIMIT 1
    ;`

        /**
         * Schema for validating the query results.
         * Ensures type safety for all returned fields.
         */
        const schema = z.object({
            /** Unix timestamp in milliseconds */
            time: z.number(),
            /** Unique identifier for the lead */
            lead_id: z.string(),
            /** Company name */
            company: z.string(),
            /** Current stage in the sales pipeline */
            current_stage: z.string(),
            /** Current status of the lead */
            current_status: z.string(),
            /** Calculated final score for the lead */
            final_score: z.number().int(),
            /** Estimated deal size */
            deal_size: z.number(),
            /** Probability of closing the deal */
            probability: z.number(),
            /** Array of tags associated with the lead */
            tags: z.array(z.string()),
            /** Industry classification */
            industry: z.string()
        })

        return ch.query({
            query,
            params: z.object({
                workspaceId: z.string(),
                leadId: z.string().optional()
            }),
            schema
        })(args)
    }
}
