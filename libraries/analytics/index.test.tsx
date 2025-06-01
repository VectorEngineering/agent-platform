import { describe, expect, it, vi } from 'vitest'

import { AnalyticsProvider } from './index'
import { render } from '@testing-library/react'

vi.mock('@playbookmedia/env', () => ({
    env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-TEST123'
    }
}))

vi.mock('./google', () => ({
    GoogleAnalytics: ({ gaId }: { gaId: string }) => <div data-testid='ga' data-gaid={gaId} />
}))

vi.mock('./vercel', () => ({
    VercelAnalytics: () => <div data-testid='vercel' />
}))

vi.mock('./posthog/client', () => ({
    PostHogProvider: ({ children }: { children: React.ReactNode }) => <div data-testid='posthog'>{children}</div>
}))

describe('AnalyticsProvider', () => {
    it('renders all analytics providers', () => {
        const { container } = render(
            <AnalyticsProvider>
                <div data-testid='content'>Test Content</div>
            </AnalyticsProvider>
        )

        expect(container.querySelector('[data-testid="posthog"]')).toBeInTheDocument()
        expect(container.querySelector('[data-testid="vercel"]')).toBeInTheDocument()
        expect(container.querySelector('[data-testid="ga"]')).toBeInTheDocument()
        expect(container.querySelector('[data-testid="content"]')).toBeInTheDocument()
    })

    it('passes correct GA ID', () => {
        const { container } = render(
            <AnalyticsProvider>
                <div>Test Content</div>
            </AnalyticsProvider>
        )

        const ga = container.querySelector('[data-testid="ga"]')
        expect(ga).toHaveAttribute('data-gaid', 'G-TEST123')
    })
})
