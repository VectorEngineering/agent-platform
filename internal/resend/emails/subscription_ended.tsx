'use client'

import { Button } from '@react-email/button'
import { Heading } from '@react-email/heading'
import { Hr } from '@react-email/hr'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Layout } from '../src/components/layout'
import { Signature } from '../src/components/signature'

// biome-ignore lint/correctness/noUnusedImports: react-email needs this imported
import * as React from 'react'
import CONSTANTS from '../constants/constants'

/**
 * Props interface for the SubscriptionEnded email component
 * @interface Props
 * @property {string} username - The username of the recipient
 */
export type Props = {
    username: string
}

/**
 * Email template component for when a user's subscription has ended
 * This component renders an email notification informing users that their subscription
 * has expired and provides options to reactivate their subscription.
 *
 * @component
 * @param {Props} props - Component props
 * @param {string} props.username - The username of the recipient
 *
 * @example
 * ```tsx
 * <SubscriptionEnded username="John Doe" />
 * ```
 *
 * @returns {JSX.Element} A React Email component for subscription ended notification
 *
 * @remarks
 * The email includes:
 * - A header announcing the subscription end
 * - Personalized greeting with the user's name
 * - Information about the subscription downgrade
 * - CTA button to upgrade the subscription
 * - Feedback request section
 * - Signature
 */
export function SubscriptionEnded({ username }: Props) {
    return (
        <Layout>
            <Heading className='font-sans text-3xl text-semibold text-center'>
                Your {CONSTANTS.PLATFORM.NAME} subscription has ended.
            </Heading>
            <Text>Hey {username},</Text>
            <Text>
                We're reaching out to let you know that your trial period has come to an end for {CONSTANTS.PLATFORM.NAME} Pro. We have
                downgraded the workspace to Free, which means you lose access to the workspace, but we will retain all your team and key
                data.
            </Text>
            <Text>
                If you want to continue with {CONSTANTS.PLATFORM.NAME} Pro, click the button below, and you can add your credit card.
            </Text>

            <Section className='text-center py-3'>
                <Button href={CONSTANTS.URLS.BILLING} className='bg-gray-900 text-gray-50 rounded-lg p-3 w-2/3'>
                    Upgrade Now
                </Button>
            </Section>

            <Hr />
            <Text>If you have any feedback, please reply to this email. We would love to hear all about it.</Text>

            <Signature signedBy='Yoan Yomba' />
        </Layout>
    )
}

/**
 * Preview props for the email template
 * These props are used for previewing the email template in development
 *
 * @constant
 * @type {Props}
 */
SubscriptionEnded.PreviewProps = {
    username: 'Mike Wazowski'
} satisfies Props

export default SubscriptionEnded
