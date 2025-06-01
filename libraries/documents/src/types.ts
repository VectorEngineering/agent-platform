/**
 * @fileoverview Type definitions for document processing system.
 */

/**
 * Represents a raw document with its content and metadata.
 */
export type Document = {
    /** Base64 encoded document content */
    Content: string
    /** MIME type of the document */
    ContentType: string
    /** Size of the document in bytes */
    ContentLength: number
    /** Original filename */
    Name: string
}

/** Supported MIME types for document processing */
export type MimeType = 'application/pdf' | 'image/jpeg'

/**
 * Represents a prepared document ready for processing.
 */
export type DocumentResponse = {
    /** Document content as a buffer */
    content: Buffer | ArrayBuffer
    /** Standardized MIME type */
    mimeType: MimeType
    /** Size in bytes */
    size: number
    /** Processed filename */
    fileName: string
    /** Original name */
    name: string
}

/**
 * Parameters for initializing a DocumentClient.
 */
export type DocumentClientParams = {
    /** MIME type of documents to be processed */
    contentType: string
}

/**
 * Request parameters for document processing.
 */
export type GetDocumentRequest = {
    /** Base64 encoded document content */
    content: string
}

/**
 * Response containing extracted document information.
 */
export type GetDocumentResponse = {
    /** Extracted document name */
    name?: string | null
    /** Extracted date */
    date?: string | null
    /** Extracted amount */
    amount?: number | null
    /** Currency code */
    currency?: string | null
    /** Source website */
    website?: string | null
    /** Document type */
    type?: string | null
    /** Document description */
    description?: string | null
}

/**
 * Represents an email attachment.
 */
export interface Attachment {
    /** Size of the attachment in bytes */
    ContentLength: number
    /** Base64 encoded content */
    Content: string
    /** Original filename */
    Name: string
    /** MIME type */
    ContentType: string
    /** Unique identifier */
    ContentID: string
}

/** Array of attachments */
export type Attachments = Attachment[]
