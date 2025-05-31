import type { BaseError } from './errors/base'
/**
 * Represents a successful result containing a value.
 *
 * @template V - The type of the successful value
 */
type OkResult<V> = {
    val: V
    err?: never
}
/**
 * Represents a failed result containing an error.
 *
 * @template E - The type of the error, must extend BaseError
 */
type ErrResult<E extends BaseError> = {
    val?: never
    err: E
}
/**
 * A discriminated union type representing either a successful result with a value
 * or a failed result with an error.
 *
 * @template V - The type of the successful value
 * @template E - The type of the error, must extend BaseError
 *
 * @example
 * ```typescript
 * type UserResult = Result<User, FetchError>;
 *
 * async function getUser(id: string): Promise<UserResult> {
 *   try {
 *     const user = await fetchUser(id);
 *     return Ok(user);
 *   } catch (error) {
 *     return Err(new FetchError({
 *       message: "Failed to fetch user",
 *       retry: true,
 *       context: { id, error }
 *     }));
 *   }
 * }
 * ```
 */
export type Result<V, E extends BaseError = BaseError> = OkResult<V> | ErrResult<E>
/**
 * Creates a successful result with no value.
 *
 * @returns An OkResult with type never
 */
export declare function Ok(): OkResult<never>
/**
 * Creates a successful result containing the provided value.
 *
 * @template V - The type of the value
 * @param val - The value to wrap in a successful result
 * @returns An OkResult containing the value
 *
 * @example
 * ```typescript
 * const result = Ok({ id: 1, name: "John" });
 * if (result.val) {
 *   console.log(result.val.name); // Type-safe access
 * }
 * ```
 */
export declare function Ok<V>(val: V): OkResult<V>
/**
 * Creates a failed result containing the provided error.
 *
 * @template E - The type of the error, must extend BaseError
 * @param err - The error to wrap in a failed result
 * @returns An ErrResult containing the error
 *
 * @example
 * ```typescript
 * const result = Err(new FetchError({
 *   message: "API request failed",
 *   retry: true,
 *   context: { statusCode: 500 }
 * }));
 *
 * if (result.err) {
 *   console.error(result.err.message);
 *   if (result.err.retry) {
 *     // Handle retryable error
 *   }
 * }
 * ```
 */
export declare function Err<E extends BaseError>(err: E): ErrResult<E>
/**
 * Wraps a promise and catches any thrown errors, converting them into a Result type.
 * This utility helps maintain type-safe error handling throughout the application.
 *
 * @template T - The type of the successful value
 * @template E - The type of the error, must extend BaseError
 * @param p - The promise to wrap
 * @param errorFactory - A function that converts a caught Error into the appropriate BaseError type
 * @returns A Promise that resolves to a Result containing either the value or error
 *
 * @example
 * ```typescript
 * const result = await wrap(
 *   fetch("https://api.example.com/data"),
 *   (error) => new FetchError({
 *     message: "API request failed",
 *     retry: true,
 *     context: { error }
 *   })
 * );
 *
 * if (result.err) {
 *   // Handle error case
 *   console.error(result.err.message);
 *   return;
 * }
 *
 * // Type-safe access to the value
 * console.log(result.val);
 * ```
 */
export declare function wrap<T, E extends BaseError>(p: Promise<T>, errorFactory: (err: Error) => E): Promise<Result<T, E>>
export {}
//# sourceMappingURL=error-handling.d.ts.map
