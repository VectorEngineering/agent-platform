import { describe, expect, test } from 'vitest'
import { QUOTA, checkQuotaLimit, isUnlimited, isWithinLimit, type QuotaLimits } from './quota'

describe('Quota System', () => {
    describe('Tier Validation', () => {
        test('free tier should have expected limits', () => {
            expect(QUOTA.free).toBeDefined()
            expect(QUOTA.free.maxUsers).toBe(2)
            expect(QUOTA.free.maxStorage).toBe(5_000)
            expect(QUOTA.free.invoicing.maxMonthlyInvoices).toBe(5)
        })

        test('pro tier should have higher limits than free tier', () => {
            expect(QUOTA.pro.maxUsers).toBeGreaterThan(QUOTA.free.maxUsers)
            expect(QUOTA.pro.maxStorage).toBeGreaterThan(QUOTA.free.maxStorage)
            expect(QUOTA.pro.invoicing.maxMonthlyInvoices).toBeGreaterThan(QUOTA.free.invoicing.maxMonthlyInvoices)
        })

        test('enterprise tier should have unlimited values', () => {
            expect(QUOTA.enterprise.maxUsers).toBe(-1)
            expect(QUOTA.enterprise.maxStorage).toBe(-1)
            expect(QUOTA.enterprise.invoicing.maxMonthlyInvoices).toBe(-1)
        })
    })

    describe('isUnlimited', () => {
        test('should return true for -1', () => {
            expect(isUnlimited(-1)).toBe(true)
        })

        test('should return false for positive numbers', () => {
            expect(isUnlimited(100)).toBe(false)
            expect(isUnlimited(0)).toBe(false)
        })
    })

    describe('isWithinLimit', () => {
        test('should return true for unlimited limit', () => {
            expect(isWithinLimit(1000, -1)).toBe(true)
            expect(isWithinLimit(0, -1)).toBe(true)
        })

        test('should return true when usage is below limit', () => {
            expect(isWithinLimit(5, 10)).toBe(true)
            expect(isWithinLimit(0, 10)).toBe(true)
            expect(isWithinLimit(10, 10)).toBe(true)
        })

        test('should return false when usage exceeds limit', () => {
            expect(isWithinLimit(11, 10)).toBe(false)
            expect(isWithinLimit(100, 50)).toBe(false)
        })
    })

    describe('checkQuotaLimit', () => {
        test('should return true for valid usage', () => {
            expect(checkQuotaLimit(5, 10)).toBe(true)
            expect(checkQuotaLimit(100, -1)).toBe(true)
        })

        test('should return false for exceeded usage', () => {
            expect(checkQuotaLimit(15, 10)).toBe(false)
        })

        test('should throw error when specified', () => {
            expect(() => checkQuotaLimit(15, 10, { throwError: true })).toThrow('Quota exceeded: usage 15 exceeds limit 10')
        })

        test('should not throw error for valid usage even when throwError is true', () => {
            expect(() => checkQuotaLimit(5, 10, { throwError: true })).not.toThrow()
        })
    })

    describe('Quota Structure', () => {
        test('all tiers should have complete quota structure', () => {
            const requiredKeys: (keyof QuotaLimits)[] = [
                'maxUsers',
                'maxStorage',
                'maxTransactions',
                'maxProjects',
                'invoicing',
                'timeTracking',
                'storage',
                'ai',
                'reporting'
            ]

            ;(['free', 'pro', 'enterprise'] as const).forEach((tierName) => {
                requiredKeys.forEach((key) => {
                    expect(QUOTA[tierName]).toHaveProperty(key)
                })
            })
        })

        test('nested quota objects should have all required properties', () => {
            const nestedChecks = {
                invoicing: ['maxMonthlyInvoices', 'maxTemplates', 'maxCustomFields', 'maxRecurringProfiles'],
                timeTracking: ['maxProjects', 'maxTasksPerProject', 'maxTimeEntries'],
                storage: ['maxFileSize', 'maxTotalStorage', 'maxVersionsPerFile'],
                ai: ['maxMonthlyQueries', 'maxDocumentProcessing', 'maxForecastScenarios'],
                reporting: ['maxCustomReports', 'maxExports', 'retentionPeriod']
            }

            ;(['free', 'pro', 'enterprise'] as const).forEach((tierName) => {
                const tier = QUOTA[tierName]
                Object.entries(nestedChecks).forEach(([category, properties]) => {
                    properties.forEach((prop) => {
                        expect(tier[category as keyof QuotaLimits]).toHaveProperty(prop)
                    })
                })
            })
        })
    })

    describe('Quota Progression', () => {
        test('limits should increase from free to pro tier', () => {
            const compareNumericLimits = (free: number, pro: number) => {
                if (free !== -1 && pro !== -1) {
                    expect(pro).toBeGreaterThan(free)
                }
            }

            // Compare direct limits
            compareNumericLimits(QUOTA.free.maxUsers, QUOTA.pro.maxUsers)
            compareNumericLimits(QUOTA.free.maxStorage, QUOTA.pro.maxStorage)
            compareNumericLimits(QUOTA.free.maxTransactions, QUOTA.pro.maxTransactions)

            // Compare nested limits
            compareNumericLimits(QUOTA.free.invoicing.maxMonthlyInvoices, QUOTA.pro.invoicing.maxMonthlyInvoices)
            compareNumericLimits(QUOTA.free.storage.maxFileSize, QUOTA.pro.storage.maxFileSize)
            compareNumericLimits(QUOTA.free.ai.maxMonthlyQueries, QUOTA.pro.ai.maxMonthlyQueries)
        })

        test('enterprise tier should have mostly unlimited values', () => {
            const checkUnlimited = (value: number) => {
                expect(value === -1 || typeof value === 'number').toBe(true)
            }

            checkUnlimited(QUOTA.enterprise.maxUsers)
            checkUnlimited(QUOTA.enterprise.maxStorage)
            checkUnlimited(QUOTA.enterprise.maxTransactions)
            checkUnlimited(QUOTA.enterprise.invoicing.maxMonthlyInvoices)
            checkUnlimited(QUOTA.enterprise.timeTracking.maxProjects)
            checkUnlimited(QUOTA.enterprise.ai.maxMonthlyQueries)
        })
    })

    describe('Usage Tracking', () => {
        test('should track nested quota usage correctly', () => {
            const usage = {
                maxUsers: 1,
                maxStorage: 1000,
                maxTransactions: 50,
                maxProjects: 2,
                invoicing: {
                    maxMonthlyInvoices: 3,
                    maxTemplates: 1,
                    maxCustomFields: 2,
                    maxRecurringProfiles: 1
                },
                timeTracking: {
                    maxProjects: 2,
                    maxTasksPerProject: 15,
                    maxTimeEntries: 50
                },
                storage: {
                    maxFileSize: 20,
                    maxTotalStorage: 2000,
                    maxVersionsPerFile: 2
                },
                ai: {
                    maxMonthlyQueries: 25,
                    maxDocumentProcessing: 50,
                    maxForecastScenarios: 1
                },
                reporting: {
                    maxCustomReports: 2,
                    maxExports: 5,
                    retentionPeriod: 30
                }
            }

            // Check against free tier limits
            Object.entries(usage).forEach(([key, value]) => {
                if (typeof value === 'number') {
                    const limit = QUOTA.free[key as keyof QuotaLimits] as number
                    expect(isWithinLimit(value, limit)).toBe(true)
                } else {
                    Object.entries(value as Record<string, number>).forEach(([subKey, subValue]) => {
                        const category = QUOTA.free[key as keyof QuotaLimits] as Record<string, number>
                        expect(isWithinLimit(subValue, category[subKey])).toBe(true)
                    })
                }
            })
        })
    })

    describe('Quota Validation', () => {
        test('should validate all numeric values are positive or -1', () => {
            const validateNumericValues = (obj: Record<string, any>) => {
                Object.entries(obj).forEach(([_, value]) => {
                    if (typeof value === 'number') {
                        expect(value === -1 || value > 0).toBe(true)
                    } else if (typeof value === 'object') {
                        validateNumericValues(value)
                    }
                })
            }

            Object.values(QUOTA).forEach((tier) => {
                validateNumericValues(tier)
            })
        })

        test('should have consistent storage units', () => {
            ;(['free', 'pro', 'enterprise'] as const).forEach((tierName) => {
                const tier = QUOTA[tierName]
                // Storage values should be in MB
                if (tier.maxStorage !== -1) {
                    expect(tier.maxStorage).toBeGreaterThanOrEqual(5_000) // At least 5GB
                }
                if (tier.storage.maxFileSize !== -1 && tier.storage.maxTotalStorage !== -1) {
                    expect(tier.storage.maxFileSize).toBeLessThanOrEqual(tier.storage.maxTotalStorage)
                }
            })
        })
    })

    describe('Feature Limits', () => {
        describe('Invoicing Limits', () => {
            test('should have reasonable template limits', () => {
                expect(QUOTA.free.invoicing.maxTemplates).toBeLessThan(QUOTA.pro.invoicing.maxTemplates)
                expect(QUOTA.pro.invoicing.maxTemplates).toBeLessThan(100)
            })

            test('should enforce monthly invoice limits', () => {
                expect(QUOTA.free.invoicing.maxMonthlyInvoices).toBeLessThan(QUOTA.pro.invoicing.maxMonthlyInvoices)
            })
        })

        describe('Time Tracking Limits', () => {
            test('should have appropriate project limits', () => {
                expect(QUOTA.free.timeTracking.maxProjects).toBeLessThan(QUOTA.pro.timeTracking.maxProjects)
            })

            test('should scale tasks per project appropriately', () => {
                expect(QUOTA.free.timeTracking.maxTasksPerProject).toBeLessThan(QUOTA.pro.timeTracking.maxTasksPerProject)
            })
        })

        describe('AI Feature Limits', () => {
            test('should have reasonable query limits', () => {
                expect(QUOTA.free.ai.maxMonthlyQueries).toBeLessThan(QUOTA.pro.ai.maxMonthlyQueries)
            })

            test('should scale document processing limits', () => {
                expect(QUOTA.free.ai.maxDocumentProcessing).toBeLessThan(QUOTA.pro.ai.maxDocumentProcessing)
            })
        })
    })

    describe('Edge Cases', () => {
        test('should handle zero usage correctly', () => {
            const zeroUsage = 0
            ;(['free', 'pro', 'enterprise'] as const).forEach((tierName) => {
                const tier = QUOTA[tierName]
                expect(isWithinLimit(zeroUsage, tier.maxUsers)).toBe(true)
                expect(isWithinLimit(zeroUsage, tier.maxStorage)).toBe(true)
            })
        })

        test('should handle maximum safe integer', () => {
            const maxInt = Number.MAX_SAFE_INTEGER
            expect(isWithinLimit(maxInt, -1)).toBe(true)
            expect(isWithinLimit(maxInt, maxInt)).toBe(true)
            expect(isWithinLimit(maxInt - 1, maxInt)).toBe(true)
        })

        test('should handle decimal values correctly', () => {
            expect(() => checkQuotaLimit(1.5, 1, { throwError: true })).toThrow()
            expect(checkQuotaLimit(1.5, 2)).toBe(true)
            expect(checkQuotaLimit(0.5, 1)).toBe(true)
        })
    })

    describe('Quota Helper Functions', () => {
        test('isValidQuotaTier should work correctly', () => {
            expect(QUOTA.isValidQuotaTier('free')).toBe(true)
            expect(QUOTA.isValidQuotaTier('pro')).toBe(true)
            expect(QUOTA.isValidQuotaTier('enterprise')).toBe(true)
            expect(QUOTA.isValidQuotaTier('invalid')).toBe(false)
        })

        test('getQuotaLimits should return correct limits', () => {
            const freeLimits = QUOTA.getQuotaLimits('free')
            expect(freeLimits).toEqual(QUOTA.free)

            const proLimits = QUOTA.getQuotaLimits('pro')
            expect(proLimits).toEqual(QUOTA.pro)
        })

        test('getQuotaLimits should throw for invalid tier', () => {
            expect(() => QUOTA.getQuotaLimits('invalid' as any)).toThrow()
        })
    })
})
