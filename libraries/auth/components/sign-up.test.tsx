import { describe, expect, it } from 'vitest'

import { SignUp } from './sign-up'
import { render } from '@testing-library/react'

vi.mock('@clerk/nextjs', () => ({
    SignUp: ({ appearance }: { appearance: any }) => (
        <div data-testid='clerk-sign-up' data-appearance={JSON.stringify(appearance)}>
            Sign Up Component
        </div>
    )
}))

describe('SignUp Component', () => {
    it('renders with correct appearance settings', () => {
        const { container } = render(<SignUp />)
        const signUp = container.querySelector('[data-testid="clerk-sign-up"]')

        expect(signUp).toBeInTheDocument()
        expect(signUp).toHaveAttribute(
            'data-appearance',
            JSON.stringify({
                elements: {
                    header: 'hidden'
                }
            })
        )
    })
})
