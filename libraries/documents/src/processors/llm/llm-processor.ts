/**
 * @fileoverview LLM-based document processor using OpenAI's GPT models for
 * extracting structured information from document content.
 */

import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

/**
 * Schema definition for document data extraction.
 * Defines the structure and validation rules for extracted information.
 *
 * @remarks
 * Uses Zod for runtime type validation and schema definition.
 * Each field includes a description that guides the LLM in extracting the correct information.
 *
 * @see {@link https://github.com/colinhacks/zod Zod Documentation}
 */
const schema = z.object({
    name: z.string().describe('The supplier or company of the invoice.'),
    amount: z.number().describe('The total amount of the invoice, usually the highest amount.'),
    date: z.string().describe('The due date of the invoice (ISO 8601 date string).'),
    website: z
        .string()
        .describe(
            "Website of the supplier or company without protocol (e.g. example.com) and only return if it's not null otherwise get the domain namn from the supplier name."
        ),
    currency: z.string().describe('Currency code of the invoice.'),
    description: z
        .string()
        .describe(
            'Summarize the purchase details by focusing on the supplier name and the content of the purchase. Max 1 sentence. Ignore amounts.'
        )
})

/**
 * Processes documents using Large Language Models to extract structured information.
 *
 * @remarks
 * Uses OpenAI's GPT-4 model to extract structured data from document content.
 * Provides fallback extraction capabilities for other document processors.
 * Implements strict schema validation to ensure consistent output format.
 *
 * @example
 * ```typescript
 * const processor = new LlmProcessor();
 * const result = await processor.getStructuredData("Invoice content...");
 * if (result) {
 *   console.log("Extracted data:", result);
 * }
 * ```
 */
export class LlmProcessor {
    /**
     * Extracts structured data from document content using GPT-4.
     *
     * @param content - Raw document content
     * @returns Structured document data or null if extraction fails
     *
     * @example
     * ```typescript
     * const processor = new LlmProcessor();
     * const result = await processor.getStructuredData("Invoice content...");
     * ```
     */
    public async getStructuredData(content: string) {
        try {
            const { object } = await generateObject({
                model: openai('gpt-4o-mini'),
                mode: 'json',
                schema,
                prompt: content
            })

            return {
                name: object.name,
                amount: object.amount,
                date: object.date,
                website: object.website?.replace(/^https?:\/\//, ''),
                currency: object.currency,
                description: object.description
            }
        } catch (error) {
            return null
        }
    }
}
