/**
 * Configuration type for subscription and payment-related email templates
 * @interface SubscriptionEndedConfig
 *
 * @property PLATFORM - Platform-specific information
 * @property PLATFORM.NAME - The display name of the platform
 * @property PLATFORM.URL - The main URL of the platform
 *
 * @property URLS - Collection of important URLs used in the email template
 * @property URLS.BILLING - URL to the billing settings page
 * @property URLS.SUPPORT_EMAIL - Support email address
 * @property URLS.ONBOARDING - URL to the onboarding flow
 * @property URLS.API_REFERENCE - URL to API documentation
 * @property URLS.DISCORD - URL to Discord community
 * @property URLS.DASHBOARD - URL to main application dashboard
 *
 * @property TEXT - Text content used in the email template
 * @property TEXT.HEADING - Main heading for payment issue notification
 * @property TEXT.BUTTON - Text for the CTA button
 * @property TEXT.SUPPORT_MESSAGE - Support message prefix
 * @property TEXT.OR_REPLY - Alternative contact method message
 *
 * @property SIGNATURE - Email signature information
 * @property SIGNATURE.NAME - Name to be used in email signature
 */
type SubscriptionEndedConfig = {
    readonly PLATFORM: {
        readonly NAME: string
        readonly URL: string
    }
    readonly URLS: {
        readonly BILLING: string
        readonly SUPPORT_EMAIL: string
        readonly SUPPORT_EMAIL_REPLY_TO: string
        readonly ONBOARDING: string
        readonly API_REFERENCE: string
        readonly DISCORD: string
        readonly DASHBOARD: string
        readonly X: string
        readonly GITHUB: string
    }
    readonly TEXT: {
        readonly HEADING: string
        readonly BUTTON: string
        readonly SUPPORT_MESSAGE: string
        readonly OR_REPLY: string
    }
    readonly SIGNATURE: {
        readonly NAME: string
    }
}

/**
 * Constants for the PaymentIssue email template
 * Contains all the configuration needed for rendering the payment issue notification email,
 * including platform information, URLs, text content, and signature details.
 *
 * @constant
 * @type {SubscriptionEndedConfig}
 *
 * @example
 * ```typescript
 * import CONSTANTS from './constants';
 *
 * // Access platform name
 * console.log(CONSTANTS.PLATFORM.NAME); // 'Solomon AI'
 *
 * // Access support email
 * console.log(CONSTANTS.URLS.SUPPORT_EMAIL); // 'support@inbox.solomon-ai.app'
 * ```
 */
const CONSTANTS: SubscriptionEndedConfig = {
    PLATFORM: {
        NAME: 'Solomon AI',
        URL: 'https://solomon-ai.app'
    },
    URLS: {
        BILLING: 'https://app.solomon-ai.app/settings/billing/stripe',
        SUPPORT_EMAIL: 'support@inbox.solomon-ai.app',
        SUPPORT_EMAIL_REPLY_TO: 'yoan@inbox.solomon-ai.app',
        ONBOARDING: 'https://go.solomon-ai.app/onboarding',
        API_REFERENCE: 'https://solomon-ai.app/docs/api-reference',
        DISCORD: 'https://solomon-ai.app/discord',
        DASHBOARD: 'https://app.solomon-ai.app',
        X: 'https://x.com/solomon_ai',
        GITHUB: 'https://github.com/SolomonAIEngineering/backend-developer-platform'
    },
    TEXT: {
        HEADING: 'There was an issue with your payment.',
        BUTTON: 'Update payment information',
        SUPPORT_MESSAGE: 'Need help? Please reach out to',
        OR_REPLY: 'or just reply to this email.'
    },
    SIGNATURE: {
        NAME: 'Yoan Yomba'
    }
} as const

export default CONSTANTS
