import { PostHogProvider, analytics } from './client'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@testing-library/react'

vi.mock('@playbookmedia/env', () => ({
    env: {
        NEXT_PUBLIC_POSTHOG_KEY: 'test-key',
        NEXT_PUBLIC_POSTHOG_HOST: 'https://test.posthog.com'
    }
}))

vi.mock('posthog-js', () => ({
    default: {
        init: vi.fn().mockReturnValue({
            capture: vi.fn(),
            identify: vi.fn()
        })
    }
}))

describe('PostHog Client', () => {
    it('initializes PostHog with correct configuration', () => {
        expect(analytics).toBeDefined()
        expect(analytics.capture).toBeDefined()
    })

    it('renders PostHogProvider with children', () => {
        const { container } = render(
            <PostHogProvider>
                <div data-testid='child'>Test Child</div>
            </PostHogProvider>
        )

        expect(container.querySelector('[data-testid="child"]')).toBeInTheDocument()
    })
})
