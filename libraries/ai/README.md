# @playbookmedia/ai

A modern, type-safe AI chat components and utilities library for Next.js applications. This package provides reusable components and utilities for building AI-powered chat interfaces with OpenAI.

## Features

-   🎯 **Type-safe**: Built with TypeScript for robust type checking and better developer experience
-   🎨 **Customizable**: Flexible components that can be styled with Tailwind CSS
-   🔒 **Secure**: Safe handling of API keys and environment variables
-   ⚡ **Performant**: Optimized for Next.js applications
-   🧩 **Modular**: Use only what you need with tree-shakeable exports

## Installation

```bash
# Using pnpm (recommended)
pnpm add @playbookmedia/ai

# Using npm
npm install @playbookmedia/ai

# Using yarn
yarn add @playbookmedia/ai
```

## Quick Start

1. Set up your OpenAI API key in your environment variables:

```env
OPENAI_API_KEY=your_api_key_here
```

2. Import and use the components:

```tsx
import { Message, Thread } from '@playbookmedia/ai'
import type { Message as MessageType } from 'ai'

export default function Chat() {
    const messages: MessageType[] = [
        { id: '1', role: 'user', content: 'Hello!' },
        { id: '2', role: 'assistant', content: 'Hi there! How can I help you?' }
    ]

    return (
        <Thread>
            {messages.map((message) => (
                <Message key={message.id} data={message} />
            ))}
        </Thread>
    )
}
```

## Components

### Thread

A container component for displaying a sequence of chat messages.

```tsx
import { Thread } from '@playbookmedia/ai'
;<Thread className='custom-class'>{/* Messages go here */}</Thread>
```

#### Props

-   `children`: React nodes to render within the thread
-   `className`: Optional custom CSS classes (merged with default styles)
-   `...props`: All standard HTML div props are supported

### Message

A component for rendering individual chat messages with support for Markdown content.

```tsx
import { Message } from '@playbookmedia/ai'
import type { Message as MessageType } from 'ai'

const message: MessageType = {
  id: '1',
  role: 'assistant',
  content: '# Hello\nThis is a message with **Markdown** support.'
}

<Message
  data={message}
  markdown={{
    components: {
      h1: ({ children }) => (
        <h1 className="text-2xl font-bold">{children}</h1>
      )
    }
  }}
/>
```

#### Props

-   `data`: Message object containing:
    -   `id`: Unique identifier
    -   `role`: 'user' | 'assistant'
    -   `content`: Message content (supports Markdown)
-   `markdown`: Optional configuration for react-markdown
    -   `components`: Custom components for rendering Markdown elements

## Utilities

### AI Provider

A pre-configured OpenAI provider for use with the Vercel AI SDK.

```tsx
import { provider } from '@playbookmedia/ai/lib/provider'

// Use with Vercel AI SDK
const completion = await provider.chat({
    messages: [{ role: 'user', content: 'Hello!' }]
})
```

## Styling

The components use Tailwind CSS for styling and can be customized using the `className` prop. Default styles include:

-   Thread: Flexbox container with vertical layout and scrolling
-   Message: Role-based styling (user/assistant) with rounded corners and appropriate colors

## TypeScript Support

This package is written in TypeScript and includes full type definitions. For the best development experience, use TypeScript in your project.

```tsx
import type { Message as MessageType } from 'ai'

// Message type includes:
interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Playbook Media](https://github.com/playbookmedia)

## Related

-   [Vercel AI SDK](https://github.com/vercel/ai)
-   [OpenAI API](https://platform.openai.com/docs/api-reference)
-   [React Markdown](https://github.com/remarkjs/react-markdown)
