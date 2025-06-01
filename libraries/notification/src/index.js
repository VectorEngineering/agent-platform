'use strict'
/**
 * @module notification
 * @description A notification service module that integrates with Novu for handling various types of notifications
 */
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i]
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
                }
                return t
            }
        return __assign.apply(this, arguments)
    }
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next())
        })
    }
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1]
                    return t[1]
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype)
        return (
            (g.next = verb(0)),
            (g['throw'] = verb(1)),
            (g['return'] = verb(2)),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this
                }),
            g
        )
        function verb(n) {
            return function (v) {
                return step([n, v])
            }
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.')
            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t
                    if (((y = 0), t)) op = [op[0] & 2, t.value]
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op
                            break
                        case 4:
                            _.label++
                            return { value: op[1], done: false }
                        case 5:
                            _.label++
                            y = op[1]
                            op = [0]
                            continue
                        case 7:
                            op = _.ops.pop()
                            _.trys.pop()
                            continue
                        default:
                            if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0
                                continue
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1]
                                break
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1]
                                t = op
                                break
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2]
                                _.ops.push(op)
                                break
                            }
                            if (t[2]) _.ops.pop()
                            _.trys.pop()
                            continue
                    }
                    op = body.call(thisArg, _)
                } catch (e) {
                    op = [6, e]
                    y = 0
                } finally {
                    f = t = 0
                }
            if (op[0] & 5) throw op[1]
            return { value: op[0] ? op[1] : void 0, done: true }
        }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.NotificationTypes = exports.TriggerEvents = void 0
exports.trigger = trigger
exports.triggerBulk = triggerBulk
exports.getSubscriberPreferences = getSubscriberPreferences
exports.updateSubscriberPreference = updateSubscriberPreference
var node_1 = require('@novu/node')
var nanoid_1 = require('nanoid')
var novu = new node_1.Novu(process.env.NOVU_SECRET_KEY)
var API_ENDPOINT = 'https://api.novu.co/v1'
/**
 * @enum {string}
 * @description Enumeration of all possible trigger events for notifications
 */
