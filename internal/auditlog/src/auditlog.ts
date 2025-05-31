import { z } from 'zod'

export const unkeyAuditLogEvents = z.enum([
    // Workspace Management
    'workspace.create',
    'workspace.update',
    'workspace.delete',
    'workspace.opt_in',

    // Budget & Spend Management
    'budget.create',
    'budget.update',
    'budget.delete',
    'budget.threshold_reached',
    'budget.overspend',
    'budget.reset',
    'budget.approval_required',
    'budget.approval_granted',
    'budget.approval_denied',

    // Spend Controls
    'spend_limit.create',
    'spend_limit.update',
    'spend_limit.delete',
    'spend_limit.exceeded',
    'spend_limit.reset',
    'spend_limit.temporary_increase',
    'spend_limit.bulk_update',

    // Alerts & Notifications
    'spend_alert.create',
    'spend_alert.update',
    'spend_alert.triggered',
    'spend_alert.acknowledged',
    'spend_alert.resolved',
    'spend_alert.snoozed',

    // Payment Methods
    'payment_method.create',
    'payment_method.update',
    'payment_method.delete',
    'payment_method.verify',
    'payment_method.set_default',
    'payment_method.expire_soon',
    'payment_method.expired',

    // Transactions
    'transaction.create',
    'transaction.update',
    'transaction.void',
    'transaction.refund',
    'transaction.dispute_opened',
    'transaction.dispute_resolved',
    'transaction.categorize',
    'transaction.split',
    'transaction.merge',
    'transaction.flag_suspicious',

    // Billing
    'billing_period.start',
    'billing_period.end',
    'billing.invoice_generated',
    'billing.invoice_paid',
    'billing.invoice_overdue',
    'billing.credit_applied',
    'billing.subscription_changed',

    // API & Usage
    'api.create',
    'api.update',
    'api.delete',
    'api.spend_limit_reached',
    'api.usage_threshold_reached',
    'api.rate_limit_exceeded',
    'api.deprecation_warning',
    'api.version_upgrade',

    // API Keys
    'key.create',
    'key.update',
    'key.delete',
    'key.rotate',
    'key.compromise_reported',
    'key.spend_limit_reached',
    'key.usage_threshold_reached',
    'key.disable_for_billing',
    'key.enable_after_payment',
    'key.temporary_access_granted',

    // Team & Access Management
    'team_member.invite',
    'team_member.join',
    'team_member.remove',
    'team_member.role_change',
    'team_member.spending_limit_changed',
    'team_member.approval_rights_changed',

    // Compliance & Security
    'compliance.audit_started',
    'compliance.audit_completed',
    'compliance.policy_violation',
    'compliance.report_generated',
    'security.suspicious_activity',
    'security.location_change',
    'security.mfa_enabled',
    'security.mfa_disabled',

    // Integrations
    'integration.connect',
    'integration.disconnect',
    'integration.sync_started',
    'integration.sync_completed',
    'integration.sync_failed',
    'integration.data_import',
    'integration.data_export',

    // Existing events...
    'gateway.create',
    'llmGateway.create',
    'llmGateway.delete',
    'api.create',
    'api.update',
    'api.delete',
    'key.create',
    'key.update',
    'key.delete',
    'ratelimitNamespace.create',
    'ratelimitNamespace.update',
    'ratelimitNamespace.delete',
    'vercelIntegration.create',
    'vercelIntegration.update',
    'vercelIntegration.delete',
    'vercelBinding.create',
    'vercelBinding.update',
    'vercelBinding.delete',
    'role.create',
    'role.update',
    'role.delete',
    'permission.create',
    'permission.update',
    'permission.delete',
    'authorization.connect_role_and_permission',
    'authorization.disconnect_role_and_permissions',
    'authorization.connect_role_and_key',
    'authorization.disconnect_role_and_key',
    'authorization.connect_permission_and_key',
    'authorization.disconnect_permission_and_key',
    'secret.create',
    'secret.decrypt',
    'secret.update',
    'webhook.create',
    'webhook.update',
    'webhook.delete',
    'reporter.create',
    'identity.create',
    'identity.update',
    'identity.delete',
    'ratelimit.create',
    'ratelimit.update',
    'ratelimit.delete',
    'ratelimit.set_override',
    'ratelimit.read_override',
    'ratelimit.delete_override',
    'auditLogBucket.create',

    // API Analytics & Performance
    'api.latency_threshold_exceeded',
    'api.error_rate_spike',
    'api.availability_drop',
    'api.concurrent_requests_threshold',
    'api.bandwidth_threshold_exceeded',
    'api.quota_adjustment',
    'api.circuit_breaker_triggered',
    'api.circuit_breaker_reset',

    // Developer Experience
    'sdk.version_release',
    'sdk.deprecation_notice',
    'sdk.breaking_change',
    'sdk.security_patch',
    'documentation.update',
    'documentation.feedback',
    'example.create',
    'example.update',

    // Platform Health
    'health.service_degradation',
    'health.service_recovery',
    'health.maintenance_scheduled',
    'health.maintenance_started',
    'health.maintenance_completed',
    'health.backup_created',
    'health.backup_restored',

    // Machine Learning Operations
    'model.training_started',
    'model.training_completed',
    'model.deployment',
    'model.performance_degradation',
    'model.version_rollback',
    'model.retraining_triggered',

    // Data Operations
    'data.pipeline_started',
    'data.pipeline_completed',
    'data.pipeline_failed',
    'data.quality_check_failed',
    'data.schema_change',
    'data.retention_policy_applied',

    // Compliance & Governance
    'compliance.data_access_request',
    'compliance.data_deletion_request',
    'compliance.export_generated',
    'compliance.policy_update',
    'compliance.training_completed',
    'compliance.incident_reported',
    'compliance.audit_trail_exported'
])

