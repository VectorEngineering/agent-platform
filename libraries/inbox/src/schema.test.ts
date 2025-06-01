import { beforeEach, describe, expect, test } from 'bun:test'
import { inboxAttachment, inboxWebhookPostSchema } from './schema'

describe('inboxAttachment schema', () => {
    const validAttachment = {
        Name: 'test.pdf',
        Content: 'base64EncodedContent',
        ContentType: 'application/pdf',
        ContentID: 'abc-123',
        ContentLength: 1024
    }

    test('validates correct attachment', () => {
        expect(() => inboxAttachment.parse(validAttachment)).not.toThrow()
    })

    test('fails on missing required fields', () => {
        const invalidAttachment = {
            ...validAttachment,
            Name: undefined
        } as any
        expect(() => inboxAttachment.parse(invalidAttachment)).toThrow()
    })

    test('fails on invalid content length type', () => {
        const invalidAttachment = {
            ...validAttachment,
            ContentLength: '1024'
        }
        expect(() => inboxAttachment.parse(invalidAttachment)).toThrow()
    })
})

describe('inboxWebhookPostSchema', () => {
    const validWebhookData = {
        OriginalRecipient: 'test@inbox.solomon-ai.app',
        MessageID: 'msg-123',
        FromFull: {
            Name: 'John Doe',
            Email: 'john@example.com'
        },
        Subject: 'Test Email',
        TextBody: 'Hello World',
        HtmlBody: '<p>Hello World</p>',
        Attachments: []
    }

    test('validates production email domain', () => {
        expect(() => inboxWebhookPostSchema.parse(validWebhookData)).not.toThrow()
    })

    test('validates staging email domain', () => {
        const stagingData = {
            ...validWebhookData,
            OriginalRecipient: 'test@inbox.staging.solomon-ai.app'
        }
        expect(() => inboxWebhookPostSchema.parse(stagingData)).not.toThrow()
    })

    test('fails on invalid email domain', () => {
        const invalidData = {
            ...validWebhookData,
            OriginalRecipient: 'test@invalid-domain.com'
        }
        expect(() => inboxWebhookPostSchema.parse(invalidData)).toThrow()
    })

    test('validates with optional fields missing', () => {
        const minimalData = {
            OriginalRecipient: 'test@inbox.solomon-ai.app',
            MessageID: 'msg-123',
            FromFull: {
                Name: 'John Doe',
                Email: 'john@example.com'
            }
        }
        expect(() => inboxWebhookPostSchema.parse(minimalData)).not.toThrow()
    })

    test('validates with attachments', () => {
        const dataWithAttachments = {
            ...validWebhookData,
            Attachments: [
                {
                    Name: 'test.pdf',
                    Content: 'base64EncodedContent',
                    ContentType: 'application/pdf',
                    ContentID: 'abc-123',
                    ContentLength: 1024
                }
            ]
        }
        expect(() => inboxWebhookPostSchema.parse(dataWithAttachments)).not.toThrow()
    })

    test('fails on invalid FromFull structure', () => {
        const invalidData = {
            ...validWebhookData,
            FromFull: {
                Name: 'John Doe'
                // Missing Email field
            }
        }
        expect(() => inboxWebhookPostSchema.parse(invalidData)).toThrow()
    })
})