var TriggerEvents
;(function (TriggerEvents) {
    /** New single transaction notification in-app */
    TriggerEvents['TransactionNewInApp'] = 'transaction_new_in_app'
    /** Multiple new transactions notification in-app */
    TriggerEvents['TransactionsNewInApp'] = 'transactions_new_in_app'
    /** New transaction email notification */
    TriggerEvents['TransactionNewEmail'] = 'transaction_new_email'
    /** New inbox item notification in-app */
    TriggerEvents['InboxNewInApp'] = 'inbox_new_in_app'
    /** New match notification in-app */
    TriggerEvents['MatchNewInApp'] = 'match_in_app'
    /** Invoice paid notification in-app */
    TriggerEvents['InvoicePaidInApp'] = 'invoice_paid_in_app'
    /** Invoice paid email notification */
    TriggerEvents['InvoicePaidEmail'] = 'invoice_paid_email'
    /** Overdue invoice notification in-app */
    TriggerEvents['InvoiceOverdueInApp'] = 'invoice_overdue_in_app'
    /** Overdue invoice email notification */
    TriggerEvents['InvoiceOverdueEmail'] = 'invoice_overdue_email'
    /** App created notification in-app */
    TriggerEvents['AppCreatedInApp'] = 'app_created_in_app'
    /** App created email notification */
    TriggerEvents['AppCreatedEmail'] = 'app_created_email'
    /** App settings updated in-app */
    TriggerEvents['AppSettingsUpdatedInApp'] = 'app_settings_updated_in_app'
    /** App settings updated email */
    TriggerEvents['AppSettingsUpdatedEmail'] = 'app_settings_updated_email'
    /** App configuration changed in-app */
    TriggerEvents['AppConfigChangedInApp'] = 'app_config_changed_in_app'
    /** App configuration changed email */
    TriggerEvents['AppConfigChangedEmail'] = 'app_config_changed_email'
    /** App user permissions changed in-app */
    TriggerEvents['AppUserPermissionsInApp'] = 'app_user_permissions_in_app'
    /** App user permissions changed email */
    TriggerEvents['AppUserPermissionsEmail'] = 'app_user_permissions_email'
    /** App usage limits reached in-app */
    TriggerEvents['AppUsageLimitsInApp'] = 'app_usage_limits_in_app'
    /** App usage limits reached email */
    TriggerEvents['AppUsageLimitsEmail'] = 'app_usage_limits_email'
    /** Large transaction detected notification in-app */
    TriggerEvents['LargeTransactionInApp'] = 'large_transaction_in_app'
    /** Large transaction detected email */
    TriggerEvents['LargeTransactionEmail'] = 'large_transaction_email'
    /** Low balance alert in-app */
    TriggerEvents['LowBalanceInApp'] = 'low_balance_in_app'
    /** Low balance alert email */
    TriggerEvents['LowBalanceEmail'] = 'low_balance_email'
    /** Sync failed notification in-app */
    TriggerEvents['SyncFailedInApp'] = 'sync_failed_in_app'
    /** Sync failed email */
    TriggerEvents['SyncFailedEmail'] = 'sync_failed_email'
    /** Currency settings updated in-app */
    TriggerEvents['CurrencySettingsInApp'] = 'currency_settings_in_app'
    /** Currency settings updated email */
    TriggerEvents['CurrencySettingsEmail'] = 'currency_settings_email'
    /** Payment provider status change in-app */
    TriggerEvents['PaymentProviderStatusInApp'] = 'payment_provider_status_in_app'
    /** Payment provider status change email */
    TriggerEvents['PaymentProviderStatusEmail'] = 'payment_provider_status_email'
    /** Stripe capability update in-app */
    TriggerEvents['StripeCapabilityInApp'] = 'stripe_capability_in_app'
    /** Stripe capability update email */
    TriggerEvents['StripeCapabilityEmail'] = 'stripe_capability_email'
    /** Reconciliation completed in-app */
    TriggerEvents['ReconciliationCompletedInApp'] = 'reconciliation_completed_in_app'
    /** Reconciliation completed email */
    TriggerEvents['ReconciliationCompletedEmail'] = 'reconciliation_completed_email'
    /** AI daily question limit reached in-app */
    TriggerEvents['AIQuestionLimitInApp'] = 'ai_question_limit_in_app'
    /** AI daily question limit reached email */
    TriggerEvents['AIQuestionLimitEmail'] = 'ai_question_limit_email'
    /** AI knowledge base updated in-app */
    TriggerEvents['AIKnowledgeBaseInApp'] = 'ai_knowledge_base_in_app'
    /** AI knowledge base updated email */
    TriggerEvents['AIKnowledgeBaseEmail'] = 'ai_knowledge_base_email'
    /** AI conversation history cleanup in-app */
    TriggerEvents['AIHistoryCleanupInApp'] = 'ai_history_cleanup_in_app'
    /** AI conversation history cleanup email */
    TriggerEvents['AIHistoryCleanupEmail'] = 'ai_history_cleanup_email'
    /** Lead stage change notification in-app */
    TriggerEvents['LeadStageChangeInApp'] = 'lead_stage_change_in_app'
    /** Lead stage change email */
    TriggerEvents['LeadStageChangeEmail'] = 'lead_stage_change_email'
    /** Lead assignment notification in-app */
    TriggerEvents['LeadAssignmentInApp'] = 'lead_assignment_in_app'
    /** Lead assignment email */
    TriggerEvents['LeadAssignmentEmail'] = 'lead_assignment_email'
    /** Lead task due notification in-app */
    TriggerEvents['LeadTaskDueInApp'] = 'lead_task_due_in_app'
    /** Lead task due email */
    TriggerEvents['LeadTaskDueEmail'] = 'lead_task_due_email'
    /** Lead follow-up reminder in-app */
    TriggerEvents['LeadFollowUpInApp'] = 'lead_follow_up_in_app'
    /** Lead follow-up reminder email */
    TriggerEvents['LeadFollowUpEmail'] = 'lead_follow_up_email'
})(TriggerEvents || (exports.TriggerEvents = TriggerEvents = {}))
/**
 * @enum {string}
 * @description Types of notifications that can be sent
 */
var NotificationTypes
;(function (NotificationTypes) {
    /** Single transaction notification */
    NotificationTypes['Transaction'] = 'transaction'
    /** Multiple transactions notification */
    NotificationTypes['Transactions'] = 'transactions'
    /** Inbox notification */
    NotificationTypes['Inbox'] = 'inbox'
    /** Match notification */
    NotificationTypes['Match'] = 'match'
    /** Invoice notification */
    NotificationTypes['Invoice'] = 'invoice'
    /** App lifecycle notifications (creation, updates) */
    NotificationTypes['App'] = 'app'
    /** App configuration changes */
    NotificationTypes['AppConfig'] = 'app_config'
    /** App settings changes */
    NotificationTypes['AppSettings'] = 'app_settings'
    /** App user permission changes */
    NotificationTypes['AppPermissions'] = 'app_permissions'
    /** App usage and limits */
    NotificationTypes['AppUsage'] = 'app_usage'
    /** Financial settings and alerts */
    NotificationTypes['Financial'] = 'financial'
    /** Currency and exchange rate notifications */
    NotificationTypes['Currency'] = 'currency'
    /** Payment provider notifications */
    NotificationTypes['PaymentProvider'] = 'payment_provider'
    /** Bank sync and reconciliation */
    NotificationTypes['BankSync'] = 'bank_sync'
    /** Balance and transaction alerts */
    NotificationTypes['BalanceAlert'] = 'balance_alert'
    /** Stripe integration notifications */
    NotificationTypes['StripeAccount'] = 'stripe_account'
    /** AI assistant usage and limits */
    NotificationTypes['AIUsage'] = 'ai_usage'
    /** AI knowledge base updates */
    NotificationTypes['AIKnowledgeBase'] = 'ai_knowledge_base'
    /** AI conversation management */
    NotificationTypes['AIConversation'] = 'ai_conversation'
    /** Lead stage and status updates */
    NotificationTypes['LeadStatus'] = 'lead_status'
    /** Lead assignment notifications */
    NotificationTypes['LeadAssignment'] = 'lead_assignment'
    /** Lead task management */
    NotificationTypes['LeadTask'] = 'lead_task'
    /** Lead follow-up reminders */
    NotificationTypes['LeadFollowUp'] = 'lead_follow_up'
    /** Lead engagement alerts */
    NotificationTypes['LeadEngagement'] = 'lead_engagement'
})(NotificationTypes || (exports.NotificationTypes = NotificationTypes = {}))
/**
 * Triggers a single notification event
 * @async
 * @param {TriggerPayload} data - The notification configuration
 * @returns {Promise<void>}
 * @throws {Error} When the notification fails to send
 */
