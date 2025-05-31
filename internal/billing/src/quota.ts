/**
 * Represents a limit value that can be either a specific number or unlimited (-1)
 * @typedef {number | -1} Limit
 */
type Limit = number | -1 // -1 represents unlimited

/**
 * Comprehensive quota limits structure for the financial management platform
 * @interface QuotaLimits
 */
export type QuotaLimits = {
    /** Maximum number of users allowed in the account */
    maxUsers: Limit
    /** Maximum storage space in megabytes */
    maxStorage: Limit
    /** Maximum number of transactions allowed per billing period */
    maxTransactions: Limit
    /** Maximum number of concurrent projects */
    maxProjects: Limit

    /** Invoicing feature limits */
    invoicing: {
        /** Maximum number of invoices that can be created per month */
        maxMonthlyInvoices: Limit
        /** Maximum number of custom invoice templates */
        maxTemplates: Limit
        /** Maximum number of custom fields per invoice */
        maxCustomFields: Limit
        /** Maximum number of recurring invoice profiles */
        maxRecurringProfiles: Limit
    }

    /** Time tracking feature limits */
    timeTracking: {
        /** Maximum number of concurrent projects for time tracking */
        maxProjects: Limit
        /** Maximum number of tasks allowed per project */
        maxTasksPerProject: Limit
        /** Maximum number of time entries per billing period */
        maxTimeEntries: Limit
    }

    /** Storage feature limits */
    storage: {
        /** Maximum size of a single file in megabytes */
        maxFileSize: Limit
        /** Maximum total storage space in megabytes */
        maxTotalStorage: Limit
        /** Maximum number of versions kept per file */
        maxVersionsPerFile: Limit
    }

    /** AI feature limits */
    ai: {
        /** Maximum number of AI queries per month */
        maxMonthlyQueries: Limit
        /** Maximum number of documents processed by AI per month */
        maxDocumentProcessing: Limit
        /** Maximum number of forecast scenarios that can be generated */
        maxForecastScenarios: Limit
    }

    /** Reporting feature limits */
    reporting: {
        /** Maximum number of custom reports that can be created */
        maxCustomReports: Limit
        /** Maximum number of report exports per month */
        maxExports: Limit
        /** Number of days that reports are retained */
        retentionPeriod: Limit
    }
}

/**
 * Checks if a limit value represents unlimited
 * @param {Limit} limit - The limit value to check
 * @returns {boolean} True if the limit is unlimited (-1)
 */
export const isUnlimited = (limit: Limit): boolean => limit === -1

/**
 * Validates if a usage amount is within the specified limit
 * @param {number} usage - The current usage amount
 * @param {Limit} limit - The limit to check against
 * @returns {boolean} True if usage is within limit or if limit is unlimited
 */
export const isWithinLimit = (usage: number, limit: Limit): boolean => isUnlimited(limit) || usage <= limit

type QuotaTiers = {
    free: QuotaLimits
    pro: QuotaLimits
    enterprise: QuotaLimits
}

