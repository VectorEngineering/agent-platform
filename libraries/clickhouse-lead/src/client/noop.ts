import { Err, Ok, type Result } from '@playbookmedia/error'
import type { z } from 'zod'
import { InsertError, type QueryError } from './error'
import type { Inserter, Querier } from './interface'

/**
 * No-operation implementation of Querier and Inserter interfaces
 * Useful for testing or when database operations need to be disabled
 *
 * @implements {Querier}
 * @implements {Inserter}
 *
 * @example
 * ```typescript
 * // Use in testing environments
 * const noop = new Noop();
 *
 * // Query will return empty array
 * const getUsers = noop.query({
 *   query: 'SELECT * FROM users',
 *   schema: z.object({ id: z.string() })
 * });
 * const result = await getUsers({}); // Returns Ok([])
 *
 * // Insert will validate but not persist data
 * const insertUser = noop.insert({
 *   table: 'users',
 *   schema: z.object({ id: z.string() })
 * });
 * const insertResult = await insertUser({ id: '123' }); // Returns Ok({ executed: true, query_id: 'noop' })
 * ```
 */
export class Noop implements Querier, Inserter {
    /**
     * Creates a no-op query function that validates parameters but returns empty results
     *
     * @template TIn - Zod schema type for input parameters
     * @template TOut - Zod schema type for query results
     *
     * @param req - Query configuration object
     * @param req.query - SQL query (not executed)
     * @param req.params - Optional parameter validation schema
     * @param req.schema - Result schema (used only for typing)
     *
     * @returns A function that validates parameters and returns an empty array
     */
    public query<TIn extends z.ZodSchema<any>, TOut extends z.ZodSchema<any>>(req: {
        query: string
        params?: TIn
        schema: TOut
    }): (params: z.input<TIn>) => Promise<Result<z.output<TOut>[], QueryError>> {
        return async (params: z.input<TIn>): Promise<Result<z.output<TOut>[], QueryError>> => {
            req.params?.safeParse(params)
            return Ok([])
        }
    }

    /**
     * Creates a no-op insert function that validates data but doesn't persist it
     *
     * @template TSchema - Zod schema type for the data to insert
     *
     * @param req - Insert configuration object
     * @param req.table - Target table name (not used)
     * @param req.schema - Schema for validating insert data
     *
     * @returns A function that validates data and returns success without persisting
     */
    public insert<TSchema extends z.ZodSchema<any>>(req: {
        table: string
        schema: TSchema
    }): (events: z.input<TSchema> | z.input<TSchema>[]) => Promise<Result<{ executed: boolean; query_id: string }, InsertError>> {
        return async (events: z.input<TSchema> | z.input<TSchema>[]) => {
            const v = Array.isArray(events) ? req.schema.array().safeParse(events) : req.schema.safeParse(events)
            if (!v.success) {
                return Err(new InsertError(v.error.message))
            }

            return Ok({ executed: true, query_id: 'noop' })
        }
    }
}
