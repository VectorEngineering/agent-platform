import { BaseError } from '@playbookmedia/error'

/**
 * Represents an error that occurs during data insertion operations.
 * This error is retryable by default.
 *
 * @example
 * ```typescript
 * // Creating a new InsertError
 * try {
 *   // ... insertion logic
 *   if (insertionFailed) {
 *     throw new InsertError('Failed to insert user data into database');
 *   }
 * } catch (error) {
 *   if (error instanceof InsertError) {
 *     console.log(error.message); // 'Failed to insert user data into database'
 *     console.log(error.retry);   // true
 *     // Handle retry logic if needed
 *   }
 * }
 * ```
 */
export class InsertError extends BaseError {
    public readonly retry = true
    public readonly name = InsertError.name

    /**
     * Creates a new InsertError instance.
     *
     * @param message - A descriptive message explaining the insertion error
     */
    constructor(message: string) {
        super({
            message
        })
    }
}

/**
 * Represents an error that occurs during query operations.
 * This error includes the problematic query in its context and is retryable by default.
 *
 * @example
 * ```typescript
 * // Creating a new QueryError
 * try {
 *   const query = 'SELECT * FROM invalid_table';
 *   // ... query execution logic
 *   throw new QueryError('Invalid table name in query', { query });
 * } catch (error) {
 *   if (error instanceof QueryError) {
 *     console.log(error.message);           // 'Invalid table name in query'
 *     console.log(error.context.query);     // 'SELECT * FROM invalid_table'
 *     console.log(error.retry);             // true
 *
 *     if (error.retry) {
 *       // Implement retry logic
 *     }
 *   }
 * }
 * ```
 */
export class QueryError extends BaseError<{ query: string }> {
    public readonly retry = true
    public readonly name = QueryError.name

    /**
     * Creates a new QueryError instance.
     *
     * @param message - A descriptive message explaining the query error
     * @param context - An object containing the query that caused the error
     * @param context.query - The SQL query string that resulted in the error
     */
    constructor(message: string, context: { query: string }) {
        super({
            message,
            context
        })
    }
}
