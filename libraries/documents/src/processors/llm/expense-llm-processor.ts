import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { LlmProcessor } from './llm-processor'

/**
 * Schema definition for line items in an expense document
 */
const lineItemSchema = z.object({
    description: z.string().describe('A brief description of the purchased item or service.'),
    quantity: z.number().describe('The quantity of the item purchased.'),
    price: z.number().describe('The price per unit of the item.'),
    totalPrice: z.number().describe('The total price for this line item (quantity * price).')
})

/**
 * Extended schema for expense-specific document data extraction
 */
const expenseSchema = z.object({
    name: z.string().describe('The supplier or company name associated with the expense.'),
    amount: z.number().describe('The total (grand) amount of the expense.'),
    date: z.string().describe('The transaction date of the expense in ISO 8601 format (YYYY-MM-DD).'),
    time: z.string().optional().describe('The transaction time of the expense (e.g. HH:MM), if available.'),
    website: z
        .string()
        .describe(
            "The supplier's website domain without protocol (e.g. example.com). If not found, derive from supplier name if possible."
        ),
    currency: z.string().describe('The three-letter currency code of the expense (e.g. USD, EUR).'),
    description: z
        .string()
        .describe('A one-sentence summary of the purchase focusing on the supplier and what was bought. Ignore amounts.'),
    merchantAddress: z.string().optional().describe('The full address of the merchant, if available.'),
    merchantPhone: z.string().optional().describe("The merchant's phone number, if available."),
    invoiceNumber: z.string().optional().describe('The invoice or receipt number if present.'),
    paymentMethod: z.string().optional().describe('The payment method used (e.g. credit card, cash), if identifiable.'),
    subtotal: z.number().optional().describe('The subtotal amount before tax, if available.'),
    tax: z.number().optional().describe('The total tax amount included in the purchase, if available.'),
    tip: z.number().optional().describe('The tip amount included in the purchase, if any.'),
    lineItems: z.array(lineItemSchema).optional().describe('An array of line items detailing individual purchased goods or services.')
})

/**
 * ExpenseLlmProcessor extends the base LlmProcessor to specifically handle expense documents.
 * It includes additional fields relevant to expenses such as merchant details, payment information,
 * and line items.
 *
 * @example
 * ```typescript
 * const processor = new ExpenseLlmProcessor();
 * const result = await processor.getStructuredData("Expense receipt content...");
 * ```
 */
export class ExpenseLlmProcessor extends LlmProcessor {
    /**
     * Extracts structured expense data from document content using GPT-4.
     *
     * @param content - Raw document content from the expense receipt/document
     * @returns Structured expense data or null if extraction fails
     */
    public async getStructuredData(content: string) {
        try {
            const prompt = `
You are a specialized assistant that parses structured expense information from documents.
Your output must be a valid JSON object matching these requirements:

1. Schema Compliance: Follow the schema exactly. Use null for required fields if data is missing.
2. Data Extraction: Extract supplier name, amounts, dates, currency, line items, and metadata.
3. Formatting: Return only a valid JSON object, no extra text or comments.
4. Required Fields: name (string), amount (number), date (ISO 8601), currency (string)
5. Optional Fields: time, website, merchantAddress, merchantPhone, invoiceNumber, paymentMethod, 
   subtotal, tax, tip, lineItems (array of {description, quantity, price, totalPrice})

Instructions:
- Conform exactly to the schema fields
- For missing required fields, use null
- For missing optional fields, omit them
- Focus on identifying expense details
- Return only a valid JSON object
- Do not include any extra text or comments

Schema Reference:
name: string (required) - supplier or company name
amount: number (required) - total amount of expense
date: string (required) - ISO 8601 date format
currency: string (required) - three-letter currency code
website: string - domain without protocol
description: string - one-sentence summary
merchantAddress: string - full address if available
merchantPhone: string - phone number if available
invoiceNumber: string - receipt/invoice number
paymentMethod: string - payment method used
subtotal: number - amount before tax
tax: number - tax amount
tip: number - tip amount if any
lineItems: array of {
  description: string,
  quantity: number,
  price: number,
  totalPrice: number
}

Document Content:
${content}`

            const { object } = await generateObject({
                model: openai('gpt-4o-mini'),
                mode: 'json',
                schema: expenseSchema,
                prompt
            })

            const cleanWebsite = object.website?.replace(/^https?:\/\//, '')

            return {
                name: object.name,
                amount: object.amount,
                date: object.date,
                time: object.time ?? null,
                website: cleanWebsite,
                currency: object.currency,
                description: object.description,
                merchantAddress: object.merchantAddress ?? null,
                merchantPhone: object.merchantPhone ?? null,
                invoiceNumber: object.invoiceNumber ?? null,
                paymentMethod: object.paymentMethod ?? null,
                subtotal: object.subtotal ?? null,
                tax: object.tax ?? null,
                tip: object.tip ?? null,
                lineItems: object.lineItems ?? null
            }
        } catch (error) {
            return null
        }
    }
}
