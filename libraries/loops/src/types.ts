import { z } from 'zod'

// Type definitions
export interface Contact {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    source: string | null
    subscribed: boolean
    userGroup: string | null
    userId: string | null
    mailingLists: Record<string, true>
    createdAt?: Date
    updatedAt?: Date
}

export interface MailingList {
    id: string
    name: string
    isPublic: boolean
    description?: string
    subscriberCount?: number
}

export enum UserState {
    TRIAL = 'trial',
    ACTIVE = 'active',
    PAST_DUE = 'past_due',
    CANCELLED = 'cancelled',
    CHURNED = 'churned'
}

export enum EmailTemplate {
    WELCOME = 'welcome',
    TRIAL_STARTED = 'trial-started',
    TRIAL_ENDING_SOON = 'trial-ending-soon',
    TRIAL_ENDED = 'trial-ended',
    PAYMENT_FAILED = 'payment-failed',
    SUBSCRIPTION_CANCELLED = 'subscription-cancelled',
    FEATURE_ANNOUNCEMENT = 'feature-announcement',
    MONTHLY_NEWSLETTER = 'monthly-newsletter',
    USAGE_MILESTONE = 'usage-milestone',
    REENGAGEMENT = 'reengagement',
    PASSWORD_RESET = 'password-reset',
    ACCOUNT_VERIFICATION = 'account-verification'
}

// Validation schemas
export const EmailSchema = z.string().email('Invalid email format')
export const UserIdSchema = z.string().min(1, 'User ID cannot be empty')
export const TierSchema = z.string().min(1, 'Tier cannot be empty')

// Error classes
export class LoopsError extends Error {
    constructor(message: string, public code: string, public originalError?: Error) {
        super(message)
        this.name = 'LoopsError'
    }
}

export class ConfigurationError extends LoopsError {
    constructor(message: string) {
        super(message, 'CONFIGURATION_ERROR')
    }
}
