import { LoopsClient } from 'loops'
import { z } from 'zod' // For runtime type validation
import {
    ConfigurationError,
    Contact,
    EmailSchema,
    EmailTemplate,
    LoopsError,
    MailingList,
    TierSchema,
    UserIdSchema,
    UserState
} from './types'

/**
 * Singleton wrapper for the Loops API client.
 * Ensures only one instance of the client exists throughout the application lifecycle.
 */
class LoopsClientWrapper {
    private static instance: LoopsClientWrapper
    private client?: LoopsClient

    private constructor() {
        this.initializeClient()
    }

    /**
     * Returns the singleton instance of the LoopsClientWrapper.
     * Creates a new instance if one doesn't exist.
     * @returns {LoopsClientWrapper} The singleton instance
     */
    static getInstance(): LoopsClientWrapper {
        if (!LoopsClientWrapper.instance) {
            LoopsClientWrapper.instance = new LoopsClientWrapper()
        }
        return LoopsClientWrapper.instance
    }

    /**
     * Initializes the Loops API client using the LOOPS_API_SECRET environment variable.
     * @throws {ConfigurationError} If LOOPS_API_SECRET is not set
     */
    private initializeClient(): void {
        const apiKey = process.env.LOOPS_API_SECRET
        if (!apiKey) {
            throw new ConfigurationError('LOOPS_API_SECRET is not set')
        }
        this.client = new LoopsClient(apiKey)
    }

    /**
     * Returns the initialized Loops API client instance.
     * @returns {LoopsClient} The Loops API client
     * @throws {ConfigurationError} If the client is not initialized
     */
    getClient(): LoopsClient {
        if (!this.client) {
            throw new ConfigurationError('Loops client not initialized')
        }
        return this.client
    }
}

/**
 * Logs error details with additional context information.
 * @param {Error} error - The error to log
 * @param {Record<string, any>} context - Additional context information
 */
function logError(error: Error, context: Record<string, any> = {}): void {
    console.error({
        timestamp: new Date().toISOString(),
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
            ...(error instanceof LoopsError && { code: error.code })
        },
        context
    })
}

// Enhanced API functions
/**
 * Creates a new contact in Loops.
 * @param {string} email - The contact's email address
 * @param {string} [firstName] - The contact's first name
 * @param {Object} [options] - Additional contact options
 * @param {string} [options.lastName] - The contact's last name
 * @param {string} [options.userGroup] - The user group to assign the contact to
 * @param {Record<string, string | number | boolean>} [options.properties] - Additional contact properties
 * @param {Record<string, boolean>} [options.mailingLists] - Mailing list subscriptions
 * @returns {Promise<{ success: boolean; id?: string }>} Result object with success status and optional contact ID
 * @throws {LoopsError} If contact creation fails
 */
export async function createContact(
    email: string,
    firstName?: string,
    options: {
        lastName?: string
        userGroup?: string
        properties?: Record<string, string | number | boolean>
        mailingLists?: Record<string, boolean>
    } = {}
): Promise<{ success: boolean; id?: string }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        const contactData = {
            ...(firstName && { firstName }),
            ...(options.lastName && { lastName: options.lastName }),
            ...(options.userGroup && { userGroup: options.userGroup }),
            ...options.properties
        }

        return await client.createContact(validatedEmail, contactData, options.mailingLists)
    } catch (error) {
        logError(error as Error, { email, firstName, options })
        throw new LoopsError('Failed to create contact', 'CREATE_CONTACT_ERROR', error as Error)
    }
}

/**
 * Deletes a contact from Loops.
 * @param {string} email - The email address of the contact to delete
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If contact deletion fails
 */
export async function deleteContact(email: string): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        return await client.deleteContact({ email: validatedEmail })
    } catch (error) {
        logError(error as Error, { email })
        throw new LoopsError('Failed to delete contact', 'DELETE_CONTACT_ERROR', error as Error)
    }
}

/**
 * Records a premium upgrade event for a contact.
 * @param {string} email - The contact's email address
 * @param {string} tier - The premium tier the user upgraded to
 * @param {Record<string, any>} [metadata] - Additional metadata about the upgrade
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If tracking the upgrade fails
 */
