/**
 * @fileoverview Processor for handling expense documents using Azure Document Intelligence
 * with LLM fallback capabilities.
 */

import type { AnalyzeResultOperationOutput } from '@azure-rest/ai-document-intelligence'
import type { Processor } from '../../interface'
import type { GetDocumentRequest } from '../../types'

import { getLongRunningPoller, isUnexpected } from '@azure-rest/ai-document-intelligence'
import { capitalCase } from 'change-case'

import { client } from '../../provider/azure'
import { extractRootDomain, getCurrency, getDomainFromEmail } from '../../utils'
import { ExpenseLlmProcessor } from '../llm/expense-llm-processor'
import { LlmProcessor } from '../llm/llm-processor'

/**
 * Processes expense documents (receipts, bills, etc.) using Azure's prebuilt receipt model.
 *
 * @implements {Processor}
 * @remarks
 * This processor uses Azure's Document Intelligence service with the prebuilt receipt model.
 * If Azure's extraction is incomplete, it falls back to LLM processing for better results.
 *
 * @example
 * ```typescript
 * const processor = new ExpenseProcessor();
 * const result = await processor.getDocument({ content: base64Content });
 * ```
 */
export class ExpenseProcessor implements Processor {
    /**
     * Processes a document using Azure Document Intelligence.
     *
     * @param content - Base64 encoded document content
     * @returns Analyzed document data
     * @throws {Error} If document analysis fails
     */
    async processDocument(content: string) {
        const initialResponse = await client.path('/documentModels/{modelId}:analyze', 'prebuilt-receipt').post({
            contentType: 'application/json',
            body: {
                base64Source: content
            },
            queryParameters: {
                features: ['queryFields'],
                queryFields: ['Email', 'Website']
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
            getDomainFromEmail(fields?.Email?.valueString) ||
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

        const website = this.getWebsiteFromFields(fields, content)

        // Extract line items if available
        const lineItems =
            fields?.Items?.valueArray?.map((itemObj: any) => {
                const itemFields = itemObj.valueObject || {}
                return {
                    description: itemFields.Description?.valueString || null,
                    quantity: itemFields.Quantity?.valueNumber || null,
                    price: itemFields.Price?.valueNumber || null,
                    totalPrice: itemFields.TotalPrice?.valueNumber || null
                }
            }) || []

        // Attempt to extract known receipt fields:
        const merchantName = fields?.MerchantName?.valueString ? capitalCase(fields.MerchantName.valueString) : null
        const merchantAddress = fields?.MerchantAddress?.valueString || null
        const merchantPhone = fields?.MerchantPhoneNumber?.valueString || null

        const transactionDate = fields?.TransactionDate?.valueDate || null
        const transactionTime = fields?.TransactionTime?.valueString || null

        // Some receipts include invoice or order numbers
        const invoiceNumber = fields?.InvoiceId?.valueString || fields?.TransactionId?.valueString || null

        // Payment method might not always be available, but check anyway
        const paymentMethod = fields?.PaymentMethod?.valueString || null

        // Financial breakdown
        const subtotal = fields?.Subtotal?.valueNumber || null
        const tax = fields?.TotalTax?.valueNumber || null
        const tip = fields?.Tip?.valueNumber || null
        const totalAmount = fields?.Total?.valueCurrency?.amount ?? null
        const currency = getCurrency(fields?.Total)

        const result = {
            type: 'expense',
            name: merchantName,
            merchantAddress,
            merchantPhone,
            date: transactionDate,
            time: transactionTime,
            invoiceNumber,
            paymentMethod,
            currency,
            subtotal,
            tax,
            tip,
            amount: totalAmount,
            lineItems: lineItems.length > 0 ? lineItems : null,
            website
        }

        // Check if we have all critical fields. You can define your own criteria.
        const essentialFields = ['name', 'date', 'amount']
        const hasAllEssentials = essentialFields.every((field) => result[field as keyof typeof result] !== null)

        if (hasAllEssentials) {
            // We have enough data; return as is.
            return {
                ...result,
                description: null
            }
        }

        // Fallback to LLM if critical data is missing
        const fallback = content ? await this.fallbackToLlm(content) : null

        // Only replace null values with LLM results if they exist
        const mappedResult = Object.fromEntries(
            Object.entries(result).map(([key, value]) => [key, value ?? fallback?.[key as keyof typeof result] ?? null])
        )

        return {
            ...mappedResult,
            // Add a description or any additional fields from LLM fallback
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
        const llm = new ExpenseLlmProcessor()
        const fallbackData = await llm.getStructuredData(content)
        return { ...fallbackData, type: 'expense' }
    }

    /**
     * @inheritdoc
     */
    public async getDocument(params: GetDocumentRequest) {
        return this.processDocument(params.content)
    }
}
