import { getBillableLeadMetrics, getBillableLeads } from './billing'
import { Client, type Inserter, Noop, type Querier } from './client'
import { getLatestLead } from './latest_leads'
import {
    getActiveInteractionsPerDay,
    getActiveInteractionsPerHour,
    getActiveInteractionsPerMonth,
    insertInteraction
} from './lead_interactions'
import {
    getLatestSalesActivities,
    getSalesActivitiesPerDay,
    getSalesActivitiesPerHour,
    getSalesActivitiesPerMinute,
    getSalesActivitiesPerMonth,
    insertSalesCycleEvent
} from './lead_sales_cycles'
import { getLeadsPerDay, getLeadsPerHour, getLeadsPerMonth, insertLead } from './leads'
import { getActiveWorkspacesPerMonth } from './success'

/**
 * Configuration options for ClickHouse client initialization.
 * Supports either a single URL for both querying and inserting,
 * or separate URLs for each operation.
 */
export type ClickHouseConfig =
    | {
          /** Single URL for both query and insert operations */
          url?: string
          insertUrl?: never
          queryUrl?: never
      }
    | {
          url?: never
          /** URL for insert operations */
          insertUrl: string
          /** URL for query operations */
          queryUrl: string
      }

/**
 * Main ClickHouse client class that provides access to all lead-related operations.
 *
 * @remarks
 * This class serves as the main entry point for interacting with the ClickHouse database.
 * It provides methods for querying and inserting lead data, tracking interactions,
 * managing sales cycles, and handling billing operations.
 *
 * @example
 * ```typescript
 * // Initialize with a single URL
 * const ch = new ClickHouse({ url: 'http://localhost:8123' });
 *
 * // Or with separate URLs for querying and inserting
 * const ch = new ClickHouse({
 *   queryUrl: 'http://readonly:8123',
 *   insertUrl: 'http://writeonly:8123'
 * });
 *
 * // Query leads per day
 * const leads = await ch.leads.perDay({
 *   workspaceId: 'ws_123',
 *   startTime: new Date('2024-01-01'),
 *   endTime: new Date('2024-01-31')
 * });
 * ```
 */
export class ClickHouse {
    /** Client instance for executing queries */
    public readonly querier: Querier
    /** Client instance for inserting data */
    public readonly inserter: Inserter

    /**
     * Creates a new ClickHouse client instance.
     *
     * @param config - Configuration options for the client
     */
    constructor(config: ClickHouseConfig) {
        if (config.url) {
            const client = new Client({ url: config.url })
            this.querier = client
            this.inserter = client
        } else if (config.queryUrl && config.insertUrl) {
            this.querier = new Client({ url: config.queryUrl })
            this.inserter = new Client({ url: config.insertUrl })
        } else {
            this.querier = new Noop()
            this.inserter = new Noop()
        }
    }

    /**
     * Creates a ClickHouse client instance using environment variables.
     *
     * @returns A new ClickHouse client instance
     * @throws If CLICKHOUSE_URL environment variable is not set
     */
    static fromEnv(): ClickHouse {
        return new ClickHouse({ url: process.env.CLICKHOUSE_URL })
    }

    /**
     * Access methods for managing and querying leads.
     *
     * @remarks
     * Provides functionality for:
     * - Retrieving the latest lead
     * - Inserting new leads
     * - Getting lead counts per hour/day/month
     */
    public get leads() {
        return {
            latest: getLatestLead(this.querier),
            insert: insertLead(this.inserter),
            perHour: getLeadsPerHour(this.querier),
            perDay: getLeadsPerDay(this.querier),
            perMonth: getLeadsPerMonth(this.querier)
        }
    }

    /**
     * Access methods for tracking and querying lead interactions.
     *
     * @remarks
     * Provides functionality for:
     * - Inserting new interactions
     * - Getting interaction counts per hour/day/month
     */
    public get leadInteractions() {
        return {
            insert: insertInteraction(this.inserter),
            perHour: getActiveInteractionsPerHour(this.querier),
            perDay: getActiveInteractionsPerDay(this.querier),
            perMonth: getActiveInteractionsPerMonth(this.querier)
        }
    }

    /**
     * Access methods for managing and querying lead sales cycles.
     *
     * @remarks
     * Provides functionality for:
     * - Inserting sales cycle events
     * - Getting latest sales activities
     * - Getting activity counts per minute/hour/day/month
     */
    public get leadSalesCycle() {
        return {
            insert: insertSalesCycleEvent(this.inserter),
            latest: getLatestSalesActivities(this.querier),
            perMinute: getSalesActivitiesPerMinute(this.querier),
            perHour: getSalesActivitiesPerHour(this.querier),
            perDay: getSalesActivitiesPerDay(this.querier),
            perMonth: getSalesActivitiesPerMonth(this.querier)
        }
    }

    /**
     * Access methods for billing-related operations.
     *
     * @remarks
     * Provides functionality for:
     * - Getting billable lead metrics
     * - Counting billable leads
     */
    public get billing() {
        return {
            billableLeadMetrics: getBillableLeadMetrics(this.querier),
            billableLeads: getBillableLeads(this.querier)
        }
    }

    /**
     * Access methods for business metrics.
     *
     * @remarks
     * Provides functionality for:
     * - Getting active workspace counts per month
     */
    public get business() {
        return {
            activeWorkspaces: getActiveWorkspacesPerMonth(this.querier)
        }
    }
}
