/**
 * @fileoverview Utilities for mapping raw CSV data to transaction objects
 */

import type { Transaction } from './types'

/**
 * Maps raw data rows to Transaction objects using provided field mappings
 *
 * @param data - Array of raw data rows from CSV or similar source
 * @param mappings - Object mapping transaction fields to source column names
 * @param currency - Three-letter currency code for all transactions
 * @param workspaceId - Workspace identifier for all transactions
 * @param bankAccountId - Bank account identifier for all transactions
 * @returns Array of mapped Transaction objects
 *
 * @remarks
 * This function takes raw data (typically from a CSV import) and maps it to Transaction objects
 * using the provided field mappings. It also adds common fields (currency, workspace, bank account)
 * that apply to all transactions in the import.
 *
 * @example
 * ```ts
 * const data = [
 *   { "Date": "2024-01-21", "Description": "Coffee", "Amount": "-4.50" }
 * ];
 *
 * const mappings = {
 *   date: "Date",
 *   description: "Description",
 *   amount: "Amount"
 * };
 *
 * const transactions = mapTransactions(
 *   data,
 *   mappings,
 *   "USD",
 *   "workspace_123",
 *   "bank_456"
 * );
 * ```
 */
export const mapTransactions = (
    data: Record<string, string>[],
    mappings: Record<string, string>,
    currency: string,
    workspaceId: string,
    bankAccountId: string
): Transaction[] => {
    return data.map((row) => ({
        ...(Object.fromEntries(
            Object.entries(mappings)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => [key, row[value]])
        ) as Transaction),
        currency,
        workspaceId,
        bankAccountId
    }))
}
