/**
 * Extracts the inbox ID from an email address by taking the part before the @ symbol
 *
 * @param email - The full email address
 * @returns The inbox ID portion of the email address
 *
 * @example
 * ```typescript
 * const inboxId = getInboxIdFromEmail('user123@inbox.solomon-ai.app');
 * console.log(inboxId); // 'user123'
 * ```
 */
export function getInboxIdFromEmail(email: string) {
    if (!email.includes('@')) return null
    return email.split('@')[0]
}

/**
 * Generates a full inbox email address from an inbox ID
 * Automatically uses the staging domain in non-production environments
 *
 * @param inboxId - The unique identifier for the inbox
 * @returns The complete email address for the inbox
 *
 * @example
 * ```typescript
 * // In production:
 * const prodEmail = getInboxEmail('user123');
 * console.log(prodEmail); // 'user123@inbox.solomon-ai.app'
 *
 * // In non-production:
 * const stagingEmail = getInboxEmail('user123');
 * console.log(stagingEmail); // 'user123@inbox.staging.solomon-ai.app'
 * ```
 */
export function getInboxEmail(inboxId: string) {
    if (process.env.NODE_ENV !== 'production') {
        return `${inboxId}@inbox.staging.solomon-ai.app`
    }

    return `${inboxId}@inbox.solomon-ai.app`
}
