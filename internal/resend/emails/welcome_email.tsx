'use client'
import { Button } from '@react-email/button'
import { Heading } from '@react-email/heading'
import { Hr } from '@react-email/hr'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
// biome-ignore lint/correctness/noUnusedImports: react-email needs this imported
import * as React from 'react'
import CONSTANTS from '../constants/constants'
import { Layout } from '../src/components/layout'
import { Signature } from '../src/components/signature'

/**
 * Props interface for the WelcomeEmail component
 * @interface Props
 * @property {string} username - The username of the new user
 * @property {string} date - The date when the user signed up
 */
export type Props = {
    username: string
    date: string
}

/**
 * Email template component for welcoming new users to the platform
 * This component renders a friendly welcome email that introduces the platform
 * and provides essential resources for getting started.
 *
 * @component
 * @param {Props} props - Component props
 *
 * @example
 * ```tsx
 * <WelcomeEmail
 *   username="John Doe"
 *   date="2024-03-20"
 * />
 * ```
 *
 * @returns {JSX.Element} A React Email component for the welcome message
 *
 * @remarks
 * The email includes:
 * - A warm welcome message from a co-founder
 * - Introduction to the platform's core value proposition
 * - Essential resources section with:
 *   - Quickstart guides
 *   - API documentation
 *   - Community Discord link
 * - Dashboard access button
 * - Personal touch with feedback request
 * - Signature with a personal P.S. note
 *
 * The email is designed to:
 * - Make new users feel welcomed
 * - Provide immediate access to key resources
 * - Establish a personal connection
 * - Encourage platform engagement
 */
export function WelcomeEmail() {
    return (
        <Layout>
            <Heading className='font-sans text-3xl font-semibold text-center'>Welcome to {CONSTANTS.PLATFORM.NAME}!</Heading>
            <Text>Hi there!</Text>
            <Text>
                I'm {CONSTANTS.SIGNATURE.NAME}, one of {CONSTANTS.PLATFORM.NAME}'s co-founders. {CONSTANTS.PLATFORM.NAME}'s API Development
                platform is the fastest way from idea to production.
            </Text>
            <Section>
                <Text className='font-semibold'>To support your journey, we’ve compiled a list of essential resources:</Text>
                <ul className='pb-4 text-sm'>
                    <li className='pt-4'>
                        {' '}
                        <Link href={CONSTANTS.URLS.ONBOARDING}>Quickstart Guides</Link> - Our complete series of guides will help you
                        integrate {CONSTANTS.PLATFORM.NAME} step by step.
                    </li>
                    <li className='pt-4'>
                        <Link href={CONSTANTS.URLS.API_REFERENCE}> API Documentation</Link> - Our API reference documentation will help you
                        understand and use our API features to their fullest potential.
                    </li>
                    <li className='pt-4'>
                        {' '}
                        <Link href={CONSTANTS.URLS.DISCORD}>{CONSTANTS.PLATFORM.NAME} Community Discord </Link> - Connect with other users,
                        share insights, ask questions, and find solutions within our community.
                    </li>
                </ul>
            </Section>

            <Section className='text-center py-3'>
                <Button href={CONSTANTS.URLS.DASHBOARD} className='bg-gray-900 text-gray-50 rounded-lg p-3 w-2/3'>
                    Go to your dashboard
                </Button>
            </Section>

            <Hr />
            <Text>Also, just curious - how did you hear about {CONSTANTS.PLATFORM.NAME}?</Text>

            <Signature signedBy={CONSTANTS.SIGNATURE.NAME} />
            <Text className='text-xs'>
                P.S. - if you have any questions or feedback, reply to this email. I read and reply to every single one.
            </Text>
        </Layout>
    )
}

/**
 * Preview props for the welcome email template
 * These props are used for previewing the email template in development environment
 *
 * @constant
 * @type {Props}
 *
 * @example
 * Used in email preview mode:
 * ```tsx
 * const preview = <WelcomeEmail {...WelcomeEmail.PreviewProps} />;
 * ```
 */
WelcomeEmail.PreviewProps = {
    username: 'New User',
    date: new Date().toISOString()
} satisfies Props

export default WelcomeEmail
