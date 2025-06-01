/**
 * @fileoverview Server-side OpenPanel analytics integration for Next.js applications.
 * Provides utilities for server-side tracking and user identification.
 */

import { OpenPanel, type PostEventPayload } from '@openpanel/nextjs'
import { waitUntil } from '@vercel/functions'

/**
 * Configuration options for setting up analytics
 */
type Props = {
    /** Unique identifier for the user */
    userId?: string
    /** User's full name (format: "First Last") */
    fullName?: string | null
}

/**
 * Initializes the OpenPanel analytics client for server-side tracking.
 * Automatically identifies users if userId and fullName are provided.
 *
 * @param options - Configuration options for analytics setup
 * @returns An object containing the track method for server-side event tracking
 *
 * @example
 * ```ts
 * // Initialize analytics without user identification
 * const analytics = await setupAnalytics();
 *
 * // Initialize analytics with user identification
 * const analytics = await setupAnalytics({
 *   userId: 'user_123',
 *   fullName: 'John Doe'
 * });
 *
 * // Track an event server-side
 * analytics.track({
 *   event: 'server_action_completed',
 *   actionId: 'action_123',
 *   status: 'success'
 * });
 * ```
 */
export const setupAnalytics = async (options?: Props) => {
    const { userId, fullName } = options ?? {}

    const client = new OpenPanel({
        clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!,
        clientSecret: process.env.OPENPANEL_SECRET_KEY!
    })

    if (userId && fullName) {
        const [firstName, lastName] = fullName.split(' ')

        waitUntil(
            client.identify({
                profileId: userId,
                firstName,
                lastName
            })
        )
    }

    return {
        /**
         * Tracks an event server-side. Only tracks in production environment.
         *
         * @param options - The tracking options
         * @param options.event - The name of the event to track
         * @param options.properties - Additional properties to track with the event
         *
         * @example
         * ```ts
         * // In an API route or server action
         * const analytics = await setupAnalytics();
         *
         * analytics.track({
         *   event: 'payment_processed',
         *   amount: 199.99,
         *   currency: 'USD',
         *   paymentMethod: 'credit_card'
         * });
         * ```
         */
        track: (options: { event: string } & PostEventPayload['properties']) => {
            if (process.env.NODE_ENV !== 'production') {
                console.log('Track', options)
                return
            }

            const { event, ...rest } = options

            waitUntil(client.track(event, rest))
        }
    }
}
