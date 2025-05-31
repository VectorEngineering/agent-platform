import { renderAsync } from '@react-email/render'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import * as React from 'react'
import { describe, expect, test } from 'vitest'
import { PaymentIssue } from '../emails/payment_issue'
import { SubscriptionEnded } from '../emails/subscription_ended'
import { TrialEnded } from '../emails/trial_ended'
import { WelcomeEmail } from '../emails/welcome_email'

/**
 * Path to the directory containing all email templates
 * @constant
 */
const pathToDirectoryWithEmails = path.resolve(__dirname, '../emails')

/**
 * Test suite for email template rendering
 * Verifies that all email templates render correctly and contain expected content
 */
describe('Email Template Tests', () => {
    /**
     * Tests that all email templates in the directory can be rendered without errors
     * Dynamically imports and renders each template file found in the emails directory
     */
    test('All email templates in directory render without errors', async () => {
        const emailFilenames = await readdir(pathToDirectoryWithEmails, {
            recursive: true
        })

        for await (const emailFilename of emailFilenames) {
            const pathToEmail = path.join(pathToDirectoryWithEmails, emailFilename)
            const emailModule = (await import(pathToEmail)) as unknown

            if (
                typeof emailModule === 'object' &&
                emailModule !== null &&
                'default' in emailModule &&
                typeof emailModule.default === 'function'
            ) {
                const rendered = await renderAsync(
                    React.createElement<Record<string, unknown>>(
                        emailModule.default as React.FC,
                        'PreviewProps' in emailModule ? (emailModule.PreviewProps as Record<string, unknown>) : {}
                    )
                )
                expect(rendered).toBeTruthy()
                expect(typeof rendered).toBe('string')
                expect(rendered).toContain('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML')
            }
        }
    })

    /**
     * Tests the WelcomeEmail template rendering with preview props
     * Verifies that essential content and sections are present
     */
    test('WelcomeEmail renders with preview props', async () => {
        const rendered = await renderAsync(React.createElement(WelcomeEmail, WelcomeEmail.PreviewProps))
        expect(rendered).toContain('Welcome to')
        expect(rendered).toContain('Quickstart Guides')
        expect(rendered).toContain('API Documentation')
        expect(rendered).toContain('Community Discord')
    })

    /**
     * Tests the TrialEnded template rendering with preview props
     * Verifies that user-specific content and call-to-action elements are present
     */
    test('TrialEnded renders with preview props', async () => {
        const rendered = await renderAsync(React.createElement(TrialEnded, TrialEnded.PreviewProps))
        expect(rendered).toContain('Spongebob Squarepants')
        expect(rendered).toContain('Krusty crab')
        expect(rendered).toContain('has reached the end of its trial')
        expect(rendered).toContain('Upgrade now')
    })

    /**
     * Tests the SubscriptionEnded template rendering with preview props
     * Verifies subscription termination messaging and upgrade options
     */
    test('SubscriptionEnded renders with preview props', async () => {
        const rendered = await renderAsync(React.createElement(SubscriptionEnded, SubscriptionEnded.PreviewProps))
        expect(rendered).toContain('Mike Wazowski')
        expect(rendered).toContain('subscription has ended')
        expect(rendered).toContain('Upgrade Now')
    })

    /**
     * Tests the PaymentIssue template rendering with custom props
     * Verifies payment failure notification and action items
     */
    test('PaymentIssue renders with preview props', async () => {
        const rendered = await renderAsync(
            React.createElement(PaymentIssue, {
                username: 'Test User',
                date: new Date().toDateString()
            })
        )
        expect(rendered).toContain('Test User')
        expect(rendered).toContain('issue with your payment')
        expect(rendered).toContain('Update payment information')
    })

    /**
     * Tests that all email templates contain required common elements
     * Verifies shared layout components, social links, and HTML structure
     *
     * @typedef {Object} EmailTemplate
     * @property {React.FC<any>} Component - The email template component
     * @property {Record<string, unknown>} props - Props for the component
     */
    test('Email templates contain common elements', async () => {
        type EmailTemplate = {
            Component: React.FC<any>
            props: Record<string, unknown>
        }

        const templates: EmailTemplate[] = [
            { Component: WelcomeEmail, props: WelcomeEmail.PreviewProps },
            { Component: TrialEnded, props: TrialEnded.PreviewProps },
            { Component: SubscriptionEnded, props: SubscriptionEnded.PreviewProps },
            {
                Component: PaymentIssue,
                props: { username: 'Test User', date: new Date().toDateString() }
            }
        ]

        for (const { Component, props } of templates) {
            const rendered = await renderAsync(React.createElement(Component, props))

            // Test common layout elements
            expect(rendered).toContain('Connect with us on social media!')
            expect(rendered).toContain('Discord')
            expect(rendered).toContain('GitHub')

            // Test signature
            expect(rendered).toContain('Cheers')

            // Test HTML structure
            expect(rendered).toContain('<html')
            expect(rendered).toContain('<body')
            expect(rendered).toContain('</html>')
        }
    })
})
