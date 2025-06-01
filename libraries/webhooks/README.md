# @playbookmedia/webhooks

A webhook management package built on top of Svix, providing secure and reliable webhook delivery for your application.

## Installation

```bash
npm install @playbookmedia/webhooks
# or
yarn add @playbookmedia/webhooks
# or
pnpm add @playbookmedia/webhooks
```

## Features

-   Secure webhook delivery
-   Organization-based webhook management
-   App portal access for webhook configuration
-   TypeScript support
-   Server-side implementation
-   Automatic organization context handling

## Usage

### Sending Webhooks

```typescript
import { send } from '@playbookmedia/webhooks'

// Send a webhook event
await send('user.created', {
    userId: '123',
    email: 'user@example.com',
    createdAt: new Date().toISOString()
})

// Send a webhook event with custom payload
await send('order.completed', {
    orderId: 'order_123',
    total: 99.99,
    currency: 'USD',
    items: [{ id: 'item_1', quantity: 2 }]
})
```

### Managing Webhook Endpoints

```typescript
import { getAppPortal } from '@playbookmedia/webhooks'

// Get the app portal URL for webhook configuration
export async function WebhookConfigPage() {
    const portalData = await getAppPortal()

    if (!portalData) {
        return <div>Not authorized</div>
    }

    return (
        <div>
            <h1>Webhook Configuration</h1>
            <a href={portalData.url}>Configure Webhooks</a>
        </div>
    )
}
```

## Configuration

The package requires Svix configuration which should be set in your environment variables:

```env
SVIX_TOKEN=your_svix_token_here
```

## Event Types

Common event types that can be used with the `send` function:

```typescript
// User events
'user.created'
'user.updated'
'user.deleted'

// Order events
'order.created'
'order.updated'
'order.completed'
'order.cancelled'

// Payment events
'payment.succeeded'
'payment.failed'
'payment.refunded'

// Subscription events
'subscription.created'
'subscription.updated'
'subscription.cancelled'
```

## Payload Structure

All webhook payloads follow this structure:

```typescript
{
  eventType: string;  // The type of event
  [key: string]: any; // Additional event-specific data
}
```

## Organization Context

The package automatically handles organization context using `@playbookmedia/auth`:

```typescript
// The organization ID is automatically retrieved from the auth context
const { orgId } = await auth()

// Webhooks are scoped to the organization
await send('event.type', {
    // payload data
})
```

## Error Handling

```typescript
import { send } from '@playbookmedia/webhooks'

try {
    await send('event.type', payload)
} catch (error) {
    if (error.message === 'SVIX_TOKEN is not set') {
        // Handle configuration error
    } else {
        // Handle other errors
    }
}
```

## Best Practices

1. Always validate your webhook payload before sending
2. Use meaningful and consistent event types
3. Include timestamp information in your payloads
4. Handle webhook delivery failures gracefully
5. Monitor webhook delivery status
6. Keep your Svix token secure using environment variables
7. Implement proper error handling

## TypeScript Support

The package includes TypeScript definitions for:

-   Event types
-   Payload structures
-   Configuration options
-   Function parameters and return types

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
