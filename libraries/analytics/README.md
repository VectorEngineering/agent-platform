# @playbookmedia/analytics

A comprehensive analytics package that provides both client-side and server-side tracking capabilities using PostHog.

## Installation

```bash
npm install @playbookmedia/analytics
# or
yarn add @playbookmedia/analytics
# or
pnpm add @playbookmedia/analytics
```

## Features

-   Client-side analytics tracking
-   Server-side analytics tracking
-   React integration with PostHog Provider
-   Automatic page leave tracking
-   Manual pageview capture
-   TypeScript support

## Usage

### Client-Side Implementation

```typescript
'use client'

import { PostHogProvider, analytics } from '@playbookmedia/analytics/posthog/client'

// Wrap your app with the PostHog provider
function App({ children }) {
    return <PostHogProvider>{children}</PostHogProvider>
}

// Track events
analytics.capture('button_clicked', {
    buttonName: 'signup',
    location: 'header'
})

// Identify users
analytics.identify('user123', {
    name: 'John Doe',
    email: 'john@example.com'
})
```

### Server-Side Implementation

```typescript
import { analytics } from '@playbookmedia/analytics/posthog/server'

// Track server-side events
await analytics.capture({
    distinctId: 'user123',
    event: 'server_action_completed',
    properties: {
        action: 'data_processing',
        duration: 1500
    }
})

// Update user properties
await analytics.groupIdentify({
    groupType: 'organization',
    groupKey: 'org123',
    properties: {
        name: 'Acme Corp',
        plan: 'enterprise'
    }
})
```

## Configuration

The package requires PostHog configuration which should be set in your environment variables:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

### Client Configuration Options

The client is configured with these defaults:

-   `api_host: '/ingest'`
-   `capture_pageview: false` (manual capture)
-   `capture_pageleave: true`
-   `person_profiles: 'identified_only'`

### Server Configuration Options

The server client is configured with immediate flushing for serverless environments:

-   `flushAt: 1`
-   `flushInterval: 0`

## Best Practices

1. Always wrap your application with `PostHogProvider` when using client-side tracking
2. Use server-side tracking for sensitive operations
3. Set appropriate user identification early in the user journey
4. Handle analytics errors gracefully
5. Keep your PostHog key secure and use environment variables
6. Consider data privacy regulations when tracking user data

## TypeScript Support

The package includes full TypeScript support with type definitions for:

-   Event properties
-   User properties
-   Configuration options
-   React components

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
