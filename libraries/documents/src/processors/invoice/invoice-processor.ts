/**
 * @fileoverview Processor for handling invoice documents using Azure Document Intelligence
 * with LLM fallback capabilities.
 */

import type { AnalyzeResultOperationOutput } from '@azure-rest/ai-document-intelligence'
import type { Processor } from '../../interface'
import type { GetDocumentRequest } from '../../types'

import { getLongRunningPoller, isUnexpected } from '@azure-rest/ai-document-intelligence'
import { capitalCase } from 'change-case'

import { client } from '../../provider/azure'
import { extractRootDomain, getCurrency, getDomainFromEmail } from '../../utils'
import { InvoiceLlmProcessor } from '../llm/invoice-llm-processor'
import { LlmProcessor } from '../llm/llm-processor'

/**
 * Processes invoice documents using Azure's prebuilt invoice model.
 *
 * @implements {Processor}
 * @remarks
 * This processor uses Azure's Document Intelligence service with the prebuilt invoice model.
 * It extracts vendor information, amounts, dates, and other invoice-specific data.
 * Falls back to LLM processing when Azure extraction is incomplete.
 *
 * @example
 * ```typescript
 * const processor = new InvoiceProcessor();
 * const result = await processor.getDocument({ content: base64Content });
 * ```
 */
export class InvoiceProcessor implements Processor {
    /**
     * Processes a document using Azure Document Intelligence.
     *
     * @param content - Base64 encoded document content
     * @returns Analyzed document data
     * @throws {Error} If document analysis fails
     */
    async processDocument(content: string) {
        const initialResponse = await client.path('/documentModels/{modelId}:analyze', 'prebuilt-invoice').post({
            contentType: 'application/json',
            body: {
                base64Source: content
            },
            queryParameters: {
                features: ['queryFields'],
                queryFields: ['VendorEmail', 'CustomerEmail'],
                split: 'none'
            }
        })

        if (isUnexpected(initialResponse)) {
            throw initialResponse.body.error
        }

        const poller = await getLongRunningPoller(client, initialResponse)
        const result = (await poller.pollUntilDone()).body as AnalyzeResultOperationOutput

        return this.extractData(result)
    }

    /**
     * Extracts website information from document fields or content.
     *
     * @param fields - Document fields from Azure analysis
     * @param content - Raw document content
     * @returns Website domain or null if not found
     */
    getWebsiteFromFields(fields?: Record<string, { valueString?: string }>, content?: string) {
        const website =
            // First try to get the email domain
            getDomainFromEmail(fields?.VendorEmail?.valueString) ||
            fields?.Website?.valueString ||
            // Then try to get the website from the content
            extractRootDomain(content) ||
            null

        return website
    }

    /**
     * Extracts structured data from Azure's analysis result.
     * Falls back to LLM if Azure extraction is incomplete.
     *
     * @param data - Azure analysis result
     * @returns Structured document data
     */
    async extractData(data: AnalyzeResultOperationOutput) {
        const document = data.analyzeResult?.documents?.[0]
        const fields = document?.fields
        const content = data.analyzeResult?.content

        // Extract vendor details
        const vendorName = fields?.VendorName?.valueString ? capitalCase(fields.VendorName.valueString) : null
        const vendorAddress = fields?.VendorAddress?.valueString || null
        const vendorPhone = fields?.VendorPhoneNumber?.valueString || null
        const vendorEmail = fields?.VendorEmail?.valueString || null

        // Extract customer details
        const customerName = fields?.CustomerName?.valueString ? capitalCase(fields.CustomerName.valueString) : null
        const customerAddress = fields?.CustomerAddress?.valueString || null
        const customerEmail = fields?.CustomerEmail?.valueString || null
        const customerPhone = fields?.CustomerPhoneNumber?.valueString || null

        // Extract invoice details
        const invoiceId = fields?.InvoiceId?.valueString || null
        const invoiceDate = fields?.InvoiceDate?.valueDate || null
        const dueDate = fields?.DueDate?.valueDate || null
        const purchaseOrderNumber = fields?.PurchaseOrderNumber?.valueString || null
        const paymentTerm = fields?.PaymentTerm?.valueString || null

        // Financial details
        const currency = getCurrency(fields?.InvoiceTotal)
        const invoiceTotal = fields?.InvoiceTotal?.valueCurrency?.amount ?? null
        const amountDue = fields?.AmountDue?.valueCurrency?.amount ?? null
        const subtotal = fields?.SubTotal?.valueNumber ?? null
        const tax = fields?.TaxAmount?.valueNumber ?? null
        const tip = fields?.TipAmount?.valueNumber ?? null // Some invoices might have a tip field, often not
        const previousUnpaidBalance = fields?.PreviousUnpaidBalance?.valueNumber ?? null

        // Extract line items
        const lineItems =
            fields?.Items?.valueArray?.map((itemObj: any) => {
                const itemFields = itemObj.valueObject || {}
                return {
                    description: itemFields.Description?.valueString || null,
                    quantity: itemFields.Quantity?.valueNumber || null,
                    unitPrice: itemFields.UnitPrice?.valueNumber || null,
                    amount: itemFields.Amount?.valueNumber || null
                }
            }) || null

        const website = this.getWebsiteFromFields(fields, content)

        const result = {
            type: 'invoice',
            name: vendorName,
            amount: invoiceTotal,
            date: invoiceDate,
            website,
            currency,
            description: null,
            vendorAddress,
            vendorPhone,
            vendorEmail,
            customerName,
            customerAddress,
            customerEmail,
            customerPhone,
            invoiceId,
            dueDate,
            purchaseOrderNumber,
            paymentTerm,
            subtotal,
            tax,
            tip,
            amountDue,
            previousUnpaidBalance,
            lineItems
        }

        // Determine if critical fields (like name, amount, date) are missing
        const essentialFields = ['name', 'amount', 'date']
        const hasAllEssentials = essentialFields.every((field) => result[field as keyof typeof result] !== null)

        if (hasAllEssentials) {
            // We have enough data
            return {
                ...result,
                description: null // No description extracted directly
            }
        }

        // Fallback to LLM to fill missing critical fields
        const fallback = content ? await this.fallbackToLlm(content) : null

        // Merge fields from LLM if they are missing
        const mergedResult = {
            ...result,
            ...fallback
        }

        return {
            ...mergedResult,
            description: fallback?.description ?? null
        }
    }

    /**
     * Falls back to LLM processing when Azure extraction is incomplete.
     *
     * @param content - Raw document content
     * @returns LLM-processed document data
     */
    async fallbackToLlm(content: string) {
        const llm = new InvoiceLlmProcessor()
        const fallbackData = await llm.getStructuredData(content)
        return { ...fallbackData, type: 'invoice' }
    }

    /**
     * @inheritdoc
     */
    public async getDocument(params: GetDocumentRequest) {
        return this.processDocument(params.content)
    }
}