function trigger(data) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3])
                    return [
                        4 /*yield*/,
                        novu.trigger(data.name, {
                            to: __assign(__assign({}, data.user), {
                                //   Prefix subscriber id with team id
                                subscriberId: ''.concat(data.user.workspaceId, '_').concat(data.user.subscriberId)
                            }),
                            payload: data.payload,
                            tenant: data.tenant,
                            overrides: {
                                email: {
                                    replyTo: data.replyTo,
                                    // @ts-ignore
                                    headers: {
                                        'X-Entity-Ref-ID': (0, nanoid_1.nanoid)()
                                    }
                                }
                            }
                        })
                    ]
                case 1:
                    _a.sent()
                    return [3 /*break*/, 3]
                case 2:
                    error_1 = _a.sent()
                    console.log(error_1)
                    return [3 /*break*/, 3]
                case 3:
                    return [2 /*return*/]
            }
        })
    })
}
/**
 * Triggers multiple notification events in bulk
 * @async
 * @param {TriggerPayload[]} events - Array of notification configurations
 * @returns {Promise<void>}
 * @throws {Error} When the bulk notification operation fails
 */
function triggerBulk(events) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3])
                    return [
                        4 /*yield*/,
                        novu.bulkTrigger(
                            events.map(function (data) {
                                return {
                                    name: data.name,
                                    to: __assign(__assign({}, data.user), {
                                        //   Prefix subscriber id with team id
                                        subscriberId: ''.concat(data.user.workspaceId, '_').concat(data.user.subscriberId)
                                    }),
                                    payload: data.payload,
                                    tenant: data.tenant,
                                    overrides: {
                                        email: {
                                            replyTo: data.replyTo,
                                            headers: {
                                                'X-Entity-Ref-ID': (0, nanoid_1.nanoid)()
                                            }
                                        }
                                    }
                                }
                            })
                        )
                    ]
                case 1:
                    _a.sent()
                    return [3 /*break*/, 3]
                case 2:
                    error_2 = _a.sent()
                    console.log(error_2)
                    return [3 /*break*/, 3]
                case 3:
                    return [2 /*return*/]
            }
        })
    })
}
/**
 * Retrieves notification preferences for a subscriber
 * @async
 * @param {GetSubscriberPreferencesParams} params - Parameters for the request
 * @returns {Promise<Object>} The subscriber's notification preferences
 */
function getSubscriberPreferences(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var response
        var subscriberId = _b.subscriberId,
            workspaceId = _b.workspaceId
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        fetch(
                            ''
                                .concat(API_ENDPOINT, '/subscribers/')
                                .concat(workspaceId, '_')
                                .concat(subscriberId, '/preferences?includeInactiveChannels=false'),
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: 'ApiKey '.concat(process.env.NOVU_API_KEY)
                                }
                            }
                        )
                    ]
                case 1:
                    response = _c.sent()
                    return [2 /*return*/, response.json()]
            }
        })
    })
}
/**
 * Updates notification preferences for a subscriber
 * @async
 * @param {UpdateSubscriberPreferenceParams} params - Parameters for the update
 * @returns {Promise<Object>} The updated subscriber preferences
 */
function updateSubscriberPreference(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var response
        var subscriberId = _b.subscriberId,
            workspaceId = _b.workspaceId,
            templateId = _b.templateId,
            type = _b.type,
            enabled = _b.enabled
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        fetch(
                            ''
                                .concat(API_ENDPOINT, '/subscribers/')
                                .concat(workspaceId, '_')
                                .concat(subscriberId, '/preferences/')
                                .concat(templateId),
                            {
                                method: 'PATCH',
                                headers: {
                                    Authorization: 'ApiKey '.concat(process.env.NOVU_API_KEY),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    channel: {
                                        type: type,
                                        enabled: enabled
                                    }
                                })
                            }
                        )
                    ]
                case 1:
                    response = _c.sent()
                    return [2 /*return*/, response.json()]
            }
        })
    })
}
