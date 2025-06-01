import { PlaidAccountTransaction } from 'client-typescript-sdk'

/**
 * Represents the financial metrics calculated by the TransactionAnalyzer.
 */
interface FinancialMetrics {
    /** The total value of current assets */
    currentAssets: number
    /** The total value of current liabilities */
    currentLiabilities: number
    /** The total cost of goods sold */
    costOfGoodsSold: number
    /** The total revenue */
    revenue: number
    /** The total expenses */
    expenses: number
}

/**
 * Analyzes financial transactions for small businesses.
 * This class processes Plaid account transactions to compute various financial metrics.
 */
class TransactionAnalyzer {
    private transactions: PlaidAccountTransaction[]

    // Category mappings
    private static readonly ASSET_CATEGORIES = [
        'TRANSFER_IN_CASH_ADVANCES_AND_LOANS',
        'TRANSFER_IN_DEPOSIT',
        'TRANSFER_IN_INVESTMENT_AND_RETIREMENT_FUNDS',
        'TRANSFER_IN_SAVINGS',
        'TRANSFER_IN_ACCOUNT_TRANSFER',
        'TRANSFER_IN_OTHER_TRANSFER_IN'
    ]

    private static readonly LIABILITY_CATEGORIES = [
        'LOAN_PAYMENTS_CAR_PAYMENT',
        'LOAN_PAYMENTS_CREDIT_CARD_PAYMENT',
        'LOAN_PAYMENTS_PERSONAL_LOAN_PAYMENT',
        'LOAN_PAYMENTS_MORTGAGE_PAYMENT',
        'LOAN_PAYMENTS_STUDENT_LOAN_PAYMENT',
        'LOAN_PAYMENTS_OTHER_PAYMENT'
    ]

    private static readonly COGS_CATEGORIES = [
        'GENERAL_MERCHANDISE_DISCOUNT_STORES',
        'GENERAL_MERCHANDISE_ONLINE_MARKETPLACES',
        'GENERAL_MERCHANDISE_SUPERSTORES'
    ]

    private static readonly REVENUE_CATEGORIES = [
        'INCOME_DIVIDENDS',
        'INCOME_INTEREST_EARNED',
        'INCOME_RETIREMENT_PENSION',
        'INCOME_TAX_REFUND',
        'INCOME_UNEMPLOYMENT',
        'INCOME_WAGES',
        'INCOME_OTHER_INCOME'
    ]

    private static readonly EXPENSE_CATEGORIES = [
        'BANK_FEES_ATM_FEES',
        'BANK_FEES_FOREIGN_TRANSACTION_FEES',
        'BANK_FEES_INSUFFICIENT_FUNDS',
        'BANK_FEES_INTEREST_CHARGE',
        'BANK_FEES_OVERDRAFT_FEES',
        'BANK_FEES_OTHER_BANK_FEES',
        'FOOD_AND_DRINK_GROCERIES',
        'GENERAL_SERVICES_ACCOUNTING_AND_FINANCIAL_PLANNING',
        'GENERAL_SERVICES_AUTOMOTIVE',
        'GENERAL_SERVICES_CONSULTING_AND_LEGAL',
        'GENERAL_SERVICES_INSURANCE',
        'GENERAL_SERVICES_POSTAGE_AND_SHIPPING',
        'GENERAL_SERVICES_STORAGE',
        'GENERAL_SERVICES_OTHER_GENERAL_SERVICES',
        'RENT_AND_UTILITIES_GAS_AND_ELECTRICITY',
        'RENT_AND_UTILITIES_INTERNET_AND_CABLE',
        'RENT_AND_UTILITIES_RENT',
        'RENT_AND_UTILITIES_SEWAGE_AND_WASTE_MANAGEMENT',
        'RENT_AND_UTILITIES_TELEPHONE',
        'RENT_AND_UTILITIES_WATER',
        'RENT_AND_UTILITIES_OTHER_UTILITIES'
    ]