export async function upgradedToPremium(email: string, tier: string, metadata?: Record<string, any>): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const validatedTier = TierSchema.parse(tier)
        const client = LoopsClientWrapper.getInstance().getClient()

        return await client.sendEvent({
            eventName: 'upgraded',
            email: validatedEmail,
            contactProperties: {
                tier: validatedTier,
                upgradeDate: new Date().toISOString(),
                ...metadata
            },
            eventProperties: {
                tier: validatedTier,
                ...metadata
            }
        })
    } catch (error) {
        logError(error as Error, { email, tier, metadata })
        throw new LoopsError('Failed to track premium upgrade', 'PREMIUM_UPGRADE_ERROR', error as Error)
    }
}

export async function cancelledPremium(email: string): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        return await client.sendEvent({
            eventName: 'cancelled',
            email: validatedEmail,
            contactProperties: {
                tier: '',
                cancelDate: new Date().toISOString()
            }
        })
    } catch (error) {
        logError(error as Error, { email })
        throw new LoopsError('Failed to track premium cancellation', 'PREMIUM_CANCEL_ERROR', error as Error)
    }
}

export async function findContact(
    params: { email?: string; userId?: string },
    options: { includeDeleted?: boolean } = {}
): Promise<Contact[]> {
    try {
        if (!params.email && !params.userId) {
            throw new LoopsError('Either email or userId must be provided', 'INVALID_PARAMS')
        }

        if (params.email) {
            EmailSchema.parse(params.email)
        }
        if (params.userId) {
            UserIdSchema.parse(params.userId)
        }

        const client = LoopsClientWrapper.getInstance().getClient()
        return await client.findContact({ ...params, ...options })
    } catch (error) {
        logError(error as Error, { params, options })
        throw new LoopsError('Failed to find contact', 'FIND_CONTACT_ERROR', error as Error)
    }
}

export async function sendTransactionalEmail(params: {
    transactionalId: string
    email: string
    addToAudience?: boolean
    dataVariables?: Record<string, string | number>
    attachments?: Array<{
        filename: string
        contentType: string
        data: string
    }>
}): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(params.email)
        const client = LoopsClientWrapper.getInstance().getClient()

        const response = await client.sendTransactionalEmail({
            ...params,
            email: validatedEmail
        })

        return {
            success: response.success
        }
    } catch (error) {
        logError(error as Error, { ...params, email: params.email })
        throw new LoopsError('Failed to send transactional email', 'SEND_EMAIL_ERROR', error as Error)
    }
}

/**
 * Processes a new user signup, creates a contact, and sends a welcome email.
 * @param {string} email - The new user's email address
 * @param {string} firstName - The user's first name
 * @param {Object} [options] - Additional signup options
 * @param {string} [options.lastName] - The user's last name
 * @param {string} [options.company] - The user's company name
 * @param {string} [options.plan] - The selected plan
 * @param {string} [options.source] - The signup source
 * @param {boolean} [options.subscribeToNewsletter] - Whether to subscribe to the newsletter
 * @returns {Promise<{ success: boolean; id?: string }>} Result object with success status and optional contact ID
 * @throws {LoopsError} If signup processing fails
 */
export async function onUserSignup(
    email: string,
    firstName: string,
    options: {
        lastName?: string
        company?: string
        plan?: string
        source?: string
        subscribeToNewsletter?: boolean
    } = {}
): Promise<{ success: boolean; id?: string }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        const contactData = {
            firstName,
            ...options,
            userState: UserState.TRIAL,
            signupDate: new Date().toISOString()
        }

        const mailingLists: Record<string, boolean> = {}
        if (options.subscribeToNewsletter) {
            mailingLists['newsletter'] = true
        }

        const result = await client.createContact(validatedEmail, contactData, mailingLists)

        // Send welcome email
        if (result.success) {
            await sendTransactionalEmail({
                transactionalId: EmailTemplate.WELCOME,
                email: validatedEmail,
                dataVariables: {
                    firstName,
                    company: options.company || ''
                }
            })
        }

        return result
    } catch (error) {
        logError(error as Error, { email, firstName, options })
        throw new LoopsError('Failed to process user signup', 'USER_SIGNUP_ERROR', error as Error)
    }
}

/**
 * Starts a trial period for a user and sends a trial start email.
 * @param {string} email - The user's email address
 * @param {number} [trialDays=14] - The length of the trial in days
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If starting the trial fails
 */
export async function startUserTrial(email: string, trialDays: number = 14): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        const trialEndDate = new Date()
        trialEndDate.setDate(trialEndDate.getDate() + trialDays)

        await client.updateContact(validatedEmail, {
            userState: UserState.TRIAL,
            trialStartDate: new Date().toISOString(),
            trialEndDate: trialEndDate.toISOString()
        })

        return await sendTransactionalEmail({
            transactionalId: EmailTemplate.TRIAL_STARTED,
            email: validatedEmail,
            dataVariables: {
                trialDays,
                trialEndDate: trialEndDate.toISOString()
            }
        })
    } catch (error) {
        logError(error as Error, { email, trialDays })
        throw new LoopsError('Failed to start user trial', 'TRIAL_START_ERROR', error as Error)
    }
}

