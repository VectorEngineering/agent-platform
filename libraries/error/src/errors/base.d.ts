/**
 * Represents a generic context object for errors, allowing any string keys with unknown values.
 * This type is used to provide additional contextual information when errors occur.
 *
 * @example
 * ```typescript
 * const context: ErrorContext = {
 *   userId: '123',
 *   timestamp: Date.now(),
 *   requestId: 'req-456'
 * };
 * ```
 */
export type ErrorContext = Record<string, unknown>
/**
 * Abstract base class for custom error handling with support for error chaining,
 * contextual information, and retry behavior.
 *
 * @template TContext - The type of the context object, extends ErrorContext
 *
 * @example
 * ```typescript
 * class CustomError extends BaseError<{ userId: string }> {
 *   public readonly name = 'CustomError';
 *   public readonly retry = false;
 *
 *   constructor(message: string) {
 *     super({ message, context: { userId: 'user123' } });
 *   }
 * }
 * ```
 */
export declare abstract class BaseError<TContext extends ErrorContext = ErrorContext> extends Error {
    /**
     * Indicates whether the operation that caused this error can be retried.
     * Implementing classes should set this based on the nature of the error.
     */
    abstract readonly retry: boolean
    /**
     * The error that caused this error, enabling error chaining.
     * Useful for tracking error propagation through the application.
     */
    readonly cause: BaseError | undefined
    /**
     * Additional contextual information about the error.
     * Can include any relevant data that helps debug or handle the error.
     */
    readonly context: TContext | undefined
    /**
     * The error message describing what went wrong.
     */
    readonly message: string
    /**
     * The name of the error class. Must be implemented by extending classes.
     * Used for error identification and logging purposes.
     */
    abstract readonly name: string
    /**
     * Creates a new instance of BaseError.
     *
     * @param opts - The options for creating the error
     * @param opts.message - A descriptive message about what went wrong
     * @param opts.cause - The underlying error that caused this error (optional)
     * @param opts.context - Additional contextual information about the error (optional)
     */
    constructor(opts: { message: string; cause?: BaseError; context?: TContext })
    /**
     * Returns a string representation of the error, including the error name,
     * message, context, and cause (if any).
     *
     * @returns A formatted string containing all error information
     *
     * @example
     * ```typescript
     * const error = new CustomError("Something went wrong");
     * console.log(error.toString());
     * // Output: CustomError: Something went wrong - {"userId":"user123"} - caused by undefined
     * ```
     */
    toString(): string
}
//# sourceMappingURL=base.d.ts.map
