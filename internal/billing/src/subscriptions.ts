import { z } from 'zod'
import { billingTier } from './tiers'

// Define feature sets for different modules
const featureSets = {
    invoicing: [
        'automated-reminders',
        'dynamic-scheduling',
        'payment-notifications',
        'custom-templates',
        'multi-currency',
        'recurring-billing',
        'partial-payments',
        'analytics-dashboard'
    ],
    timeTracking: ['project-management', 'gps-tracking', 'task-assignment', 'budget-association', 'collaboration-tools'],
    fileReconciliation: ['ai-matching', 'discrepancy-detection', 'batch-processing', 'custom-rules', 'audit-trail'],
    storage: ['encrypted-storage', 'collaborative-workspace', 'daily-backups', 'disaster-recovery', 'document-templates'],
    financialOverview: ['real-time-dashboard', 'kpi-tracking', 'trend-analysis', 'ai-insights', 'scenario-planning'],
    assistant: ['ai-advisor', 'task-automation', 'voice-interface', 'predictive-alerts', 'learning-engine']
} as const

// Enhanced subscription schemas with more detailed feature tracking
const fixedSubscriptionSchema = z.object({
    productId: z.string(),
    cents: z.string().regex(/^\d{1,15}(\.\d{1,12})?$/),
    features: z.array(z.string()).optional(),
    maxUsers: z.number().optional(),
    maxStorage: z.number().optional(), // in MB
    maxTransactions: z.number().optional(),
    customBranding: z.boolean().optional(),
    supportLevel: z.enum(['basic', 'priority', 'dedicated']).optional()
})

const tieredSubscriptionSchema = z.object({
    productId: z.string(),
    tiers: z.array(billingTier),
    features: z.array(z.string()).optional(),
    aiEnabled: z.boolean().optional(),
    complianceLevel: z.enum(['basic', 'advanced', 'enterprise']).optional()
})

// Enhanced subscriptions schema with all platform modules
export const subscriptionsSchema = z.object({
    // Core platform tiers
    basic: fixedSubscriptionSchema.optional(),
    pro: fixedSubscriptionSchema.optional(),
    enterprise: fixedSubscriptionSchema.optional(),

    // Core features
    invoicing: tieredSubscriptionSchema.optional(),
    timeTracking: tieredSubscriptionSchema.optional(),
    expenses: tieredSubscriptionSchema.optional(),

    // Financial management
    budgeting: tieredSubscriptionSchema.optional(),
    cashFlow: tieredSubscriptionSchema.optional(),
    forecasting: tieredSubscriptionSchema.optional(),

    // Advanced features
    ai: tieredSubscriptionSchema.optional(),
    compliance: tieredSubscriptionSchema.optional(),
    storage: tieredSubscriptionSchema.optional(),

    // Add-ons
    payroll: fixedSubscriptionSchema.optional(),
    support: fixedSubscriptionSchema.optional(),
    training: fixedSubscriptionSchema.optional()
})

// Enhanced environment schema
const stripeEnvSchema = z.object({
    // Core products
    STRIPE_PRODUCT_ID_BASIC: z.string(),
    STRIPE_PRODUCT_ID_PRO: z.string(),
    STRIPE_PRODUCT_ID_ENTERPRISE: z.string(),

    // Feature products
    STRIPE_PRODUCT_ID_INVOICING: z.string(),
    STRIPE_PRODUCT_ID_TIME_TRACKING: z.string(),
    STRIPE_PRODUCT_ID_EXPENSES: z.string(),
    STRIPE_PRODUCT_ID_BUDGETING: z.string(),
    STRIPE_PRODUCT_ID_CASH_FLOW: z.string(),
    STRIPE_PRODUCT_ID_FORECASTING: z.string(),
    STRIPE_PRODUCT_ID_AI: z.string(),
    STRIPE_PRODUCT_ID_COMPLIANCE: z.string(),
    STRIPE_PRODUCT_ID_STORAGE: z.string(),
    STRIPE_PRODUCT_ID_PAYROLL: z.string(),
    STRIPE_PRODUCT_ID_SUPPORT: z.string(),
    STRIPE_PRODUCT_ID_TRAINING: z.string()
})

export function defaultProSubscriptions(): Subscriptions | null {
    const env = stripeEnvSchema.safeParse(process.env)
    if (!env.success) return null

    return {
        // Pro tier with comprehensive features
        pro: {
            productId: env.data.STRIPE_PRODUCT_ID_PRO,
            cents: '9900', // $99/month
            features: [
                ...featureSets.invoicing,
                ...featureSets.timeTracking,
                ...featureSets.storage.slice(0, 3), // Basic storage features
                'basic-ai',
                'compliance-essentials'
            ],
            maxUsers: 10,
            maxStorage: 100_000, // 100GB
            maxTransactions: 10_000,
            customBranding: true,
            supportLevel: 'priority'
        },

        // Usage-based features
        storage: {
            productId: env.data.STRIPE_PRODUCT_ID_STORAGE,
            tiers: [
                { firstUnit: 1, lastUnit: 100_000, centsPerUnit: null }, // First 100GB free
                { firstUnit: 100_001, lastUnit: 1_000_000, centsPerUnit: '0.05' }, // $0.0005/MB
                { firstUnit: 1_000_001, lastUnit: null, centsPerUnit: '0.025' } // Volume discount
            ],
            features: [...featureSets.storage],
            aiEnabled: true,
            complianceLevel: 'advanced'
        },

        // AI capabilities
        ai: {
            productId: env.data.STRIPE_PRODUCT_ID_AI,
            tiers: [
                { firstUnit: 1, lastUnit: 1000, centsPerUnit: null }, // Free tier
                { firstUnit: 1001, lastUnit: null, centsPerUnit: '1' } // $0.01 per AI operation
            ],
            features: [...featureSets.assistant]
        },

        // Add-on services
        payroll: {
            productId: env.data.STRIPE_PRODUCT_ID_PAYROLL,
            cents: '4900', // $49/month
            features: ['automated-payroll', 'tax-compliance', 'benefits-management', 'multi-currency', 'employee-portal']
        },

        // Enhanced support
        support: {
            productId: env.data.STRIPE_PRODUCT_ID_SUPPORT,
            cents: '19900', // $199/month
            features: ['24-7-support', 'dedicated-manager', 'training-sessions', 'compliance-assistance', 'priority-resolution'],
            supportLevel: 'dedicated'
        }
    }
}

export type Subscriptions = z.infer<typeof subscriptionsSchema>
export type TieredSubscription = z.infer<typeof tieredSubscriptionSchema>
export type FixedSubscription = z.infer<typeof fixedSubscriptionSchema>
