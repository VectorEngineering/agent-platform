/**
 * @module notification
 * @description A notification service module that integrates with Novu for handling various types of notifications
 */

import { Novu } from '@novu/node'
import { nanoid } from 'nanoid'

const novu = new Novu(process.env.NOVU_SECRET_KEY!)

const API_ENDPOINT = 'https://api.novu.co/v1'

/**
 * @enum {string}
 * @description Enumeration of all possible trigger events for notifications
 */
export enum TriggerEvents {
    /** New single transaction notification in-app */
    TransactionNewInApp = 'transaction_new_in_app',
    /** Multiple new transactions notification in-app */
    TransactionsNewInApp = 'transactions_new_in_app',
    /** New transaction email notification */
    TransactionNewEmail = 'transaction_new_email',
    /** New inbox item notification in-app */
    InboxNewInApp = 'inbox_new_in_app',
    /** New match notification in-app */
    MatchNewInApp = 'match_in_app',
    /** Invoice paid notification in-app */
    InvoicePaidInApp = 'invoice_paid_in_app',
    /** Invoice paid email notification */
    InvoicePaidEmail = 'invoice_paid_email',
    /** Overdue invoice notification in-app */
    InvoiceOverdueInApp = 'invoice_overdue_in_app',
    /** Overdue invoice email notification */
    InvoiceOverdueEmail = 'invoice_overdue_email',
    /** App created notification in-app */
    AppCreatedInApp = 'app_created_in_app',
    /** App created email notification */
    AppCreatedEmail = 'app_created_email',
    /** App settings updated in-app */
    AppSettingsUpdatedInApp = 'app_settings_updated_in_app',
    /** App settings updated email */
    AppSettingsUpdatedEmail = 'app_settings_updated_email',
    /** App configuration changed in-app */
    AppConfigChangedInApp = 'app_config_changed_in_app',
    /** App configuration changed email */
    AppConfigChangedEmail = 'app_config_changed_email',
    /** App user permissions changed in-app */
    AppUserPermissionsInApp = 'app_user_permissions_in_app',
    /** App user permissions changed email */
    AppUserPermissionsEmail = 'app_user_permissions_email',
    /** App usage limits reached in-app */
    AppUsageLimitsInApp = 'app_usage_limits_in_app',
    /** App usage limits reached email */
    AppUsageLimitsEmail = 'app_usage_limits_email',
    /** Large transaction detected notification in-app */
    LargeTransactionInApp = 'large_transaction_in_app',
    /** Large transaction detected email */
    LargeTransactionEmail = 'large_transaction_email',
    /** Low balance alert in-app */
    LowBalanceInApp = 'low_balance_in_app',
    /** Low balance alert email */
    LowBalanceEmail = 'low_balance_email',
    /** Sync failed notification in-app */
    SyncFailedInApp = 'sync_failed_in_app',
    /** Sync failed email */
    SyncFailedEmail = 'sync_failed_email',
    /** Currency settings updated in-app */
    CurrencySettingsInApp = 'currency_settings_in_app',
    /** Currency settings updated email */
    CurrencySettingsEmail = 'currency_settings_email',
    /** Payment provider status change in-app */
    PaymentProviderStatusInApp = 'payment_provider_status_in_app',
    /** Payment provider status change email */
    PaymentProviderStatusEmail = 'payment_provider_status_email',
    /** Stripe capability update in-app */
    StripeCapabilityInApp = 'stripe_capability_in_app',
    /** Stripe capability update email */
    StripeCapabilityEmail = 'stripe_capability_email',
    /** Reconciliation completed in-app */
    ReconciliationCompletedInApp = 'reconciliation_completed_in_app',
    /** Reconciliation completed email */
    ReconciliationCompletedEmail = 'reconciliation_completed_email',
    /** AI daily question limit reached in-app */
    AIQuestionLimitInApp = 'ai_question_limit_in_app',
    /** AI daily question limit reached email */
    AIQuestionLimitEmail = 'ai_question_limit_email',
    /** AI knowledge base updated in-app */
    AIKnowledgeBaseInApp = 'ai_knowledge_base_in_app',
    /** AI knowledge base updated email */
    AIKnowledgeBaseEmail = 'ai_knowledge_base_email',
    /** AI conversation history cleanup in-app */
    AIHistoryCleanupInApp = 'ai_history_cleanup_in_app',
    /** AI conversation history cleanup email */
    AIHistoryCleanupEmail = 'ai_history_cleanup_email',
    /** Lead stage change notification in-app */
    LeadStageChangeInApp = 'lead_stage_change_in_app',
    /** Lead stage change email */
    LeadStageChangeEmail = 'lead_stage_change_email',
    /** Lead assignment notification in-app */
    LeadAssignmentInApp = 'lead_assignment_in_app',
    /** Lead assignment email */
    LeadAssignmentEmail = 'lead_assignment_email',
    /** Lead task due notification in-app */
    LeadTaskDueInApp = 'lead_task_due_in_app',
    /** Lead task due email */
    LeadTaskDueEmail = 'lead_task_due_email',
    /** Lead follow-up reminder in-app */
    LeadFollowUpInApp = 'lead_follow_up_in_app',
    /** Lead follow-up reminder email */
    LeadFollowUpEmail = 'lead_follow_up_email'
}