export const QUOTA: QuotaTiers & {
    isValidQuotaTier: (tier: string) => tier is keyof QuotaTiers
    getQuotaLimits: (tier: keyof QuotaTiers) => QuotaLimits
} = {
    free: {
        maxUsers: 2,
        maxStorage: 5_000, // 5GB
        maxTransactions: 100,
        maxProjects: 3,

        invoicing: {
            maxMonthlyInvoices: 5,
            maxTemplates: 2,
            maxCustomFields: 3,
            maxRecurringProfiles: 1
        },

        timeTracking: {
            maxProjects: 3,
            maxTasksPerProject: 20,
            maxTimeEntries: 100
        },

        storage: {
            maxFileSize: 25, // 25MB
            maxTotalStorage: 5_000, // 5GB
            maxVersionsPerFile: 3
        },

        ai: {
            maxMonthlyQueries: 50,
            maxDocumentProcessing: 100,
            maxForecastScenarios: 2
        },

        reporting: {
            maxCustomReports: 3,
            maxExports: 10,
            retentionPeriod: 90
        }
    },

    pro: {
        maxUsers: 10,
        maxStorage: 100_000, // 100GB
        maxTransactions: 10_000,
        maxProjects: 50,

        invoicing: {
            maxMonthlyInvoices: 500,
            maxTemplates: 20,
            maxCustomFields: 50,
            maxRecurringProfiles: 50
        },

        timeTracking: {
            maxProjects: 50,
            maxTasksPerProject: 500,
            maxTimeEntries: 10_000
        },

        storage: {
            maxFileSize: 500, // 500MB
            maxTotalStorage: 100_000, // 100GB
            maxVersionsPerFile: 50
        },

        ai: {
            maxMonthlyQueries: 5_000,
            maxDocumentProcessing: 10_000,
            maxForecastScenarios: 50
        },

        reporting: {
            maxCustomReports: 50,
            maxExports: 1_000,
            retentionPeriod: 365
        }
    },

    enterprise: {
        maxUsers: -1, // Unlimited
        maxStorage: -1, // Unlimited
        maxTransactions: -1, // Unlimited
        maxProjects: -1, // Unlimited

        invoicing: {
            maxMonthlyInvoices: -1,
            maxTemplates: -1,
            maxCustomFields: -1,
            maxRecurringProfiles: -1
        },

        timeTracking: {
            maxProjects: -1,
            maxTasksPerProject: -1,
            maxTimeEntries: -1
        },

        storage: {
            maxFileSize: 2_000, // 2GB max file size for practical reasons
            maxTotalStorage: -1,
            maxVersionsPerFile: -1
        },

        ai: {
            maxMonthlyQueries: -1,
            maxDocumentProcessing: -1,
            maxForecastScenarios: -1
        },

        reporting: {
            maxCustomReports: -1,
            maxExports: -1,
            retentionPeriod: 3650 // 10 years
        }
    },

    isValidQuotaTier: (tier: string): tier is keyof QuotaTiers => tier in QUOTA && tier !== 'isValidQuotaTier' && tier !== 'getQuotaLimits',
    getQuotaLimits: (tier: keyof QuotaTiers): QuotaLimits => {
        if (tier !== 'free' && tier !== 'pro' && tier !== 'enterprise') {
            throw new Error('Invalid tier')
        }
        return QUOTA[tier]
    }
}

/**
 * Type guard to check if a string is a valid quota tier
 * @param {string} tier - The tier name to check
 * @returns {boolean} True if the tier exists in QUOTA
 * @example
 * if (isValidQuotaTier('pro')) {
 *   // TypeScript knows tier is 'free' | 'pro' | 'enterprise'
 * }
 */
export const isValidQuotaTier = (tier: string): tier is keyof typeof QUOTA => tier in QUOTA

/**
 * Retrieves quota limits for a specific tier
 * @param {keyof typeof QUOTA} tier - The subscription tier
 * @returns {QuotaLimits} The quota limits for the specified tier
 * @throws {Error} If the tier doesn't exist
 */
export const getQuotaLimits = (tier: keyof typeof QUOTA): QuotaLimits => QUOTA[tier] as QuotaLimits

/**
 * Validates usage against a limit with optional error throwing
 * @param {number} usage - The current usage amount
 * @param {Limit} limit - The limit to check against
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.throwError] - Whether to throw an error if limit is exceeded
 * @returns {boolean} True if usage is within limit
 * @throws {Error} If usage exceeds limit and throwError is true
 * @example
 * checkQuotaLimit(150, 100, { throwError: true }); // throws Error
 */
export const checkQuotaLimit = (usage: number, limit: Limit, options?: { throwError?: boolean }): boolean => {
    const withinLimit = isWithinLimit(usage, limit)
    if (!withinLimit && options?.throwError) {
        throw new Error(`Quota exceeded: usage ${usage} exceeds limit ${limit}`)
    }
    return withinLimit
}

/**
 * Type for tracking actual usage against quota limits
 * Converts all Limit types to number since usage is always a finite number
 * @interface QuotaUsage
 */
export type QuotaUsage = {
    [K in keyof QuotaLimits]: QuotaLimits[K] extends number
        ? number
        : QuotaLimits[K] extends object
          ? { [P in keyof QuotaLimits[K]]: number }
          : never
}
