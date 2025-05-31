import { z } from 'zod'

export const eventTypesArr = [
    // Verifications
    'verifications.usage.record',

    // Transactions
    'transaction.created',
    'transaction.updated',
    'transaction.failed',
    'transaction.cancelled',
    'transaction.disputed',
    'transaction.refunded',
    'transaction.settled',
    'transaction.flagged',

    // Accounts
    'account.created',
    'account.updated',
    'account.suspended',
    'account.closed',
    'account.reactivated',
    'account.frozen',
    'account.unfrozen',
    'account.limits.updated',

    // KYC & Compliance
    'kyc.verification.started',
    'kyc.verification.completed',
    'kyc.verification.failed',
    'kyc.document.submitted',
    'kyc.document.verified',
    'kyc.document.rejected',
    'kyc.risk.level.changed',
    'kyc.screening.completed',

    // Fraud Detection
    'fraud.alert.created',
    'fraud.case.opened',
    'fraud.case.updated',
    'fraud.case.closed',
    'fraud.transaction.blocked',
    'fraud.pattern.detected',

    // Reporting & Analytics
    'report.generated',
    'report.scheduled',
    'report.failed',
    'analytics.threshold.exceeded',

    // Balance & Financial
    'balance.updated',
    'balance.reconciled',
    'balance.threshold.reached',
    'interest.credited',
    'fee.charged',

    // Compliance & Regulatory
    'compliance.report.filed',
    'compliance.alert.triggered',
    'compliance.review.required',
    'regulatory.filing.submitted',
    'regulatory.requirement.updated'
] as const

export const eventType = z.enum(eventTypesArr)

export const event = z.discriminatedUnion('type', [
    z.object({
        type: z.literal(eventType.enum['verifications.usage.record']),
        timestamp: z.string().datetime(),
        data: z.object({
            eventId: z.string(),
            interval: z.object({
                start: z.number(),
                end: z.number()
            }),
            keySpaceId: z.string(),
            records: z.array(
                z.object({
                    ownerId: z.string(),
                    verifications: z.number()
                })
            )
        })
    }),
    z.object({
        type: z.literal(eventType.enum['transaction.created']),
        timestamp: z.string().datetime(),
        data: z.object({
            transactionId: z.string(),
            amount: z.number(),
            currency: z.string(),
            sourceAccountId: z.string(),
            destinationAccountId: z.string(),
            status: z.enum(['pending', 'processing', 'completed']),
            metadata: z.record(z.string()).optional()
        })
    }),
    z.object({
        type: z.literal(eventType.enum['transaction.updated']),
        timestamp: z.string().datetime(),
        data: z.object({
            transactionId: z.string(),
            previousStatus: z.enum(['pending', 'processing', 'completed', 'failed']),
            newStatus: z.enum(['pending', 'processing', 'completed', 'failed']),
            updatedAt: z.string().datetime()
        })
    }),
    z.object({
        type: z.literal(eventType.enum['account.created']),
        timestamp: z.string().datetime(),
        data: z.object({
            accountId: z.string(),
            accountType: z.enum(['individual', 'business']),
            ownerId: z.string(),
            currency: z.string(),
            status: z.enum(['active', 'pending', 'suspended'])
        })
    }),
    z.object({
        type: z.literal(eventType.enum['kyc.verification.started']),
        timestamp: z.string().datetime(),
        data: z.object({
            verificationId: z.string(),
            accountId: z.string(),
            documentType: z.enum(['passport', 'national_id', 'driving_license']),
            requiredDocuments: z.array(z.string())
        })
    }),
    z.object({
        type: z.literal(eventType.enum['balance.updated']),
        timestamp: z.string().datetime(),
        data: z.object({
            accountId: z.string(),
            previousBalance: z.number(),
            newBalance: z.number(),
            currency: z.string(),
            reason: z.enum(['deposit', 'withdrawal', 'transfer', 'fee', 'refund']),
            transactionId: z.string().optional()
        })
    })
])

export type Event = z.infer<typeof event>
