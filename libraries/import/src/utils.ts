/**
 * @fileoverview Utility functions for formatting dates and amounts in transaction imports
 */

import { isValid, parse, parseISO } from 'date-fns'

/**
 * Ensures a date string has a valid 4-digit year in the 2000s
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Corrected date string or undefined if input is invalid
 *
 * @internal
 */
function ensureValidYear(dateString: string | undefined): string | undefined {
    if (!dateString) return undefined

    const [year, month, day] = dateString.split('-')
    const correctedYear = year?.length === 4 ? (year.startsWith('20') ? year : `20${year.slice(2)}`) : `20${year}`

    return `${correctedYear}-${month}-${day}`
}

/**
 * Formats a date string into a standardized ISO format (YYYY-MM-DD)
 *
 * @param date - Date string in various possible formats
 * @returns Formatted date string in YYYY-MM-DD format or undefined if parsing fails
 *
 * @remarks
 * This function attempts to parse dates in multiple formats:
 * - Common date formats (dd/MM/yyyy, MM/dd/yyyy, etc.)
 * - ISO date formats with time
 * - Localized date formats
 * - Dates with various separators (/, -, .)
 *
 * If parsing fails with standard formats, it attempts to clean the string
 * and parse it as an ISO date.
 *
 * @example
 * ```ts
 * formatDate("21/01/2024") // returns "2024-01-21"
 * formatDate("2024-01-21T15:30:00") // returns "2024-01-21"
 * formatDate("21 Jan 2024") // returns "2024-01-21"
 * ```
 */
export function formatDate(date: string) {
    const formats = [
        'dd/MMM/yyyy',
        'dd/MM/yyyy',
        'yyyy-MM-dd',
        'MM/dd/yyyy',
        'dd.MM.yyyy',
        'dd-MM-yyyy',
        'yyyy/MM/dd',
        'MM-dd-yyyy',
        'yyyy.MM.dd',
        'dd MMM yyyy',
        'MMM dd, yyyy',
        'MMMM dd, yyyy',
        "yyyy-MM-dd'T'HH:mm:ss",
        'yyyy-MM-dd HH:mm:ss',
        'dd/MM/yyyy HH:mm:ss',
        'MM/dd/yyyy HH:mm:ss',
        'yyyy/MM/dd HH:mm:ss',
        'dd.MM.yyyy HH:mm:ss',
        'dd-MM-yyyy HH:mm:ss',
        "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
        "yyyy-MM-dd'T'HH:mm:ss",
        'd/M/yy'
    ]

    for (const format of formats) {
        const parsedDate = parse(date, format, new Date())
        if (isValid(parsedDate)) {
            return ensureValidYear(parsedDate.toISOString().split('T')[0])
        }
    }

    try {
        const parsedDate = parseISO(date)
        if (isValid(parsedDate)) {
            return ensureValidYear(parsedDate.toISOString().split('T')[0])
        }
    } catch {
        // Continue if parseISO fails
    }

    // If the date includes a time, we don't need to remove the time.
    const value = date.includes('T') ? date : date.replace(/[^0-9-\.\/]/g, '')

    try {
        const parsedDate = parseISO(value)
        if (isValid(parsedDate)) {
            return ensureValidYear(parsedDate.toISOString().split('T')[0])
        }
    } catch {
        // Continue if parseISO fails
    }

    // If all parsing attempts fail, return undefined
    return undefined
}

/**
 * Formats a string amount into a standardized number value
 *
 * @param options - Format options
 * @param options.amount - Amount string to format
 * @param options.inverted - Whether to invert the final amount (multiply by -1)
 * @returns Formatted number value
 *
 * @remarks
 * This function handles various amount formats:
 * - Different decimal separators (, or .)
 * - Thousands separators
 * - Special minus signs (−)
 * - Optional amount inversion
 *
 * @example
 * ```ts
 * formatAmountValue({ amount: "1,234.56" }) // returns 1234.56
 * formatAmountValue({ amount: "1.234,56" }) // returns 1234.56
 * formatAmountValue({ amount: "-100", inverted: true }) // returns 100
 * ```
 */
export function formatAmountValue({ amount, inverted }: { amount: string; inverted?: boolean }) {
    let value: number

    // Handle special minus sign (−) by replacing with standard minus (-)
    const normalizedAmount = amount.replace(/−/g, '-')

    if (normalizedAmount.includes(',')) {
        // Remove thousands separators and replace the comma with a period.
        value = +normalizedAmount.replace(/\./g, '').replace(',', '.')
    } else if (normalizedAmount.match(/\.\d{2}$/)) {
        // If it ends with .XX, it's likely a decimal; remove internal periods.
        value = +normalizedAmount.replace(/\.(?=\d{3})/g, '')
    } else {
        // If neither condition is met, convert the amount directly to a number
        value = +normalizedAmount
    }

    if (inverted) {
        return +(value * -1)
    }

    return value
}
