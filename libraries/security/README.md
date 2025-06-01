# @playbookmedia/security

A security package that provides protection against common attacks and bot detection using Arcjet.

## Installation

```bash
npm install @playbookmedia/security
# or
yarn add @playbookmedia/security
# or
pnpm add @playbookmedia/security
```

## Features

-   Bot detection and filtering
-   Rate limiting protection
-   Shield against common attacks
-   IP-based request characteristics

## Usage

### Basic Implementation

```typescript
import { secure } from '@playbookmedia/security'

// Allow specific bot categories
await secure(['SEARCH_ENGINE', 'SOCIAL_MEDIA'])

// Block all bots except Google
await secure(['GOOGLE'])
```

### Custom Request Implementation

```typescript
import { secure } from '@playbookmedia/security'

// Pass a custom request object
const customRequest = new Request('https://your-api.com')
await secure(['SEARCH_ENGINE'], customRequest)
```

### Error Handling

The package throws different errors based on the type of violation:

```typescript
try {
    await secure(['SEARCH_ENGINE'])
} catch (error) {
    if (error.message === 'No bots allowed') {
        // Handle bot detection
    } else if (error.message === 'Rate limit exceeded') {
        // Handle rate limiting
    } else if (error.message === 'Access denied') {
        // Handle other security violations
    }
}
```

## Configuration

The package requires an Arcjet API key which should be set in your environment variables:

```env
ARCJET_KEY=your_arcjet_key_here
```

## Bot Categories

Supported bot categories include:

-   SEARCH_ENGINE
-   SOCIAL_MEDIA
-   GOOGLE
-   BING
-   YAHOO
-   DUCKDUCKGO
-   And more...

## Error Messages

-   `No bots allowed`: Thrown when an unauthorized bot is detected
-   `Rate limit exceeded`: Thrown when rate limits are exceeded
-   `Access denied`: Thrown for other security violations

## Best Practices

1. Always handle security errors appropriately in your application
2. Use specific bot allowlists rather than allowing all bots
3. Keep your Arcjet API key secure and never expose it in client-side code
4. Monitor your security logs for potential threats

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
