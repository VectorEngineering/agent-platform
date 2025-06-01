import type { InsertError, QueryError } from './error'

import type { Result } from '@playbookmedia/error'
import type { z } from 'zod'

/**
 * Interface for executing type-safe queries against a database
 *
 * @interface Querier
 *
 * @example
 * ```typescript
 * class MyQuerier implements Querier {
 *   query<TIn extends z.ZodSchema, TOut extends z.ZodSchema>({
 *     query: 'SELECT * FROM users WHERE age > {minAge: Int32}',
 *     params: z.object({ minAge: z.number() }),
 *     schema: z.object({ id: z.string(), name: z.string(), age: z.number() })
 *   }) {
 *     // Implementation
 *   }
 * }
 * ```
 */
export interface Querier {
    /**
     * Creates a type-safe query function with parameter validation and result typing
     *
     * @template TIn - Zod schema type for input parameters
     * @template TOut - Zod schema type for query results
     *
     * @param req - Query configuration object
     * @param req.query - SQL query with parameter placeholders in format {paramName: Type}
     * @param req.params - Optional Zod schema for validating query parameters
     * @param req.schema - Zod schema defining the shape of each result row
     *
     * @returns A function that executes the query with validated parameters
     *
     * @example
     * ```typescript
     * const getUsersByAge = querier.query({
     *   query: 'SELECT * FROM users WHERE age > {minAge: Int32}',
     *   params: z.object({ minAge: z.number() }),
     *   schema: z.object({
     *     id: z.string(),
     *     name: z.string(),
     *     age: z.number()
     *   })
     * });
     *
     * const result = await getUsersByAge({ minAge: 18 });
     * ```
     */
    query<TIn extends z.ZodSchema<any>, TOut extends z.ZodSchema<any>>(req: {
        query: string
        params?: TIn
        schema: TOut
    }): (params: z.input<TIn>) => Promise<Result<z.output<TOut>[], QueryError>>
}

/**
 * Interface for inserting type-safe data into a database
 *
 * @interface Inserter
 *
 * @example
 * ```typescript
 * class MyInserter implements Inserter {
 *   insert<TSchema extends z.ZodSchema>({
 *     table: 'users',
 *     schema: z.object({
 *       id: z.string(),
 *       name: z.string()
 *     })
 *   }) {
 *     // Implementation
 *   }
 * }
 * ```
 */
export interface Inserter {
    /**
     * Creates a type-safe insert function for a specific table
     *
     * @template TSchema - Zod schema type for the data to insert
     *
     * @param req - Insert configuration object
     * @param req.table - Name of the target table
     * @param req.schema - Zod schema for validating insert data
     *
     * @returns A function that inserts validated data into the table
     *
     * @example
     * ```typescript
     * const insertUser = inserter.insert({
     *   table: 'users',
     *   schema: z.object({
     *     id: z.string(),
     *     name: z.string(),
     *     age: z.number()
     *   })
     * });
     *
     * // Insert single record
     * await insertUser({ id: '1', name: 'John', age: 30 });
     *
     * // Insert multiple records
     * await insertUser([
     *   { id: '2', name: 'Jane', age: 25 },
     *   { id: '3', name: 'Bob', age: 35 }
     * ]);
     * ```
     */
    insert<TSchema extends z.ZodSchema<any>>(req: {
        table: string
        schema: TSchema
    }): (events: z.input<TSchema> | z.input<TSchema>[]) => Promise<Result<{ executed: boolean; query_id: string }, InsertError>>
}