/**
 * Handles a failed payment event and sends a notification email.
 * @param {string} email - The user's email address
 * @param {number} attemptCount - The number of failed payment attempts
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If processing the payment failure fails
 */
export async function onPaymentFailed(email: string, attemptCount: number): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        await client.updateContact(validatedEmail, {
            userState: UserState.PAST_DUE,
            lastPaymentFailDate: new Date().toISOString(),
            paymentFailAttempts: attemptCount
        })

        return await sendTransactionalEmail({
            transactionalId: EmailTemplate.PAYMENT_FAILED,
            email: validatedEmail,
            dataVariables: {
                attemptCount,
                gracePeriodDays: 7
            }
        })
    } catch (error) {
        logError(error as Error, { email, attemptCount })
        throw new LoopsError('Failed to process payment failure', 'PAYMENT_FAILURE_ERROR', error as Error)
    }
}

/**
 * Records a usage milestone event and sends a notification email.
 * @param {string} email - The user's email address
 * @param {string} milestone - The milestone identifier
 * @param {Record<string, number>} metrics - Usage metrics associated with the milestone
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If processing the milestone fails
 */
export async function onUsageMilestone(email: string, milestone: string, metrics: Record<string, number>): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        await client.sendEvent({
            eventName: 'usage_milestone',
            email: validatedEmail,
            eventProperties: {
                milestone,
                ...metrics
            }
        })

        return await sendTransactionalEmail({
            transactionalId: EmailTemplate.USAGE_MILESTONE,
            email: validatedEmail,
            dataVariables: {
                milestone,
                ...metrics
            }
        })
    } catch (error) {
        logError(error as Error, { email, milestone, metrics })
        throw new LoopsError('Failed to process usage milestone', 'USAGE_MILESTONE_ERROR', error as Error)
    }
}

// Newsletter management
/**
 * Subscribes a contact to the newsletter.
 * @param {string} email - The contact's email address
 * @param {Object} [options] - Subscription options
 * @param {string} [options.source] - The subscription source
 * @param {string[]} [options.tags] - Tags to apply to the contact
 * @param {Record<string, boolean>} [options.preferences] - Additional mailing list preferences
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If newsletter subscription fails
 */
export async function subscribeToNewsletter(
    email: string,
    options: {
        source?: string
        tags?: string[]
        preferences?: Record<string, boolean>
    } = {}
): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        const mailingLists: Record<string, boolean> = {
            newsletter: true,
            ...options.preferences
        }

        return await client.updateContact(
            validatedEmail,
            {
                subscribed: true,
                source: options.source ?? 'website',
                ...(options.tags && { tags: options.tags.join(',') })
            },
            mailingLists
        )
    } catch (error) {
        logError(error as Error, { email, options })
        throw new LoopsError('Failed to subscribe to newsletter', 'NEWSLETTER_SUBSCRIBE_ERROR', error as Error)
    }
}

/**
 * Unsubscribes a contact from the newsletter.
 * @param {string} email - The contact's email address
 * @param {Object} [options] - Unsubscribe options
 * @param {string} [options.reason] - The reason for unsubscribing
 * @param {string} [options.feedback] - Additional feedback
 * @returns {Promise<{ success: boolean }>} Result object indicating success
 * @throws {LoopsError} If newsletter unsubscription fails
 */
export async function unsubscribeFromNewsletter(
    email: string,
    options: {
        reason?: string
        feedback?: string
    } = {}
): Promise<{ success: boolean }> {
    try {
        const validatedEmail = EmailSchema.parse(email)
        const client = LoopsClientWrapper.getInstance().getClient()

        return await client.updateContact(
            validatedEmail,
            {
                subscribed: false,
                ...(options.reason && { unsubscribeReason: options.reason }),
                ...(options.feedback && { unsubscribeFeedback: options.feedback }),
                unsubscribeDate: new Date().toISOString()
            },
            { newsletter: false }
        )
    } catch (error) {
        logError(error as Error, { email, options })
        throw new LoopsError('Failed to unsubscribe from newsletter', 'NEWSLETTER_UNSUBSCRIBE_ERROR', error as Error)
    }
}

// Export types for consumers
export type { Contact, LoopsError, MailingList }
