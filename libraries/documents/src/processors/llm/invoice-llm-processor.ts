/**
 * @fileoverview LLM-based document processor using OpenAI's GPT models for
 * extracting structured invoice information from document content.
 */

import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { LlmProcessor } from './llm-processor'

// Define a schema for line items
const lineItemSchema = z.object({
    description: z.string().describe('A brief description of the purchased item or service.'),
    quantity: z.number().describe('The quantity of the item purchased.'),
    unitPrice: z.number().describe('The price per unit of the item.'),
    amount: z.number().describe('The total amount for this line item (quantity * unitPrice).')
})

/**
 * Schema definition for invoice data extraction.
 * Defines the structure and validation rules for extracted invoice information.
 * Uses Zod for runtime type validation and schema definition.
 */
const schema = z.object({
    description: z.string().optional().describe('A brief description of the invoice.'),
    // Basic invoice identification
    invoiceId: z.string().optional().describe('The unique invoice identifier.'),
    invoiceDate: z.string().optional().describe('The invoice issue date (ISO 8601 format).'),
    dueDate: z.string().optional().describe('The due date of the invoice (ISO 8601 date string).'),
    purchaseOrderNumber: z.string().optional().describe('The associated purchase order number, if any.'),
    paymentTerm: z.string().optional().describe('Payment terms of the invoice (e.g., Net 30).'),

    // Supplier (Vendor) Information
    vendorName: z.string().describe('The vendor or supplier name.'),
    vendorAddress: z.string().optional().describe('The complete address of the vendor.'),
    vendorPhone: z.string().optional().describe("The vendor's phone number."),
    vendorEmail: z.string().optional().describe("The vendor's email address."),
    website: z.string().optional().describe("The vendor's website domain without protocol (e.g. example.com)."),

    // Customer Information
    customerName: z.string().optional().describe("The customer's name or company name."),
    customerAddress: z.string().optional().describe("The customer's address."),
    customerEmail: z.string().optional().describe("The customer's email address."),
    customerPhone: z.string().optional().describe("The customer's phone number."),

    // Financials
    currency: z.string().describe('The currency code of the invoice (e.g., USD, EUR).'),
    subtotal: z.number().optional().describe('The subtotal amount before taxes and additional fees.'),
    tax: z.number().optional().describe('The total tax amount on the invoice.'),
    tip: z.number().optional().describe('Any included tip amount.'),
    previousUnpaidBalance: z.number().optional().describe('Any outstanding balance prior to this invoice.'),
    invoiceTotal: z.number().optional().describe('The total amount of the invoice.'),
    amountDue: z.number().optional().describe('The amount still due (outstanding) on the invoice.'),

    // Line Items
    lineItems: z.array(lineItemSchema).optional().describe('List of items/services included in the invoice.'),

    // Additional fields
    type: z.string().optional().describe('The type of the document, e.g., invoice.'),
    status: z.string().optional().describe('The status of the invoice.'),
    billingPeriod: z.string().optional().describe('The billing period for the invoice.'),
    notes: z.string().optional().describe('Any additional notes related to the invoice.'),
    terms: z.string().optional().describe('Terms associated with the invoice.'),
    discounts: z.number().optional().describe('Any discounts applied to the invoice.'),
    shipping: z.number().optional().describe('Shipping costs associated with the invoice.'),
    handling: z.number().optional().describe('Handling fees associated with the invoice.'),
    taxRate: z.number().optional().describe('The tax rate applied to the invoice.'),
    taxId: z.string().optional().describe('The tax identification number for the vendor.'),
    bankDetails: z.string().optional().describe('Bank details for payment.'),
    paymentMethod: z.string().optional().describe('The method of payment for the invoice.'),
    reference: z.string().optional().describe('Any reference number associated with the invoice.')
})

/**
 * Processes invoice documents using Large Language Models to extract structured information.
 * Uses OpenAI's GPT-4 model to extract structured data from the invoice content.
 * Implements strict schema validation to ensure consistent output format.
 *
 * @example
 * ```typescript
 * const processor = new InvoiceLlmProcessor();
 * const result = await processor.getStructuredData("Invoice content...");
 * if (result) {
 *   console.log("Extracted invoice data:", result);
 * }
 * ```
 */