/**
 * @enum {string}
 * @description Types of notifications that can be sent
 */
export enum NotificationTypes {
    /** Single transaction notification */
    Transaction = 'transaction',
    /** Multiple transactions notification */
    Transactions = 'transactions',
    /** Inbox notification */
    Inbox = 'inbox',
    /** Match notification */
    Match = 'match',
    /** Invoice notification */
    Invoice = 'invoice',
    /** App lifecycle notifications (creation, updates) */
    App = 'app',
    /** App configuration changes */
    AppConfig = 'app_config',
    /** App settings changes */
    AppSettings = 'app_settings',
    /** App user permission changes */
    AppPermissions = 'app_permissions',
    /** App usage and limits */
    AppUsage = 'app_usage',
    /** Financial settings and alerts */
    Financial = 'financial',
    /** Currency and exchange rate notifications */
    Currency = 'currency',
    /** Payment provider notifications */
    PaymentProvider = 'payment_provider',
    /** Bank sync and reconciliation */
    BankSync = 'bank_sync',
    /** Balance and transaction alerts */
    BalanceAlert = 'balance_alert',
    /** Stripe integration notifications */
    StripeAccount = 'stripe_account',
    /** AI assistant usage and limits */
    AIUsage = 'ai_usage',
    /** AI knowledge base updates */
    AIKnowledgeBase = 'ai_knowledge_base',
    /** AI conversation management */
    AIConversation = 'ai_conversation',
    /** Lead stage and status updates */
    LeadStatus = 'lead_status',
    /** Lead assignment notifications */
    LeadAssignment = 'lead_assignment',
    /** Lead task management */
    LeadTask = 'lead_task',
    /** Lead follow-up reminders */
    LeadFollowUp = 'lead_follow_up',
    /** Lead engagement alerts */
    LeadEngagement = 'lead_engagement'
}

/**
 * @interface TriggerUser
 * @description User information required for triggering notifications
 */
export type TriggerUser = {
    /** Unique identifier for the subscriber */
    subscriberId: string
    /** User's email address */
    email: string
    /** User's full name */
    fullName: string
    /** Optional URL to user's avatar */
    avatarUrl?: string
    /** Identifier for the user's workspace */
    workspaceId: string
}

/**
 * @interface TriggerPayload
 * @description Configuration for triggering a notification
 */
export type TriggerPayload = {
    /** The type of trigger event */
    name: TriggerEvents
    /** Custom data payload for the notification */
    // biome-ignore lint/suspicious/noExplicitAny: Payload can be of any type
    payload: any
    /** User information for the notification recipient */
    user: TriggerUser
    /** Optional reply-to email address */
    replyTo?: string
    /** Optional tenant identifier for multi-tenant setups */
    tenant?: string
}

/**
 * Triggers a single notification event
 * @async
 * @param {TriggerPayload} data - The notification configuration
 * @returns {Promise<void>}
 * @throws {Error} When the notification fails to send
 */
