/**
 * @fileoverview Type definitions for transaction import functionality
 */

/**
 * Represents a raw transaction record before validation and processing
 * @interface Transaction
 *
 * @remarks
 * This interface represents the raw transaction data as it comes from various import sources
 * (CSV files, bank feeds, etc.) before being validated and transformed into the internal format.
 */
export type Transaction = {
    /** ISO date string representing when the transaction occurred */
    date: string
    /** Raw transaction description or memo from the source */
    description: string
    /** String representation of the transaction amount (will be parsed to number) */
    amount: string
    /** Identifier for the workspace this transaction belongs to */
    workspaceId: string
    /** Identifier for the associated bank account */
    bankAccountId: string
    /** Three-letter currency code (e.g., USD, EUR) */
    currency: string
}
