import { PlaidAccountTransaction } from 'client-typescript-sdk'
import SmallBusinessAnalytics from './small-business-analytics'

describe('SmallBusinessAnalytics', () => {
    // Mock data setup
    const mockTransactions: PlaidAccountTransaction[] = [
        {
            amount: -100,
            currentDate: new Date('2024-03-06'),
            merchantName: 'Store A',
            pending: false,
            personalFinanceCategoryPrimary: 'Shopping',
            paymentChannel: 'online',
            isoCurrencyCode: 'USD',
            time: new Date('2024-03-06T10:30:00')
        },
        {
            amount: 50,
            currentDate: new Date('2024-03-06'),
            merchantName: 'Store B',
            pending: true,
            personalFinanceCategoryPrimary: 'Bills',
            paymentChannel: 'in store',
            isoCurrencyCode: 'USD',
            time: new Date('2024-03-06T14:15:00')
        },
        {
            amount: -75,
            currentDate: new Date('2024-03-06'),
            merchantName: 'Store A',
            pending: false,
            personalFinanceCategoryPrimary: 'Shopping',
            paymentChannel: 'online',
            isoCurrencyCode: 'EUR',
            time: new Date('2024-03-06T16:45:00')
        }
    ]

    let analytics: SmallBusinessAnalytics

    beforeEach(() => {
        analytics = new SmallBusinessAnalytics(mockTransactions)
    })

    describe('Basic Financial Calculations', () => {
        test('calculates total revenue correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.totalRevenue).toBe(175) // 100 + 75
        })

        test('calculates total expenses correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.totalExpenses).toBe(50)
        })

        test('calculates net profit correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.netProfit).toBe(125) // 175 - 50
        })

        test('calculates profit margin correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.profitMargin).toBeCloseTo(71.43, 2) // (125 / 175) * 100
        })
    })

    describe('Transaction Analysis', () => {
        test('calculates average transaction value correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.averageTransactionValue).toBeCloseTo(75, 2) // (100 + 50 + 75) / 3
        })

        test('identifies most frequent merchant correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.mostFrequentMerchant).toBe('Store A')
        })

        test('counts pending transactions correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.pendingTransactionsCount).toBe(1)
        })

        test('calculates international transactions percentage correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.internationalTransactionsPercentage).toBeCloseTo(33.33, 2) // 1/3 * 100
        })

        test('calculates online transactions percentage correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.onlineTransactionsPercentage).toBeCloseTo(66.67, 2) // 2/3 * 100
        })
    })

    describe('Category Analysis', () => {
        test('identifies top expense category correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.topExpenseCategory).toBe('Bills')
        })

        test('identifies top revenue category correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.topRevenueCategory).toBe('Shopping')
        })

        test('calculates categories distribution correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.categoriesDistribution).toEqual({
                Shopping: 66.67,
                Bills: 33.33
            })
        })
    })

    describe('Time-based Analysis', () => {
        test('calculates average transaction time correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.averageTransactionTime).toBe('13:50') // Average of 10:30, 14:15, and 16:45
        })

        test('calculates transactions per day correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.transactionsPerDay).toBe(3) // 3 transactions on one day
        })

        test('calculates average transactions by day of week correctly', () => {
            const result = analytics.getAnalytics()
            expect(result.averageTransactionsByDayOfWeek).toHaveProperty('Wednesday')
            expect(result.averageTransactionsByDayOfWeek['Wednesday']).toBe(3) // 3 transactions on Wednesday
            expect(result.averageTransactionsByDayOfWeek['Monday']).toBe(0)
            expect(result.averageTransactionsByDayOfWeek['Tuesday']).toBe(0)
            expect(result.averageTransactionsByDayOfWeek['Thursday']).toBe(0)
            expect(result.averageTransactionsByDayOfWeek['Friday']).toBe(0)
            expect(result.averageTransactionsByDayOfWeek['Saturday']).toBe(0)
            expect(result.averageTransactionsByDayOfWeek['Sunday']).toBe(0)
        })
    })

    describe('Date Range Filtering', () => {
        test('filters transactions by date range correctly', () => {
            const result = analytics.getAnalytics(new Date('2024-03-06'), new Date('2024-03-06'))
            expect(result.totalRevenue).toBe(175)
            expect(result.totalExpenses).toBe(50)
        })

        test('returns all transactions when no date range is specified', () => {
            const result = analytics.getAnalytics()
            expect(result.totalRevenue).toBe(175)
            expect(result.totalExpenses).toBe(50)
        })
    })

    describe('Period Comparison', () => {
        test('compares analytics between two periods correctly', () => {
            const comparison = analytics.compareAnalytics(
                new Date('2024-03-06'),
                new Date('2024-03-06'),
                new Date('2024-03-07'),
                new Date('2024-03-07')
            )

            expect(comparison.totalRevenue.period1).toBe(175)
            expect(comparison.totalRevenue.period2).toBe(0)
            expect(comparison.totalExpenses.period1).toBe(50)
            expect(comparison.totalExpenses.period2).toBe(0)
        })
    })

    describe('Edge Cases', () => {
        test('handles empty transaction list', () => {
            const emptyAnalytics = new SmallBusinessAnalytics([])
            const result = emptyAnalytics.getAnalytics()

            expect(result.totalRevenue).toBe(0)
            expect(result.totalExpenses).toBe(0)
            expect(result.netProfit).toBe(0)
            expect(result.profitMargin).toBe(0)
        })

        test('handles transactions with undefined amounts', () => {
            const transactionsWithUndefined: PlaidAccountTransaction[] = [
                {
                    currentDate: new Date('2024-03-01'),
                    merchantName: 'Store A',
                    pending: false
                },
                {
                    amount: 50,
                    currentDate: new Date('2024-03-02'),
                    merchantName: 'Store B',
                    pending: false
                }
            ]

            const undefinedAnalytics = new SmallBusinessAnalytics(transactionsWithUndefined)
            const result = undefinedAnalytics.getAnalytics()

            expect(result.totalRevenue).toBe(0)
            expect(result.totalExpenses).toBe(50)
        })

        test('handles transactions with missing dates', () => {
            const transactionsWithoutDates: PlaidAccountTransaction[] = [
                {
                    amount: -100,
                    merchantName: 'Store A',
                    pending: false
                }
            ]

            const noDateAnalytics = new SmallBusinessAnalytics(transactionsWithoutDates)
            const result = noDateAnalytics.getAnalytics()

            expect(result.transactionsPerDay).toBe(0)
        })
    })
})
