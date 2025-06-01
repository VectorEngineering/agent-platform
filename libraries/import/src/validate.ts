/**
 * @fileoverview Validation utilities for transaction imports using Zod schemas
 */

import type { Transaction } from './types'
import { z } from 'zod'

/**
 * Zod schema for validating transaction data during import
 * @remarks
 * This schema enforces the following rules:
 * - All required fields must be present
 * - Dates are coerced from string/number inputs
 * - Status and method fields must match predefined values
 * - Category slug can be null
 */
export const createTransactionSchema = z.object({
    /** Descriptive name of the transaction */
    name: z.string(),
    /** Three-letter currency code (e.g., USD, EUR) */
    currency: z.string(),
    /** Unique identifier for the associated bank account */
    bankAccountId: z.string(),
    /** Workspace identifier where this transaction belongs */
    workspaceId: z.string(),
    /** Internal reference ID for the transaction */
    internalId: z.string(),
    /** Transaction status: either posted (completed) or pending */
    status: z.enum(['posted', 'pending']),
    /** Payment method used for the transaction */
    method: z.enum(['card', 'bank', 'other']),
    /** Date when the transaction occurred */
    date: z.coerce.date(),
    /** Transaction amount (positive for credits, negative for debits) */
    amount: z.number(),
    /** Whether the transaction was manually entered */
    manual: z.boolean(),
    /** Optional category slug for transaction classification */
    categorySlug: z.string().nullable()
})

/**
 * Validates an array of transactions against the schema
 * @param transactions - Array of raw transaction objects to validate
 * @returns Object containing arrays of valid transactions and validation errors
 *
 * @example
 * ```ts
 * const result = validateTransactions([
 *   { name: "Coffee", amount: -4.50, ... },
 *   { name: "Salary", amount: 5000, ... }
 * ]);
 *
 * logger.info(result.validTransactions.length); // Successfully validated transactions
 * logger.info(result.invalidTransactions); // Array of Zod validation errors
 * ```
 */
export const validateTransactions = (transactions: Transaction[]) => {
    const processedTransactions = transactions.map((transaction) => createTransactionSchema.safeParse(transaction))

    const validTransactions = processedTransactions.filter((transaction) => transaction.success)

    const invalidTransactions = processedTransactions.filter((transaction) => !transaction.success)

    return {
        validTransactions: validTransactions.map((transaction) => transaction.data),
        invalidTransactions: invalidTransactions.map((transaction) => transaction.error)
    }
}
