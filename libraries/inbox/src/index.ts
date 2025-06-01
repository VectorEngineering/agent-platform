/**
 * @module @solomon-ai/inbox
 *
 * This module provides utilities and type definitions for handling Solomon AI's inbox functionality.
 * It includes schemas for webhook validation and utility functions for inbox email management.
 *
 * @example
 * ```typescript
 * import { inboxWebhookPostSchema, getInboxEmail } from '@solomon-ai/inbox';
 *
 * // Validate incoming webhook data
 * const webhookData = inboxWebhookPostSchema.parse(incomingData);
 *
 * // Generate an inbox email address
 * const inboxEmail = getInboxEmail('user123');
 * ```
 */

export * from './schema'
export * from './utils'
