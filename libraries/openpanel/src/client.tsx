/**
 * @fileoverview Client-side OpenPanel analytics integration for Next.js applications.
 * Provides components and utilities for tracking user interactions and events.
 */

import { OpenPanelComponent, type PostEventPayload, useOpenPanel } from '@openpanel/nextjs'

const isProd = process.env.NODE_ENV === 'production'

/**
 * OpenPanel Provider component that initializes the analytics tracking.
 * Should be placed high in your component tree, typically in _app.tsx or layout.tsx
 *
 * @example
 * ```tsx
 * // In _app.tsx or layout.tsx
 * import { Provider as AnalyticsProvider } from './client';
 *
 * export default function App({ Component, pageProps }) {
 *   return (
 *     <AnalyticsProvider>
 *       <Component {...pageProps} />
 *     </AnalyticsProvider>
 *   );
 * }
 * ```
 */
const Provider = () => (
    <OpenPanelComponent
        clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
        trackAttributes={true}
        trackScreenViews={isProd}
        trackOutgoingLinks={isProd}
    />
)

/**
 * Utility function to track custom events in your application.
 * Only tracks events in production environment, logs to console in development.
 *
 * @param options - The tracking options
 * @param options.event - The name of the event to track
 * @param options.properties - Additional properties to track with the event
 *
 * @example
 * ```tsx
 * import { track } from './client';
 *
 * // Track a simple event
 * track({ event: 'button_clicked' });
 *
 * // Track an event with properties
 * track({
 *   event: 'purchase_completed',
 *   amount: 99.99,
 *   currency: 'USD',
 *   productId: 'prod_123'
 * });
 * ```
 */
const track = (options: { event: string } & PostEventPayload['properties']) => {
    const { track: openTrack } = useOpenPanel()

    if (!isProd) {
        console.log('Track', options)
        return
    }

    const { event, ...rest } = options

    openTrack(event, rest)
}

export { Provider, track }