export const auditLogSchemaV1 = z.object({
    /**
     * The workspace owning this audit log
     */
    workspaceId: z.string().min(1, 'Workspace ID cannot be empty'),

    /**
     * Buckets are used as namespaces for different logs belonging to a single workspace
     */
    bucket: z.string(),
    auditLogId: z.string(),
    event: z.string(),
    description: z.string().optional(),
    time: z.number().default(() => Date.now()),

    // Enhanced meta object with more financial and operational data
    meta: z
        .object({
            // Financial data
            amount: z.number().optional(),
            currency: z.string().optional(),
            billingPeriod: z.string().optional(),
            exchangeRate: z.number().optional(),
            taxAmount: z.number().optional(),
            taxRate: z.number().optional(),

            // Change tracking
            previousValue: z.any().optional(),
            newValue: z.any().optional(),
            changeReason: z.string().optional(),

            // Thresholds and limits
            thresholdType: z.enum(['amount', 'percentage', 'count', 'frequency']).optional(),
            thresholdValue: z.number().optional(),
            thresholdPeriod: z.string().optional(),

            // Status and workflow
            status: z.string().optional(),
            priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
            approvalStatus: z.enum(['pending', 'approved', 'rejected', 'expired']).optional(),
            approvalChain: z.array(z.string()).optional(),

            // Business context
            costCenter: z.string().optional(),
            budgetCode: z.string().optional(),
            departmentId: z.string().optional(),
            projectId: z.string().optional(),

            // API & Performance metrics
            requestCount: z.number().optional(),
            errorCount: z.number().optional(),
            successRate: z.number().optional(),
            p95LatencyMs: z.number().optional(),
            p99LatencyMs: z.number().optional(),
            bandwidthUsage: z.number().optional(),

            // Resource utilization
            cpuUsage: z.number().optional(),
            memoryUsage: z.number().optional(),
            diskUsage: z.number().optional(),
            networkUsage: z.number().optional(),

            // ML/AI specific
            modelVersion: z.string().optional(),
            modelAccuracy: z.number().optional(),
            inferenceTime: z.number().optional(),
            trainingDuration: z.number().optional(),

            // Developer platform
            sdkVersion: z.string().optional(),
            apiVersion: z.string().optional(),
            featureFlags: z.record(z.boolean()).optional(),
            quotaRemaining: z.number().optional(),

            // Ratelimit specific data
            name: z.string().optional(),
            limit: z.number().optional(),
            duration: z.number().optional()
        })
        .passthrough()
        .optional(),

    actor: z.object({
        type: z.enum(['user', 'system', 'api', 'key', 'llm']),
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        role: z.string().optional(),
        department: z.string().optional(),
        meta: z.record(z.union([z.string(), z.number(), z.boolean(), z.null(), z.undefined()])).optional(),
        permissions: z.array(z.string()).optional(),
        authenticationType: z.enum(['password', 'sso', 'mfa', 'api_key', 'oauth']).optional(),

        // Enhanced developer context
        organizationRole: z.string().optional(),
        accessScopes: z.array(z.string()).optional(),
        apiKeyType: z.enum(['test', 'production', 'admin']).optional(),
        lastActiveAt: z.number().optional(),
        verificationStatus: z.enum(['unverified', 'pending', 'verified']).optional(),
        developerTier: z.enum(['free', 'pro', 'enterprise']).optional(),
        customQuotas: z.record(z.number()).optional()
    }),

    resources: z.array(
        z.object({
            type: z.string(),
            id: z.string(),
            name: z.string().optional(),
            meta: z
                .object({
                    // Financial metadata
                    amount: z.number().optional(),
                    currency: z.string().optional(),
                    category: z.string().optional(),
                    status: z.string().optional(),
                    billingPeriod: z.string().optional(),

                    // Resource specific data
                    version: z.string().optional(),
                    tags: z.array(z.string()).optional(),
                    region: z.string().optional(),
                    environment: z.string().optional(),

                    // Dependencies
                    parentId: z.string().optional(),
                    relatedResources: z.array(z.string()).optional(),

                    // Access control
                    visibility: z.enum(['public', 'private', 'restricted']).optional(),
                    accessLevel: z.enum(['read', 'write', 'admin']).optional(),

                    // Lifecycle
                    createdAt: z.number().optional(),
                    updatedAt: z.number().nullable().optional(),
                    expiresAt: z.number().optional(),

                    // API Resource specifics
                    endpoint: z.string().optional(),
                    method: z.string().optional(),
                    rateLimitQuota: z.number().optional(),
                    cacheTTL: z.number().optional(),

                    // Ratelimit specific data
                    name: z.string().optional(),
                    limit: z.number().optional(),
                    duration: z.number().optional(),
                    identityId: z.string().nullable().optional(),
                    keyId: z.string().nullable().optional(),
                    workspaceId: z.string().optional(),

                    // Service metrics
                    uptime: z.number().optional(),
                    healthScore: z.number().optional(),
                    errorBudget: z.number().optional(),
                    slaTarget: z.number().optional(),

                    // Dependencies
                    upstream: z.array(z.string()).optional(),
                    downstream: z.array(z.string()).optional(),
                    externalDependencies: z.array(z.string()).optional(),

                    // Configuration
                    configVersion: z.string().optional(),
                    featureSet: z.array(z.string()).optional(),
                    customDomain: z.string().optional()
                })
                .passthrough()
                .optional()
                .nullable()
        })
    ),

    context: z.object({
        location: z.string(),
        userAgent: z.string().optional(),
        ipAddress: z.string().optional(),
        serviceVersion: z.string().optional(),
        environment: z.enum(['production', 'staging', 'development']).optional(),

        // Enhanced context
        requestId: z.string().optional(),
        sessionId: z.string().optional(),
        correlationId: z.string().optional(),
        traceId: z.string().optional(),

        // Platform context
        platform: z.string().optional(),
        region: z.string().optional(),
        datacenter: z.string().optional(),

        // Client context
        clientVersion: z.string().optional(),
        clientType: z.string().optional(),
        deviceId: z.string().optional(),

        // Security context
        tlsVersion: z.string().optional(),
        cipherSuite: z.string().optional(),
        riskScore: z.number().optional(),

        // Performance metrics
        latency: z.number().optional(),
        requestSize: z.number().optional(),
        responseSize: z.number().optional(),

        // Enhanced debugging context
        debugMode: z.boolean().optional(),
        samplingRate: z.number().optional(),
        logLevel: z.enum(['debug', 'info', 'warn', 'error']).optional(),

        // Request context
        routePattern: z.string().optional(),
        middlewareChain: z.array(z.string()).optional(),
        cachingStrategy: z.string().optional(),

        // Error context
        errorCode: z.string().optional(),
        errorCategory: z.string().optional(),
        stackTrace: z.string().optional(),

        // Performance profiling
        heapUsage: z.number().optional(),
        gcPause: z.number().optional(),
        threadCount: z.number().optional()
    })
})
