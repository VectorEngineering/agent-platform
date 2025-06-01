import { z } from 'zod'
import type { Querier } from './client'
import { dateTimeToUnix } from './util'

/**
 * Creates a function to get the count of active workspaces aggregated by month.
 *
 * @param ch - The ClickHouse querier instance
 * @returns An async function that returns monthly active workspace metrics
 *
 * @remarks
 * This function queries the business metrics table to track workspace activity over time.
 * It provides insights into:
 * - Total number of unique active workspaces per month
 * - Historical trends in workspace activity
 *
 * The results are:
 * - Grouped by month
 * - Ordered chronologically
 * - Include all months, even those with zero active workspaces
 *
 * Note: The month in the underlying data is not zero-indexed (January = 1, December = 12)
 *
 * @example
 * ```typescript
 * const ch = new Client({ url: 'http://localhost:8123' });
 * const getActiveWorkspaces = getActiveWorkspacesPerMonth(ch);
 *
 * const metrics = await getActiveWorkspaces();
 *
 * // Example response:
 * // [
 * //   { time: 1704067200000, workspaces: 125 }, // January 2024
 * //   { time: 1706745600000, workspaces: 142 }, // February 2024
 * //   { time: 1709251200000, workspaces: 156 }  // March 2024
 * // ]
 * ```
 *
 * @returns A promise that resolves to an array of monthly metrics, each containing:
 * - time: Unix timestamp in milliseconds representing the start of the month
 * - workspaces: Number of unique active workspaces in that month
 */
export function getActiveWorkspacesPerMonth(ch: Querier) {
    return async () => {
        const query = ch.query({
            query: `
    SELECT 
      count(DISTINCT workspace_id) as workspaces,      
      time
    FROM business.active_workspaces_per_month_v1
    GROUP BY time
    ORDER BY time ASC
    ;`,
            schema: z.object({
                /** Unix timestamp in milliseconds for the start of the month */
                time: dateTimeToUnix,
                /** Count of unique active workspaces */
                workspaces: z.number().int()
            })
        })

        return await query({})
    }
}
