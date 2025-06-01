/**
 * @fileoverview Transformation utilities for converting raw transaction data into validated format
 */

import { formatAmountValue, formatDate } from './utils'

import { capitalCase } from 'change-case'
import { v4 as uuidv4 } from 'uuid'
import type { Transaction } from './types'

/**
 * Transforms a raw transaction into the validated internal format
 *
 * @param options - Transform options
 * @param options.transaction - Raw transaction data to transform
 * @param options.inverted - Whether to invert the transaction amount (useful for different accounting perspectives)
 *
 * @returns Transformed transaction object ready for validation
 *
 * @remarks
 * This function performs several transformations:
 * - Generates a unique internal ID using UUID
 * - Formats dates into standard format
 * - Normalizes amounts and handles inversion if needed
 * - Capitalizes transaction names
 * - Sets default values for required fields
 * - Automatically categorizes income transactions
 *
 * @example
 * ```ts
 * const rawTransaction = {
 *   date: "2024-01-21",
 *   description: "coffee purchase",
 *   amount: "-4.50",
 *   // ...other fields
 * };
 *
 * const transformed = transform({
 *   transaction: rawTransaction,
 *   inverted: false
 * });
 * ```
 */
export function transform({ transaction, inverted }: { transaction: Transaction; inverted: boolean }) {
    return {
        internal_id: `${transaction.workspaceId}_${uuidv4()}`,
        workspace_id: transaction.workspaceId,
        status: 'posted',
        method: 'other',
        date: formatDate(transaction.date),
        amount: formatAmountValue({ amount: transaction.amount, inverted }),
        name: transaction?.description && capitalCase(transaction.description),
        manual: true,
        category_slug: formatAmountValue({ amount: transaction.amount, inverted }) > 0 ? 'income' : null,
        bank_account_id: transaction.bankAccountId,
        currency: transaction.currency.toUpperCase(),
        notified: true
    }
}
