/**
 * @fileoverview Loops.so API client wrapper for managing contacts, events, and email communications
 * @module @playbookmedia/loops
 */

/**
 * Re-exports all functionality from the Loops client implementation
 * @see {@link ./loops.ts}
 *
 * Available functions:
 * - createContact: Create a new contact in Loops
 * - deleteContact: Delete an existing contact
 * - findContact: Find contacts by email or userId
 * - upgradedToPremium: Track premium upgrade events
 * - cancelledPremium: Track premium cancellation events
 * - sendTransactionalEmail: Send transactional emails
 * - onUserSignup: Handle new user signups
 * - startUserTrial: Start a user's trial period
 * - onPaymentFailed: Handle payment failure events
 * - onUsageMilestone: Track usage milestones
 * - subscribeToNewsletter: Subscribe users to newsletters
 * - unsubscribeFromNewsletter: Handle newsletter unsubscriptions
 */
export * from './loops'

/**
 * Re-exports all types, enums, and error classes
 * @see {@link ./types.ts}
 *
 * Available types:
 * - Contact: Contact record type
 * - MailingList: Mailing list type
 * - UserState: User state enum (TRIAL, ACTIVE, etc.)
 * - EmailTemplate: Email template enum
 * - LoopsError: Base error class
 * - ConfigurationError: Configuration error class
 *
 * @example
 * ```typescript
 * import {
 *   createContact,
 *   UserState,
 *   EmailTemplate,
 *   type Contact
 * } from '@playbookmedia/loops';
 *
 * // Create a new contact
 * const contact = await createContact('user@example.com', 'John', { lastName: 'Doe' });
 * ```
 */
export * from './types'
