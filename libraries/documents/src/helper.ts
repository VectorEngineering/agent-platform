/**
 * @fileoverview Utility functions for string manipulation and file name handling.
 */

/**
 * Removes all special characters from a string, leaving only alphanumeric characters.
 *
 * @param str - The input string to be cleaned
 * @returns A string containing only alphanumeric characters
 *
 * @example
 * ```typescript
 * stripSpecialCharacters("Hello@World!") // Returns "HelloWorld"
 * ```
 */
function stripSpecialCharacters(str: string) {
    return str.replace(/[^a-zA-Z0-9]/g, '')
}

/**
 * Sanitizes a filename by removing special characters and replacing spaces with underscores.
 *
 * @param fileName - The original filename to be sanitized
 * @returns A sanitized filename safe for file system operations
 *
 * @example
 * ```typescript
 * sanitizeFileName("My File (1).pdf") // Returns "MyFile1"
 * ```
 */
function sanitizeFileName(fileName: string) {
    return stripSpecialCharacters(fileName).replace(/\s+/g, '_')
}

export { sanitizeFileName, stripSpecialCharacters }
