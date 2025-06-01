import { Message } from './message'
import type { Message as MessageType } from 'ai'
import { render } from '@testing-library/react'

describe('Message Component', () => {
    const userMessage: MessageType = {
        id: '1',
        content: 'Hello, world!',
        role: 'user'
    }

    const assistantMessage: MessageType = {
        id: '2',
        content: '# Heading',
        role: 'assistant'
    }

    it('renders user message with correct styling', () => {
        const { container } = render(<Message data={userMessage} />)
        const messageDiv = container.firstChild as HTMLElement

        expect(messageDiv).toHaveClass('self-end bg-foreground text-background')
        expect(messageDiv).toHaveTextContent(userMessage.content)
    })

    it('renders assistant message with correct styling', () => {
        const { container } = render(<Message data={assistantMessage} />)
        const messageDiv = container.firstChild as HTMLElement

        expect(messageDiv).toHaveClass('self-start bg-muted')
        expect(messageDiv).toHaveTextContent('Heading')
    })

    it('passes markdown props to Markdown component', () => {
        const { container } = render(
            <Message
                data={{
                    ...assistantMessage,
                    content: '# Custom Heading'
                }}
                markdown={{
                    components: {
                        h1: ({ children }) => <h1 className='text-2xl'>{children}</h1>
                    }
                }}
            />
        )

        const h1Element = container.querySelector('h1')
        expect(h1Element).toBeTruthy()
        expect(h1Element).toHaveClass('text-2xl')
        expect(h1Element).toHaveTextContent('Custom Heading')
    })

    it('handles different content lengths', () => {
        const longContent = 'Test content'
        const { container } = render(<Message data={{ ...assistantMessage, content: longContent }} />)
        const messageDiv = container.firstChild as HTMLElement
        expect(messageDiv.textContent?.trim()).toBe(longContent)
    })
})
