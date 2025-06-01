import type { DocumentFieldOutput } from '@azure-rest/ai-document-intelligence'
import type { Attachments } from './types'

/**
 * @fileoverview Utility functions for extracting and formatting document information.
 */

export const allowedMimeTypes = ['image/heic', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/octet-stream']

export function getAllowedAttachments(attachments?: Attachments) {
    return attachments?.filter((attachment) => allowedMimeTypes.includes(attachment.ContentType))
}

/**
 * Extracts currency information from a field value.
 *
 * @param field - Field containing currency information
 * @returns Currency code or null if not found
 *
 * @example
 * ```typescript
 * getCurrency({ valueCurrency: { currencyCode: "USD" } }) // Returns "USD"
 * ```
 */
export function getCurrency(field?: { valueCurrency?: { currencyCode?: string } }): string | null {
    return field?.valueCurrency?.currencyCode ?? null
}

/**
 * Extracts the root domain from a URL string.
 *
 * @param content - Text that may contain a URL
 * @returns Root domain or null if no valid URL found
 *
 * @example
 * ```typescript
 * extractRootDomain("Visit us at https://www.example.com/page") // Returns "example.com"
 * ```
 */
export function extractRootDomain(content?: string): string | null {
    if (!content) return null

    // First, try to match the domain pattern
    const domainPattern = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?:\/|$)/g

    const match = content.match(domainPattern)
    if (!match) return null

    // Extract the full domain without protocol and www
    const fullDomain = match[0].replace(/(?:https?:\/\/)?(?:www\.)?/, '').split('/')[0]

    // Split the domain into parts
    const parts = fullDomain.split('.')

    // Handle special cases for country-specific TLDs (e.g., co.uk, com.au)
    const knownSuffixes = ['co.uk', 'com.au', 'co.jp', 'co.nz']
    const lastTwoParts = parts.slice(-2).join('.')

    if (knownSuffixes.includes(lastTwoParts)) {
        // For known country-specific TLDs, take last three parts
        return parts.slice(-3).join('.')
    } else {
        // For regular domains, take last two parts
        return parts.slice(-2).join('.')
    }
}

/**
 * Extracts domain from an email address.
 *
 * @param email - Email address
 * @returns Domain part of the email or null if invalid
 *
 * @example
 * ```typescript
 * getDomainFromEmail("user@example.com") // Returns "example.com"
 * ```
 */
export function getDomainFromEmail(email?: string): string | null {
    if (!email) return null

    // Updated pattern to handle multiple subdomain parts
    const emailPattern = /^[^\s@]+@((?:[\w-]+\.)+[\w-]+)$/
    const match = email.match(emailPattern)
    const domain = match?.[1]

    if (!domain) return null

    return domain
}
