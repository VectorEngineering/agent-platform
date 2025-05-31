import { BaseError } from './base'

/**
 * Error class for environment variable configuration issues.
 * Used when environment variables are missing, malformed, or have invalid values.
 *
 * @extends BaseError<{ name: string }>
 *
 * @example
 * ```typescript
 * // When an environment variable is missing
 * throw new EnvError({
 *   message: "Required environment variable not found",
 *   context: { name: "API_KEY" }
 * });
 *
 * // When an environment variable has an invalid value
 * throw new EnvError({
 *   message: "Environment variable must be a number",
 *   context: { name: "MAX_RETRIES" }
 * });
 * ```
 *
 * @remarks
 * This error is non-retryable as environment configuration issues
 * typically require manual intervention to resolve.
 */
export class EnvError extends BaseError<{
    /**
     * The name of the environment variable that caused the error
     */
    name: string
}> {
    /**
     * Always false as environment configuration errors cannot be resolved
     * through retries - they require configuration changes.
     */
    public readonly retry = false

    /**
     * The name of the error class, used for error identification.
     * Uses the class name directly to ensure consistency.
     */
    public readonly name = EnvError.name
}
