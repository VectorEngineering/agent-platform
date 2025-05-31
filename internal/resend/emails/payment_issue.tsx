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
 * Props interface for the PaymentIssue email template
 * @interface Props
 * @property {string} username - The name of the user who will receive the email
 * @property {string} date - The date when the payment issue occurred (formatted as a string)
 */
export type Props = {
    username: string
    date: string
}

/**
 * PaymentIssue email template component
 *
 * This component renders an email notification that is sent to users when
 * there is an issue processing their payment. It includes:
 * - A warning message about the payment failure
 * - The date when the payment failed
 * - A call-to-action button to update payment information
 * - Support contact information
 *
 * @component
 * @param {Props} props - Component props
 * @param {string} props.username - The name of the user who will receive the email
 * @param {string} props.date - The date when the payment issue occurred
 *
 * @example
 * ```tsx
 * <PaymentIssue
 *   username="John Doe"
 *   date="Tue Dec 10 2024"
 * />
 * ```
 */
export function PaymentIssue({ username, date }: Props) {
    return (
        <Layout>
            <Heading className='font-sans text-3xl text-semibold text-center'>{CONSTANTS.TEXT.HEADING}</Heading>
            <Text>Hey {username},</Text>
            <Text>
                We had trouble processing your payment on {date}. Please update your payment information below to prevent your account from
                being downgraded.
            </Text>

            <Section className='text-center py-3'>
                <Button href={CONSTANTS.URLS.BILLING} className='bg-gray-900 text-gray-50 rounded-lg p-3 w-2/3'>
                    {CONSTANTS.TEXT.BUTTON}
                </Button>
            </Section>

            <Hr />
            <Text>
                {CONSTANTS.TEXT.SUPPORT_MESSAGE} <Link href={`mailto:${CONSTANTS.URLS.SUPPORT_EMAIL}`}>{CONSTANTS.URLS.SUPPORT_EMAIL}</Link>{' '}
                {CONSTANTS.TEXT.OR_REPLY}
            </Text>

            <Signature signedBy={CONSTANTS.SIGNATURE.NAME} />
        </Layout>
    )
}

/**
 * Preview props for the PaymentIssue component
 * These props are used when previewing the email template in development
 * @example
 * ```tsx
 * <PaymentIssue {...PaymentIssue.PreviewProps} />
 * ```
 */
PaymentIssue.PreviewProps = {
    username: 'Mr. Yoan Yomba',
    date: 'Tue Dec 10 2024' // Date().toDateString
} satisfies Props

export default PaymentIssue
