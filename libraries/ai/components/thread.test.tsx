import { Thread } from './thread'
import { render } from '@testing-library/react'

describe('Thread Component', () => {
    it('renders with default classes and children', () => {
        const { container } = render(
            <Thread>
                <div data-testid='child'>Test Content</div>
            </Thread>
        )

        const threadDiv = container.firstChild as HTMLElement
        expect(threadDiv).toHaveClass('flex flex-1 flex-col items-start gap-4 overflow-y-auto p-8 pb-0')
        expect(threadDiv.querySelector('[data-testid="child"]')).toBeInTheDocument()
    })

    it('merges custom className prop', () => {
        const { container } = render(<Thread className='custom-class' />)
        const threadDiv = container.firstChild as HTMLElement
        expect(threadDiv).toHaveClass('custom-class')
        expect(threadDiv).toHaveClass('flex flex-1 flex-col items-start gap-4 overflow-y-auto p-8 pb-0')
    })

    it('passes through additional props', () => {
        const { container } = render(<Thread data-testid='thread' id='main-thread' />)
        const threadDiv = container.firstChild as HTMLElement
        expect(threadDiv).toHaveAttribute('id', 'main-thread')
    })
})
