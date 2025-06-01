import { describe, expect, it, vi } from 'vitest'

import { SignIn } from './sign-in'
import { render } from '@testing-library/react'

vi.mock('@clerk/nextjs', () => ({
    SignIn: ({ appearance }: { appearance: any }) => (
        <div data-testid='clerk-sign-in' data-appearance={JSON.stringify(appearance)}>
            Sign In Component
        </div>
    )
}))

describe('SignIn Component', () => {
    it('renders with correct appearance settings', () => {
        const { container } = render(<SignIn />)
        const signIn = container.querySelector('[data-testid="clerk-sign-in"]')

        expect(signIn).toBeInTheDocument()
        expect(signIn).toHaveAttribute(
            'data-appearance',
            JSON.stringify({
                elements: {
                    header: 'hidden'
                }
            })
        )
    })
})
