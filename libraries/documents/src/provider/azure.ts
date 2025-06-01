/**
 * @fileoverview Azure Document Intelligence client configuration and initialization.
 * This module provides a configured instance of the Azure Document Intelligence client
 * for document analysis and processing.
 *
 * @throws {Error} When environment variables are not properly configured:
 * - Missing AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT
 * - Missing AZURE_DOCUMENT_INTELLIGENCE_KEY
 * - Invalid endpoint URL format
 * - Invalid API key format
 */

import DocumentIntelligence from '@azure-rest/ai-document-intelligence'

/**
 * Configured Azure Document Intelligence client instance.
 *
 * @remarks
 * This client requires valid Azure credentials to be set in environment variables:
 * - AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT: The endpoint URL for your Azure Document Intelligence resource
 * - AZURE_DOCUMENT_INTELLIGENCE_KEY: The API key for authentication
 *
 * @example
 * ```typescript
 * import { client } from './provider/azure';
 *
 * // Use the client to analyze documents
 * const result = await client.path('/analyze').post({
 *   body: documentData
 * });
 * ```
 *
 * @throws {Error} Will throw an error if required environment variables are not set
 */
export const client = DocumentIntelligence(process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT!, {
    key: process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY!
})
