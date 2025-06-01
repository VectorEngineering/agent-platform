import { type ClickHouseClient, createClient } from '@clickhouse/client-web'
import { Err, Ok, type Result } from '@playbookmedia/error'
import { z } from 'zod'
import { InsertError, QueryError } from './error'
import type { Inserter, Querier } from './interface'

/**
 * Configuration options for the ClickHouse client
 * @interface Config
 */
export type Config = {
    /** The URL of the ClickHouse server */
    url: string
}

/**
 * Client provides a type-safe interface for querying and inserting data into ClickHouse
 *
 * @example
 * ```typescript
 * // Initialize the client
 * const client = new Client({ url: 'http://localhost:8123' });
 *
 * // Define schemas for your data
 * const userSchema = z.object({
 *   id: z.string(),
 *   name: z.string(),
 *   age: z.number()
 * });
 *
 * // Create a typed query
 * const getUsers = client.query({
 *   query: 'SELECT * FROM users WHERE age > {minAge: Int32}',
 *   params: z.object({ minAge: z.number() }),
 *   schema: userSchema
 * });
 *
 * // Execute the query with type safety
 * const result = await getUsers({ minAge: 18 });
 * if (result.ok) {
 *   const users = result.value; // Typed as Array<{ id: string, name: string, age: number }>
 * }
 * ```
 */
export class Client implements Querier, Inserter {
    private readonly client: ClickHouseClient

    constructor(config: Config) {
        this.client = createClient({
            url: config.url,
            clickhouse_settings: {
                output_format_json_quote_64bit_integers: 0,
                output_format_json_quote_64bit_floats: 0
            }
        })
    }

    /**
     * Creates a type-safe query function for ClickHouse
     *
     * @template TIn - The Zod schema type for input parameters
     * @template TOut - The Zod schema type for the query result rows
     *
     * @param req - Query configuration object
     * @param req.query - SQL query string with optional parameter placeholders
     * @param req.params - Zod schema for validating input parameters
     * @param req.schema - Zod schema for validating and typing query results
     *
     * @returns A function that executes the query with type-safe parameters
     *
     * @example
     * ```typescript
     * // Define a query to find users by age range
     * const findUsersByAge = client.query({
     *   query: `
     *     SELECT * FROM users
     *     WHERE age >= {minAge: Int32} AND age <= {maxAge: Int32}
     *   `,
     *   params: z.object({
     *     minAge: z.number(),
     *     maxAge: z.number()
     *   }),
     *   schema: z.object({
     *     id: z.string(),
     *     name: z.string(),
     *     age: z.number()
     *   })
     * });
     *
     * // Execute the query
     * const result = await findUsersByAge({ minAge: 20, maxAge: 30 });
     * ```
     */
    public query<TIn extends z.ZodSchema<any>, TOut extends z.ZodSchema<any>>(req: {
        query: string
        params?: TIn
        schema: TOut
    }): (params: z.input<TIn>) => Promise<Result<z.output<TOut>[], QueryError>> {
        return async (params: z.input<TIn>): Promise<Result<z.output<TOut>[], QueryError>> => {
            const validParams = req.params?.safeParse(params)
            if (validParams?.error) {
                return Err(new QueryError(`Bad params: ${validParams.error.message}`, { query: '' }))
            }
            let unparsedRows: Array<TOut> = []
            try {
                const res = await this.client.query({
                    query: req.query,
                    query_params: validParams?.data,
                    format: 'JSONEachRow'
                })
                unparsedRows = await res.json()
            } catch (err) {
                const message = err instanceof Error ? err.message : JSON.stringify(err)
                return Err(new QueryError(`Unable to query clickhouse: ${message}`, { query: req.query }))
            }
            const parsed = z.array(req.schema).safeParse(unparsedRows)
            if (parsed.error) {
                return Err(new QueryError(`Malformed data: ${parsed.error.message}`, { query: req.query }))
            }
            return Ok(parsed.data)
        }
    }

    /**
     * Creates a type-safe insert function for a specific table
     *
     * @template TSchema - The Zod schema type for the data to insert
     *
     * @param req - Insert configuration object
     * @param req.table - The name of the table to insert into
     * @param req.schema - Zod schema for validating insert data
     *
     * @returns A function that inserts data with type safety
     *
     * @example
     * ```typescript
     * // Define an inserter for the users table
     * const insertUser = client.insert({
     *   table: 'users',
     *   schema: z.object({
     *     id: z.string(),
     *     name: z.string(),
     *     age: z.number()
     *   })
     * });
     *
     * // Insert a single user
     * await insertUser({
     *   id: '123',
     *   name: 'John Doe',
     *   age: 25
     * });
     *
     * // Insert multiple users
     * await insertUser([
     *   { id: '124', name: 'Jane Doe', age: 30 },
     *   { id: '125', name: 'Bob Smith', age: 35 }
     * ]);
     * ```
     */
    public insert<TSchema extends z.ZodSchema<any>>(req: {
        table: string
        schema: TSchema
    }): (events: z.input<TSchema> | z.input<TSchema>[]) => Promise<Result<{ executed: boolean; query_id: string }, InsertError>> {
        return async (events: z.input<TSchema> | z.input<TSchema>[]) => {
            let validatedEvents: z.output<TSchema> | z.output<TSchema>[] | undefined = undefined
            const v = Array.isArray(events) ? req.schema.array().safeParse(events) : req.schema.safeParse(events)
            if (!v.success) {
                return Err(new InsertError(v.error.message))
            }
            validatedEvents = v.data

            return this.retry(() =>
                this.client
                    .insert({
                        table: req.table,
                        format: 'JSONEachRow',
                        values: Array.isArray(validatedEvents) ? validatedEvents : [validatedEvents]
                    })
                    .then((res) => Ok(res))
                    .catch((err) => Err(new InsertError(err.message)))
            )
        }
    }

    /**
     * Retries a function up to 3 times before giving up
     *
     * @private
     * @param fn - The function to retry
     * @returns The result of the function if successful
     * @throws The last error encountered if all retries fail
     */
    private async retry<T>(fn: (attempt: number) => Promise<T>): Promise<T> {
        let err: Error | undefined = undefined
        for (let i = 1; i <= 3; i++) {
            try {
                return fn(i)
            } catch (e) {
                console.warn(e)
                err = e as Error
            }
        }
        throw err
    }
}
