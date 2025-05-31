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
 * Props interface for the TrialEnded email component
 * @interface Props
 * @property {string} username - The username of the recipient
 * @property {string} workspaceName - The name of the workspace whose trial has ended
 */
export type Props = {
    username: string
    workspaceName: string
}

/**
 * Email template component for when a workspace's trial period has ended
 * This component renders an email notification informing users about their trial expiration
 * and provides detailed information about Pro plan benefits and upgrade options.
 *
 * @component
 * @param {Props} props - Component props
 * @param {string} props.workspaceName - The name of the workspace whose trial has ended
 * @param {string} props.username - The username of the recipient
 *
 * @example
 * ```tsx
 * <TrialEnded
 *   username="John Doe"
 *   workspaceName="My Workspace"
 * />
 * ```
 *
 * @returns {JSX.Element} A React Email component for trial ended notification
 *
 * @remarks
 * The email includes:
 * - A header announcing the trial end for the specific workspace
 * - Personalized greeting with the user's name
 * - Information about the trial period completion
 * - Detailed list of Pro plan benefits including:
 *   - Monthly active keys quota
 *   - Monthly verifications quota
 *   - Rate limits
 *   - Team features
 *   - Analytics and audit log retention
 * - CTA button for upgrade
 * - Support contact information
 * - Signature
 */
export function TrialEnded({ workspaceName, username }: Props) {
    return (
        <Layout>
            <Heading className='font-sans text-3xl text-semibold text-center'>
                Your workspace <strong>{workspaceName}</strong> has reached the end of its trial.
            </Heading>
            <Text>Hey {username},</Text>
            <Text>
                We hope you've enjoyed your two-week {CONSTANTS.PLATFORM.NAME} Pro trial for your workspace <strong>{workspaceName}</strong>
                .
            </Text>

            <Text>Since your trial ended, please add a payment method to keep all features of the Pro plan.</Text>

            <Section>
                <Text className='font-semibold'>
                    It's simple to upgrade and enjoy the benefits of the {CONSTANTS.PLATFORM.NAME} Pro plan:
                </Text>
                <ul>
                    <li className='pb-4'>
                        {' '}
                        Process up to 1M monthly transactions <span className='italic text-sm'>(free tier limited to 1k transactions)</span>
                    </li>
                    <li className='pb-4'>
                        {' '}
                        150k monthly payment verifications included{' '}
                        <span className='italic text-sm'>(free tier limited to 2.5k per month)</span>
                    </li>
                    <li className='pb-4'>
                        {' '}
                        Enhanced fraud protection with 2.5M monthly checks{' '}
                        <span className='italic text-sm'>(free tier limited to 100k per month)</span>
                    </li>
                </ul>
                <Text className='font-semibold'>Pro workspaces also receive:</Text>
                <ul>
                    <li className='pb-4'> Unlimited team access for seamless financial operations management</li>
                    <li className='pb-4'> 90-day detailed transaction analytics</li>
                    <li className='pb-4'> 90-day financial audit trail for compliance</li>
                    <li className='pb-4'> Priority Support from our financial experts</li>
                </ul>
            </Section>

            <Section className='text-center py-3'>
                <Button href={CONSTANTS.URLS.BILLING} className='bg-gray-900 text-gray-50 rounded-lg p-3 w-2/3'>
                    Upgrade now
                </Button>
            </Section>

            <Hr />

            <Text>
                Need help? Please reach out to <Link href={CONSTANTS.URLS.SUPPORT_EMAIL}>{CONSTANTS.URLS.SUPPORT_EMAIL}</Link> or just reply
                to this email.
            </Text>

            <Signature signedBy={CONSTANTS.SIGNATURE.NAME} />
        </Layout>
    )
}

/**
 * Preview props for the email template
 * These props are used for previewing the email template in development environment
 *
 * @constant
 * @type {Props}
 *
 * @example
 * Used in email preview mode:
 * ```tsx
 * const preview = <TrialEnded {...TrialEnded.PreviewProps} />;
 * ```
 */
TrialEnded.PreviewProps = {
    username: 'Spongebob Squarepants',
    workspaceName: 'Krusty crab'
} satisfies Props

export default TrialEnded
