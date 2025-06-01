import { PlaidAccountTransaction } from 'client-typescript-sdk'
import TransactionAnalyzer from './small-business-transaction-analyzer'

describe('TransactionAnalyzer', () => {
    // Mock data setup
    const mockTransactions: PlaidAccountTransaction[] = [
        {
            amount: 1000,
            currentDate: new Date('2024-03-06'),
            personalFinanceCategoryDetailed: 'TRANSFER_IN_DEPOSIT',
            merchantName: 'Bank Transfer'
        },
        {
            amount: 500,
            currentDate: new Date('2024-03-06'),
            personalFinanceCategoryDetailed: 'LOAN_PAYMENTS_CREDIT_CARD_PAYMENT',
            merchantName: 'Credit Card Payment'
        },
        {
            amount: 200,
            currentDate: new Date('2024-03-07'),
            personalFinanceCategoryDetailed: 'GENERAL_MERCHANDISE_DISCOUNT_STORES',
            merchantName: 'Wholesale Store'
        },
        {
            amount: 2000,
            currentDate: new Date('2024-03-07'),
            personalFinanceCategoryDetailed: 'INCOME_WAGES',
            merchantName: 'Employer Inc'
        },
        {
            amount: 300,
            currentDate: new Date('2024-03-08'),
            personalFinanceCategoryDetailed: 'RENT_AND_UTILITIES_RENT',
            merchantName: 'Property Management'
        }
    ]

    let analyzer: TransactionAnalyzer

    beforeEach(() => {
        analyzer = new TransactionAnalyzer(mockTransactions)
    })

    describe('Financial Metrics Computation', () => {
        test('computes all financial metrics correctly', () => {
            const metrics = analyzer.computeFinancialMetrics()

            expect(metrics).toEqual({
                currentAssets: 1000, // TRANSFER_IN_DEPOSIT
                currentLiabilities: 500, // LOAN_PAYMENTS_CREDIT_CARD_PAYMENT
                costOfGoodsSold: 200, // GENERAL_MERCHANDISE_DISCOUNT_STORES
                revenue: 2000, // INCOME_WAGES
                expenses: 300 // RENT_AND_UTILITIES_RENT
            })
        })

        test('computes current assets correctly', () => {
            const metrics = analyzer.computeFinancialMetrics()
            expect(metrics.currentAssets).toBe(1000)
        })

        test('computes current liabilities correctly', () => {
            const metrics = analyzer.computeFinancialMetrics()
            expect(metrics.currentLiabilities).toBe(500)
        })

        test('computes cost of goods sold correctly', () => {
            const metrics = analyzer.computeFinancialMetrics()
            expect(metrics.costOfGoodsSold).toBe(200)
        })

        test('computes revenue correctly', () => {
            const metrics = analyzer.computeFinancialMetrics()
            expect(metrics.revenue).toBe(2000)
        })

        test('computes expenses correctly', () => {
            const metrics = analyzer.computeFinancialMetrics()
            expect(metrics.expenses).toBe(300)
        })
    })

    describe('Date Range Filtering', () => {
        test('filters transactions by date range correctly', () => {
            const filteredTransactions = analyzer.getTransactionsInDateRange(new Date('2024-03-06'), new Date('2024-03-07'))

            expect(filteredTransactions).toHaveLength(4)
            expect(filteredTransactions.map((t) => t.merchantName)).toEqual([
                'Bank Transfer',
                'Credit Card Payment',
                'Wholesale Store',
                'Employer Inc'
            ])
        })

        test('returns empty array when no transactions in date range', () => {
            const filteredTransactions = analyzer.getTransactionsInDateRange(new Date('2024-03-01'), new Date('2024-03-05'))

            expect(filteredTransactions).toHaveLength(0)
        })

        test('includes transactions on range boundaries', () => {
            const filteredTransactions = analyzer.getTransactionsInDateRange(new Date('2024-03-06'), new Date('2024-03-06'))

            expect(filteredTransactions).toHaveLength(2)
            expect(filteredTransactions.map((t) => t.merchantName)).toEqual(['Bank Transfer', 'Credit Card Payment'])
        })
    })

    describe('Metric Change Calculation', () => {
        test('computes metric change between two periods correctly', () => {
            const change = analyzer.computeMetricChange(
                'revenue',
                new Date('2024-03-06'),
                new Date('2024-03-06'),
                new Date('2024-03-07'),
                new Date('2024-03-07')
            )

            expect(change).toBe(2000) // Second period revenue (2000) - First period revenue (0)
        })

        test('handles periods with no transactions', () => {
            const change = analyzer.computeMetricChange(
                'expenses',
                new Date('2024-03-01'),
                new Date('2024-03-02'),
                new Date('2024-03-03'),
                new Date('2024-03-04')
            )

            expect(change).toBe(0)
        })
    })

    describe('Edge Cases', () => {
        test('handles empty transaction list', () => {
            const emptyAnalyzer = new TransactionAnalyzer([])
            const metrics = emptyAnalyzer.computeFinancialMetrics()

            expect(metrics).toEqual({
                currentAssets: 0,
                currentLiabilities: 0,
                costOfGoodsSold: 0,
                revenue: 0,
                expenses: 0
            })
        })

        test('handles transactions with undefined amounts', () => {
            const transactionsWithUndefined: PlaidAccountTransaction[] = [
                {
                    currentDate: new Date('2024-03-06'),
                    personalFinanceCategoryDetailed: 'INCOME_WAGES',
                    merchantName: 'Employer Inc'
                },
                {
                    amount: 500,
                    currentDate: new Date('2024-03-06'),
                    personalFinanceCategoryDetailed: 'INCOME_WAGES',
                    merchantName: 'Employer Inc'
                }
            ]

            const undefinedAnalyzer = new TransactionAnalyzer(transactionsWithUndefined)
            const metrics = undefinedAnalyzer.computeFinancialMetrics()

            expect(metrics.revenue).toBe(500) // Should only count the transaction with defined amount
        })

        test('handles transactions with missing categories', () => {
            const transactionsWithoutCategories: PlaidAccountTransaction[] = [
                {
                    amount: 1000,
                    currentDate: new Date('2024-03-06'),
                    merchantName: 'Unknown Transaction'
                }
            ]

            const uncategorizedAnalyzer = new TransactionAnalyzer(transactionsWithoutCategories)
            const metrics = uncategorizedAnalyzer.computeFinancialMetrics()

            expect(metrics).toEqual({
                currentAssets: 0,
                currentLiabilities: 0,
                costOfGoodsSold: 0,
                revenue: 0,
                expenses: 0
            })
        })

        test('handles transactions with missing dates', () => {
            const transactionsWithoutDates: PlaidAccountTransaction[] = [
                {
                    amount: 1000,
                    personalFinanceCategoryDetailed: 'INCOME_WAGES',
                    merchantName: 'Employer Inc'
                }
            ]

            const noDateAnalyzer = new TransactionAnalyzer(transactionsWithoutDates)
            const filteredTransactions = noDateAnalyzer.getTransactionsInDateRange(new Date('2024-03-06'), new Date('2024-03-07'))

            expect(filteredTransactions).toHaveLength(0)
        })
    })
})
