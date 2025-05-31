/**
 * Represents a key-value collection of fields that can be attached to log entries.
 * Each field can contain any type of value.
 *
 * @example
 * const fields: Fields = {
 *   userId: 123,
 *   action: "login",
 *   timestamp: new Date(),
 *   metadata: { browser: "Chrome", version: "91.0.4472.124" }
 * };
 *
 * @typedef {Object.<string, unknown>} Fields
 */
export type Fields = {
    [field: string]: unknown
}

/**
 * Interface defining a standard logging interface with different severity levels.
 * Each logging method accepts a message string and optional fields for additional context.
 *
 * Log levels follow this severity order:
 * debug < info < warn < error
 *
 * @interface Logger
 */
export interface Logger {
    /**
     * Logs a debug message. Used for detailed troubleshooting information.
     * Debug messages should be disabled in production environments.
     *
     * @param message - The debug message to log
     * @param fields - Optional key-value pairs providing additional context
     * @throws {Error} If message is empty or undefined
     *
     * @example
     * logger.debug("Processing user request", { userId: "123", requestId: "abc" });
     */
    debug(message: string, fields?: Fields): void

    /**
     * Logs an info message. Used for general operational messages.
     * Info messages track normal application flow and significant business events.
     *
     * @param message - The info message to log
     * @param fields - Optional key-value pairs providing additional context
     * @throws {Error} If message is empty or undefined
     *
     * @example
     * logger.info("User logged in successfully", { userId: "123" });
     */
    info(message: string, fields?: Fields): void

    /**
     * Logs a warning message. Used for potentially harmful situations.
     * Warnings indicate potential issues that don't prevent the application from working.
     *
     * @param message - The warning message to log
     * @param fields - Optional key-value pairs providing additional context
     * @throws {Error} If message is empty or undefined
     *
     * @example
     * logger.warn("Rate limit threshold reached", { currentRate: 95, threshold: 100 });
     */
    warn(message: string, fields?: Fields): void

    /**
     * Logs an error message. Used for error events that might still allow the application to continue running.
     * Errors indicate significant problems that need to be tracked and addressed.
     *
     * @param message - The error message to log
     * @param fields - Optional key-value pairs providing additional context
     * @throws {Error} If message is empty or undefined
     *
     * @example
     * logger.error("Failed to process payment", { orderId: "xyz", errorCode: "PAY_001" });
     *
     * // With error object
     * try {
     *   throw new Error('Database connection failed');
     * } catch (err) {
     *   logger.error("Database error", { error: err });
     * }
     */
    error(message: string, fields?: Fields): void
}