export async function trigger(data: TriggerPayload) {
    try {
        await novu.trigger(data.name, {
            to: {
                ...data.user,
                //   Prefix subscriber id with team id
                subscriberId: `${data.user.workspaceId}_${data.user.subscriberId}`
            },
            payload: data.payload,
            tenant: data.tenant,
            overrides: {
                email: {
                    // @ts-ignore
                    replyTo: data.replyTo,
                    headers: {
                        'X-Entity-Ref-ID': nanoid()
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * Triggers multiple notification events in bulk
 * @async
 * @param {TriggerPayload[]} events - Array of notification configurations
 * @returns {Promise<void>}
 * @throws {Error} When the bulk notification operation fails
 */
export async function triggerBulk(events: TriggerPayload[]) {
    try {
        await novu.bulkTrigger(
            events.map((data) => ({
                name: data.name,
                to: {
                    ...data.user,
                    //   Prefix subscriber id with team id
                    subscriberId: `${data.user.workspaceId}_${data.user.subscriberId}`
                },
                payload: data.payload,
                tenant: data.tenant,
                overrides: {
                    email: {
                        replyTo: data.replyTo,
                        headers: {
                            'X-Entity-Ref-ID': nanoid()
                        }
                    }
                }
            }))
        )
    } catch (error) {
        console.log(error)
    }
}

/**
 * @interface GetSubscriberPreferencesParams
 * @description Parameters for retrieving subscriber preferences
 */
type GetSubscriberPreferencesParams = {
    /** Workspace identifier */
    workspaceId: string
    /** Subscriber identifier */
    subscriberId: string
}

/**
 * Retrieves notification preferences for a subscriber
 * @async
 * @param {GetSubscriberPreferencesParams} params - Parameters for the request
 * @returns {Promise<Object>} The subscriber's notification preferences
 */
export async function getSubscriberPreferences({ subscriberId, workspaceId }: GetSubscriberPreferencesParams) {
    const response = await fetch(`${API_ENDPOINT}/subscribers/${workspaceId}_${subscriberId}/preferences?includeInactiveChannels=false`, {
        method: 'GET',
        headers: {
            Authorization: `ApiKey ${process.env.NOVU_API_KEY!}`
        }
    })

    return response.json()
}

/**
 * @interface UpdateSubscriberPreferenceParams
 * @description Parameters for updating subscriber preferences
 */
type UpdateSubscriberPreferenceParams = {
    /** Subscriber identifier */
    subscriberId: string
    /** Workspace identifier */
    workspaceId: string
    /** Template identifier for the notification */
    templateId: string
    /** Type of notification channel */
    type: string
    /** Whether the notification channel is enabled */
    enabled: boolean
}

/**
 * Updates notification preferences for a subscriber
 * @async
 * @param {UpdateSubscriberPreferenceParams} params - Parameters for the update
 * @returns {Promise<Object>} The updated subscriber preferences
 */
export async function updateSubscriberPreference({
    subscriberId,
    workspaceId,
    templateId,
    type,
    enabled
}: UpdateSubscriberPreferenceParams) {
    const response = await fetch(`${API_ENDPOINT}/subscribers/${workspaceId}_${subscriberId}/preferences/${templateId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `ApiKey ${process.env.NOVU_API_KEY!}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channel: {
                type,
                enabled
            }
        })
    })

    return response.json()
}

/**
 * @interface NotificationPreference
 * @description Comprehensive notification preferences for different aspects of the system
 */
export interface NotificationPreference {
    // Financial Notifications
    financial: {
        /** Whether large transaction notifications are enabled */
        notifyLargeTransactions: boolean
        /** Threshold amount for large transaction notifications */
        largeTransactionThreshold?: number
        /** Whether failed sync notifications are enabled */
        notifyFailedSync: boolean
        /** Whether low balance notifications are enabled */
        notifyLowBalance: boolean
        /** Threshold amount for low balance notifications */
        lowBalanceThreshold?: number
        /** Payment provider notifications */
        notifyPaymentProviderStatus: boolean
        /** Stripe capability updates */
        notifyStripeUpdates: boolean
        /** Reconciliation notifications */
        notifyReconciliation: boolean
        /** Currency settings updates */
        notifyCurrencySettings: boolean
    }

    // AI Assistant Notifications
    ai: {
        /** Whether AI-related notifications are enabled */
        notifyAIEvents: boolean
        /** Daily question limit notifications */
        notifyQuestionLimit: boolean
        /** Knowledge base update notifications */
        notifyKnowledgeBaseUpdates: boolean
        /** History cleanup notifications */
        notifyHistoryCleanup: boolean
        /** Response quality feedback notifications */
        notifyResponseQuality: boolean
        /** Context window adjustments */
        notifyContextChanges: boolean
    }

    // Lead Management Notifications
    leads: {
        /** Whether lead-related notifications are enabled */
        notifyLeadEvents: boolean
        /** Stage changes */
        notifyStageChanges: boolean
        /** Assignment changes */
        notifyAssignments: boolean
        /** Task notifications */
        tasks: {
            notifyDue: boolean
            notifyOverdue: boolean
            notifyAssigned: boolean
            notifyCompleted: boolean
            reminderHours: number[]
        }
        /** Follow-up reminders */
        followUp: {
            enabled: boolean
            reminderDays: number[]
            missedFollowUp: boolean
        }
        /** Lead scoring notifications */
        scoring: {
            notifyScoreChanges: boolean
            notifyThresholdReached: boolean
            scoreThresholds: number[]
        }
    }

    // Contact & Communication Preferences
    communication: {
        /** Communication attempt notifications */
        notifyFailedAttempts: boolean
        /** Response received notifications */
        notifyResponses: boolean
        /** Meeting scheduled notifications */
        notifyMeetings: boolean
        /** Document shared notifications */
        notifyDocuments: boolean
    }

    // Compliance & Data Protection
    compliance: {
        /** Consent expiration notifications */
        notifyConsentExpiration: boolean
        /** Data retention notifications */
        notifyDataRetention: boolean
        /** Compliance audit notifications */
        notifyComplianceAudits: boolean
        /** GDPR-related notifications */
        notifyGDPREvents: boolean
    }

    // Channel Preferences
    channels: {
        /** Email notifications enabled */
        email: boolean
        /** In-app notifications enabled */
        inApp: boolean
        /** Mobile push notifications enabled */
        push: boolean
        /** SMS notifications enabled */
        sms: boolean
        /** Slack notifications enabled */
        slack: boolean
    }

    // Timing Preferences
    timing: {
        /** User's timezone */
        timezone: string
        /** Quiet hours start (24h format) */
        quietHoursStart?: string
        /** Quiet hours end (24h format) */
        quietHoursEnd?: string
        /** Preferred days for notifications */
        workingDays: string[]
        /** Notification frequency limit */
        maxNotificationsPerHour?: number
    }

    // Integration Notifications
    integrations: {
        /** External system sync notifications */
        notifyExternalSync: boolean
        /** Integration error notifications */
        notifyIntegrationErrors: boolean
        /** API usage notifications */
        notifyAPIUsage: boolean
        /** Webhook delivery notifications */
        notifyWebhookDelivery: boolean
    }

    // Project & Team Notifications
    project: {
        /** Project setting changes */
        notifySettingChanges: boolean
        /** Team member changes */
        notifyTeamChanges: boolean
        /** Role/permission changes */
        notifyPermissionChanges: boolean
        /** Project milestone notifications */
        notifyMilestones: boolean
    }
}

/**
 * @interface NotificationDeliveryPreference
 * @description Delivery preferences for different notification types
 */
export interface NotificationDeliveryPreference {
    /** Notification type */
    type: NotificationTypes
    /** Delivery channels */
    channels: {
        email: boolean
        inApp: boolean
        push: boolean
        sms: boolean
        slack: boolean
    }
    /** Urgency level */
    urgency: 'low' | 'medium' | 'high' | 'critical'
    /** Delivery schedule */
    schedule: {
        immediate: boolean
        digest: boolean
        digestFrequency?: 'daily' | 'weekly'
    }
}

/**
 * @interface NotificationDigestPreference
 * @description Preferences for notification digests
 */
export interface NotificationDigestPreference {
    /** Whether digests are enabled */
    enabled: boolean
    /** Digest frequency */
    frequency: 'daily' | 'weekly'
    /** Preferred delivery time */
    deliveryTime: string
    /** Minimum notifications for digest */
    minNotifications: number
    /** Categories to include */
    includedCategories: NotificationTypes[]
    /** Whether to include low priority */
    includeLowPriority: boolean
}
