import type { ZodError } from 'zod'
import { BaseError } from './base'

/**
 * Error class for schema validation failures.
 * Used when data doesn't conform to its expected structure or type definition.
 *
 * @extends BaseError<{ raw: unknown }>
 *
 * @example
 * ```typescript
 * // Direct instantiation
 * throw new SchemaError({
 *   message: "Invalid user data",
 *   context: {
 *     raw: invalidUserData
 *   }
 * });
 *
 * // Using with Zod
 * try {
 *   userSchema.parse(data);
 * } catch (error) {
 *   if (error instanceof ZodError) {
 *     throw SchemaError.fromZod(error, data, {
 *       userId: data.id,
 *       operation: 'createUser'
 *     });
 *   }
 * }
 * ```
 *
 * @remarks
 * This error is non-retryable as schema validation failures are deterministic -
 * the same input will always fail validation in the same way.
 */
export class SchemaError extends BaseError<{
    /**
     * The raw data that failed schema validation.
     * Stored to help with debugging and error reporting.
     */
    raw: unknown
}> {
    /**
     * Always false as schema validation errors are deterministic
     * and won't be resolved by retrying.
     */
    public readonly retry = false

    /**
     * The name of the error class, used for error identification.
     * Uses the class name directly to ensure consistency.
     */
    public readonly name = SchemaError.name

    /**
     * Creates a new SchemaError instance.
     *
     * @param opts - The options for creating the error
     * @param opts.message - A descriptive message about what validation failed
     * @param opts.context - Contains the raw data that failed validation
     * @param opts.cause - The underlying error that caused this error (optional)
     */
    constructor(opts: { message: string; context?: { raw: unknown }; cause?: BaseError }) {
        super({
            ...opts
        })
    }

    /**
     * Creates a SchemaError from a Zod validation error.
     * Provides a convenient way to convert Zod errors into SchemaErrors.
     *
     * @param e - The Zod error that occurred during validation
     * @param raw - The raw data that failed validation
     * @param context - Additional context to include in the error (optional)
     * @returns A new SchemaError instance
     *
     * @example
     * ```typescript
     * const userSchema = z.object({
     *   name: z.string(),
     *   age: z.number()
     * });
     *
     * try {
     *   userSchema.parse(invalidData);
     * } catch (error) {
     *   if (error instanceof ZodError) {
     *     throw SchemaError.fromZod(error, invalidData, {
     *       validatedAt: new Date(),
     *       schemaVersion: '1.0'
     *     });
     *   }
     * }
     * ```
     */
    static fromZod<T>(e: ZodError<T>, raw: unknown, context?: Record<string, unknown>): SchemaError {
        return new SchemaError({
            message: e.message,
            context: {
                raw: JSON.stringify(raw),
                ...context
            }
        })
    }
}
