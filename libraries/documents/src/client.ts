/**
 * @fileoverview Document processing client that handles different types of documents
 * using appropriate processors based on content type.
 */

import type { DocumentClientParams, GetDocumentRequest, GetDocumentResponse } from './types'

import { Processor } from './interface'
import { ExpenseProcessor } from './processors/expense/expense-processor'
import { InvoiceProcessor } from './processors/invoice/invoice-processor'

/**
 * Client for processing different types of documents.
 *
 * @remarks
 * The client automatically selects the appropriate processor based on the content type:
 * - PDF files are processed using InvoiceProcessor
 * - All other file types are processed using ExpenseProcessor
 *
 * This selection can be extended by adding more content type handlers in the constructor.
 *
 * @throws {Error} When an unsupported content type is provided
 */
export class DocumentClient {
    processor: Processor

    /**
     * Creates a new DocumentClient instance.
     *
     * @param params - Configuration parameters for the client
     * @param params.contentType - MIME type of the documents to be processed
     */
    constructor({ contentType }: DocumentClientParams) {
        switch (contentType) {
            case 'application/pdf':
                this.processor = new InvoiceProcessor()
                break
            default:
                this.processor = new ExpenseProcessor()
        }
    }

    /**
     * Processes a document and extracts relevant information.
     *
     * @param params - Parameters for document processing
     * @returns Processed document information including metadata
     */
    public async getDocument(params: GetDocumentRequest): Promise<GetDocumentResponse> {
        return this.processor.getDocument(params)
    }
}
