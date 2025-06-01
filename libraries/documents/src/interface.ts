/**
 * @fileoverview Defines the core interface for document processors.
 */

import type { GetDocumentRequest, GetDocumentResponse } from './types'

/**
 * Interface defining the contract for document processors.
 *
 * @interface
 *
 * @remarks
 * All document processors (Invoice, Expense, etc.) must implement this interface
 * to ensure consistent document processing capabilities.
 */
export interface Processor {
    /**
     * Processes a document and extracts relevant information.
     *
     * @param params - Parameters containing the document content
     * @returns Promise resolving to the processed document information
     */
    getDocument: (params: GetDocumentRequest) => Promise<GetDocumentResponse>
}
