import { render } from '@react-email/render'
import * as React from 'react'
import { Resend as Client } from 'resend'
import CONSTANTS from '../constants/constants'
import { PaymentIssue } from '../emails/payment_issue'
import { SubscriptionEnded } from '../emails/subscription_ended'
import { TrialEnded } from '../emails/trial_ended'
import { WelcomeEmail } from '../emails/welcome_email'

/**
 * Email client wrapper for handling all email communications
 * @class Resend
 *
 * @property {Client} client - The underlying Resend client instance
 * @property {string} replyTo - Default reply-to email address for all emails
 */
export class Resend {
    public readonly client: Client
    private readonly replyTo = CONSTANTS.URLS.SUPPORT_EMAIL

    /**
     * Creates a new Resend client instance
     * @constructor
     * @param {Object} opts - Configuration options
     * @param {string} opts.apiKey - Resend API key
     */
    constructor(opts: { apiKey: string }) {
        this.client = new Client(opts.apiKey)
    }

    /**
     * Sends a trial ended notification email
     * @async
     * @param {Object} req - Request parameters
     * @param {string} req.email - Recipient's email address
     * @param {string} req.name - Recipient's name
     * @param {string} req.workspace - Name of the workspace whose trial ended
     * @returns {Promise<void>}
     * @throws {Error} When email sending fails
     */
    public async sendTrialEnded(req: { email: string; name: string; workspace: string }): Promise<void> {
        const html = render(<TrialEnded username={req.name} workspaceName={req.workspace} />)
        try {
            const result = await this.client.emails.send({
                to: req.email,
                from: `${CONSTANTS.SIGNATURE.NAME} from Solomon AI <${CONSTANTS.URLS.SUPPORT_EMAIL_REPLY_TO}>`,
                replyTo: this.replyTo,
                subject: `Your ${CONSTANTS.PLATFORM.NAME} trial has ended`,
                html
            })

            if (!result.error) {
                return
            }
            throw result.error
        } catch (error) {
            console.error('Error occurred sending subscription email ', JSON.stringify(error))
        }
    }

    /**
     * Sends a subscription ended notification email
     * @deprecated Consider removing as this is currently unused
     * @async
     * @param {Object} req - Request parameters
     * @param {string} req.email - Recipient's email address
     * @param {string} req.name - Recipient's name
     * @returns {Promise<void>}
     * @throws {Error} When email sending fails
     */
    public async sendSubscriptionEnded(req: { email: string; name: string }): Promise<void> {
        const html = render(<SubscriptionEnded username={req.name} />)
        try {
            const result = await this.client.emails.send({
                to: req.email,
                from: `${CONSTANTS.SIGNATURE.NAME} from Solomon AI <${CONSTANTS.URLS.SUPPORT_EMAIL_REPLY_TO}>`,
                replyTo: this.replyTo,
                subject: `Your ${CONSTANTS.PLATFORM.NAME} trial has ended`,
                html
            })
            if (!result.error) {
                return
            }
            throw result.error
        } catch (error) {
            console.error('Error occurred sending subscription email ', JSON.stringify(error))
        }
    }

    /**
     * Sends a welcome email to new users
     * @async
     * @param {Object} req - Request parameters
     * @param {string} req.email - Recipient's email address
     * @returns {Promise<void>}
     * @throws {Error} When email sending fails
     *
     * @remarks
     * The email is scheduled to be sent 5 minutes after the function call
     */
    public async sendWelcomeEmail(req: { email: string }) {
        const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000).toISOString()

        const html = render(<WelcomeEmail />)
        try {
            const result = await this.client.emails.send({
                to: req.email,
                from: `${CONSTANTS.SIGNATURE.NAME} from Solomon AI <${CONSTANTS.URLS.SUPPORT_EMAIL_REPLY_TO}>`,
                replyTo: this.replyTo,
                subject: `Welcome to ${CONSTANTS.PLATFORM.NAME}`,
                html,
                scheduledAt: fiveMinutesFromNow
            })
            if (!result.error) {
                return
            }
            throw result.error
        } catch (error) {
            console.error('Error occurred sending welcome email ', JSON.stringify(error))
        }
    }

    /**
     * Sends a payment issue notification email
     * @async
     * @param {Object} req - Request parameters
     * @param {string} req.email - Recipient's email address
     * @param {string} req.name - Recipient's name
     * @param {Date} req.date - Date when the payment issue occurred
     * @returns {Promise<void>}
     * @throws {Error} When email sending fails
     */
    public async sendPaymentIssue(req: { email: string; name: string; date: Date }): Promise<void> {
        const html = render(<PaymentIssue username={req.name} date={req.date.toDateString()} />)
        try {
            const result = await this.client.emails.send({
                to: req.email,
                from: `${CONSTANTS.SIGNATURE.NAME} from Solomon AI <${CONSTANTS.URLS.SUPPORT_EMAIL_REPLY_TO}>`,
                replyTo: this.replyTo,
                subject: 'There was an issue with your payment',
                html
            })
            if (!result.error) {
                return
            }
            throw result.error
        } catch (error) {
            console.error('Error occurred sending payment issue email ', JSON.stringify(error))
        }
    }
}
