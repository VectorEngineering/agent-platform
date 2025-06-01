import { GoogleAnalytics } from './google'
import { PostHogProvider } from './posthog/client'
import type { ReactNode } from 'react'
import { VercelAnalytics } from './vercel'
import { env } from '@playbookmedia/env'

type AnalyticsProviderProps = {
    readonly children: ReactNode
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
    <PostHogProvider>
        {children}
        <VercelAnalytics />
        {env.NODE_ENV !== 'development' && env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
    </PostHogProvider>
)