export class InvoiceLlmProcessor extends LlmProcessor {
    /**
     * Extracts structured invoice data from document content using GPT-4.
     *
     * @param content - Raw invoice document content
     * @returns Structured invoice data or null if extraction fails
     */
    public async getStructuredData(content: string) {
        try {
            const prompt = `
You are a highly specialized assistant tasked with extracting invoice-related information from the provided document content. 
Your goal is to return the data as a valid JSON object that strictly adheres to the provided schema. Follow these guidelines:

1. **Schema Adherence**: Ensure the output JSON matches the schema exactly in structure and field names.
   - If a field is not found or is unclear in the document, omit it entirely if it is optional or set it to \`null\` if required.

2. **Accurate Extraction**: Focus on identifying key invoice-related details such as:
   - Vendor and Customer information (names, addresses, contact details)
   - Invoice metadata (IDs, dates, purchase order numbers, payment terms)
   - Financial breakdown (subtotal, tax, total, amount due, previous balance)
   - Line items (item descriptions, quantities, unit prices, total amounts)
   - Currency and descriptions where applicable.

3. **Validation**: Ensure all numerical values are properly parsed (e.g., amounts, quantities, totals).
   - For currency, ensure you provide only the three-letter ISO code (e.g., USD, EUR).

4. **Formatting**: 
   - Return only the JSON object as output, with no extra text, explanations, or formatting.
   - Ensure the JSON is well-formed, properly escaped, and includes all extracted data.

5. **Contextual Interpretation**:
   - If specific fields like a website domain are not directly provided, infer them if possible (e.g., extracting the domain from an email or vendor name).
   - For optional fields like a purchase order number or payment term, include them only if explicitly mentioned.

6. **Description Field**:
   - Summarize the document content in a single concise sentence focusing on the vendor and what was purchased. Ignore amounts and unnecessary details.

**Document Content**:
"${content}"

**Output**:
Return the extracted data in JSON format.
`

            const { object } = await generateObject({
                model: openai('gpt-4o-mini'),
                mode: 'json',
                schema,
                prompt
            })

            // Clean up website if present (remove protocols)
            const cleanWebsite = object.website?.replace(/^https?:\/\//, '') ?? null

            return {
                name: object.vendorName,
                amount: object.invoiceTotal ?? 0,
                date: object.invoiceDate ?? '',
                website: cleanWebsite ?? '',
                currency: object.currency,
                description: object.description ?? '',
                // All other fields at root level
                invoiceId: object.invoiceId ?? null,
                dueDate: object.dueDate ?? null,
                purchaseOrderNumber: object.purchaseOrderNumber ?? null,
                paymentTerm: object.paymentTerm ?? null,
                vendorAddress: object.vendorAddress ?? null,
                vendorPhone: object.vendorPhone ?? null,
                vendorEmail: object.vendorEmail ?? null,
                customerName: object.customerName ?? null,
                customerAddress: object.customerAddress ?? null,
                customerEmail: object.customerEmail ?? null,
                customerPhone: object.customerPhone ?? null,
                subtotal: object.subtotal ?? null,
                tax: object.tax ?? null,
                tip: object.tip ?? null,
                previousUnpaidBalance: object.previousUnpaidBalance ?? null,
                amountDue: object.amountDue ?? null,
                lineItems: object.lineItems ?? null,
                type: object.type ?? 'invoice',
                status: object.status ?? null,
                billingPeriod: object.billingPeriod ?? null,
                notes: object.notes ?? null,
                terms: object.terms ?? null,
                discounts: object.discounts ?? null,
                shipping: object.shipping ?? null,
                handling: object.handling ?? null,
                taxRate: object.taxRate ?? null,
                taxId: object.taxId ?? null,
                bankDetails: object.bankDetails ?? null,
                paymentMethod: object.paymentMethod ?? null,
                reference: object.reference ?? null
            }
        } catch (error) {
            return null
        }
    }
}