    /**
     * Creates a new TransactionAnalyzer instance.
     * @param transactions - An array of Plaid account transactions to analyze.
     */
    constructor(transactions: PlaidAccountTransaction[]) {
        this.transactions = transactions
    }

    /**
     * Computes all financial metrics based on the provided transactions.
     * @returns An object containing all calculated financial metrics.
     */
    public computeFinancialMetrics(): FinancialMetrics {
        return {
            currentAssets: this.computeCurrentAssets(),
            currentLiabilities: this.computeCurrentLiabilities(),
            costOfGoodsSold: this.computeCostOfGoodsSold(),
            revenue: this.computeRevenue(),
            expenses: this.computeExpenses()
        }
    }

    /**
     * Calculates the total value of current assets.
     * @returns The sum of all transactions categorized as assets.
     */
    private computeCurrentAssets(): number {
        return this.sumTransactions(TransactionAnalyzer.ASSET_CATEGORIES)
    }

    /**
     * Calculates the total value of current liabilities.
     * @returns The sum of all transactions categorized as liabilities.
     */
    private computeCurrentLiabilities(): number {
        return this.sumTransactions(TransactionAnalyzer.LIABILITY_CATEGORIES)
    }

    /**
     * Calculates the total cost of goods sold.
     * @returns The sum of all transactions categorized as cost of goods sold.
     */
    private computeCostOfGoodsSold(): number {
        return this.sumTransactions(TransactionAnalyzer.COGS_CATEGORIES)
    }

    /**
     * Calculates the total revenue.
     * @returns The sum of all transactions categorized as revenue.
     */
    private computeRevenue(): number {
        return this.sumTransactions(TransactionAnalyzer.REVENUE_CATEGORIES)
    }

    /**
     * Calculates the total expenses.
     * @returns The sum of all transactions categorized as expenses.
     */
    private computeExpenses(): number {
        return this.sumTransactions(TransactionAnalyzer.EXPENSE_CATEGORIES)
    }

    /**
     * Sums the amounts of transactions that fall into specified categories.
     * @param categories - An array of category strings to filter transactions.
     * @returns The sum of the absolute values of matching transaction amounts.
     */
    private sumTransactions(categories: string[]): number {
        return this.transactions
            .filter((t) => t.amount !== undefined && categories.includes(t.personalFinanceCategoryDetailed || ''))
            .reduce((sum, t) => sum + Math.abs(t.amount!), 0)
    }

    /**
     * Retrieves transactions that occurred within a specified date range.
     * @param startDate - The start date of the range (inclusive).
     * @param endDate - The end date of the range (inclusive).
     * @returns An array of transactions within the specified date range.
     */
    public getTransactionsInDateRange(startDate: Date, endDate: Date): PlaidAccountTransaction[] {
        return this.transactions.filter((t) => {
            const transactionDate = new Date(t.currentDate!)
            return transactionDate >= startDate && transactionDate <= endDate
        })
    }

    /**
     * Computes the change in a specific financial metric between two time periods.
     * @param metric - The financial metric to compare (e.g., 'revenue', 'expenses').
     * @param period1Start - The start date of the first period.
     * @param period1End - The end date of the first period.
     * @param period2Start - The start date of the second period.
     * @param period2End - The end date of the second period.
     * @returns The difference in the metric value between the second and first period.
     */
    public computeMetricChange(
        metric: keyof FinancialMetrics,
        period1Start: Date,
        period1End: Date,
        period2Start: Date,
        period2End: Date
    ): number {
        const period1Transactions = this.getTransactionsInDateRange(period1Start, period1End)
        const period2Transactions = this.getTransactionsInDateRange(period2Start, period2End)

        const period1Analyzer = new TransactionAnalyzer(period1Transactions)
        const period2Analyzer = new TransactionAnalyzer(period2Transactions)

        const period1Metric = period1Analyzer.computeFinancialMetrics()[metric]
        const period2Metric = period2Analyzer.computeFinancialMetrics()[metric]

        return period2Metric - period1Metric
    }
}

export default TransactionAnalyzer
