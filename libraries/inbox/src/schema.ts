import { z } from 'zod'

/**
 * Schema for email attachments received through the inbox webhook
 * @property {string} Name - The filename of the attachment
 * @property {string} Content - Base64 encoded content of the attachment
 * @property {string} ContentType - MIME type of the attachment
 * @property {string} ContentID - Unique identifier for the attachment
 * @property {number} ContentLength - Size of the attachment in bytes
 */
export const inboxAttachment = z.object({
    Name: z.string(),
    Content: z.string(),
    ContentType: z.string(),
    ContentID: z.string(),
    ContentLength: z.number().positive()
})

/**
 * Schema for the sender's information
 * @property {string} Name - The display name of the sender
 * @property {string} Email - The email address of the sender
 */
export const fromFullSchema = z.object({
    Name: z.string(),
    Email: z.string().email({ message: 'Invalid sender email format' })
})

/**
 * Valid domains for inbox emails
 */
export const VALID_INBOX_DOMAINS = ['@inbox.solomon-ai.app', '@inbox.staging.solomon-ai.app'] as const

/**
 * Schema for validating incoming webhook POST requests from the email service
 *
 * @example
 * ```typescript
 * import { inboxWebhookPostSchema } from '@solomon-ai/inbox';
 *
 * // In your webhook handler:
 * app.post('/webhook', async (req, res) => {
 *   try {
 *     const validatedData = inboxWebhookPostSchema.parse(req.body);
 *     // Process the validated email data
 *   } catch (error) {
 *     // Handle validation errors
 *   }
 * });
 * ```
 */
export const inboxWebhookPostSchema = z.object({
    OriginalRecipient: z.union([
        z
            .string({ required_error: 'OriginalRecipient is required' })
            .email({ message: 'Invalid email format' })
            .endsWith('@inbox.solomon-ai.app', { message: 'Invalid email domain' }),
        z
            .string({ required_error: 'OriginalRecipient is required' })
            .email({ message: 'Invalid email format' })
            .endsWith('@inbox.staging.solomon-ai.app', {
                message: 'Invalid email domain'
            })
    ]),
    Attachments: z.array(inboxAttachment).optional(),
    Subject: z.string().optional(),
    TextBody: z.string().optional(),
    HtmlBody: z.string().optional(),
    FromFull: fromFullSchema,
    MessageID: z.string({ required_error: 'MessageID is required' }),
    ReceivedAt: z.string().datetime().optional(),
    SpamScore: z.number().min(0).max(100).optional(),
    Headers: z.record(z.string()).optional()
})

/**
 * Type inference helpers for the schemas
 */
export type InboxAttachment = z.infer<typeof inboxAttachment>
export type InboxWebhookPost = z.infer<typeof inboxWebhookPostSchema>
export type FromFull = z.infer<typeof fromFullSchema>
