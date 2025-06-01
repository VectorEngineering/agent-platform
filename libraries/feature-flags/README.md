# @playbookmedia/feature-flags

A feature flags package built on top of Vercel Flags and PostHog, providing seamless feature flag management with analytics integration.

## Installation

```bash
npm install @playbookmedia/feature-flags
# or
yarn add @playbookmedia/feature-flags
# or
pnpm add @playbookmedia/feature-flags
```

## Features

-   Integration with Vercel Flags
-   PostHog analytics-based feature targeting
-   User-based feature targeting
-   Type-safe feature flag creation
-   Default value fallbacks
-   Server-side feature flag evaluation

## Usage

### Creating Feature Flags

```typescript
import { createFlag } from '@playbookmedia/feature-flags/lib/create-flag'

// Create a new feature flag
export const myNewFeature = createFlag('myNewFeature')

// Create a beta feature flag
export const betaFeature = createFlag('betaFeature')
```

### Using Feature Flags

```typescript
import { myNewFeature } from '@playbookmedia/feature-flags'

// In a server component or API route
export default async function Page() {
    if (await myNewFeature()) {
        return <div>New Feature Enabled!</div>
    }

    return <div>Standard Feature</div>
}
```

### Feature Flag with Analytics

The package automatically integrates with PostHog analytics to determine if a feature should be enabled:

```typescript
// The feature flag system will:
// 1. Check if the user is authenticated
// 2. Query PostHog to see if the feature is enabled for the user
// 3. Fall back to the default value if needed
const isEnabled = await myNewFeature()
```

## Configuration

The package requires configuration through environment variables:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

## Feature Flag Evaluation

Feature flags are evaluated in the following order:

1. Check for authenticated user
2. Query PostHog for feature status
3. Fall back to default value (false)

```typescript
async function evaluateFlag() {
    // Get user context
    const { userId } = await auth()

    if (!userId) {
        return false // Default value
    }

    // Check PostHog
    const isEnabled = await analytics.isFeatureEnabled('flagKey', userId)

    return isEnabled ?? false
}
```

## Best Practices

1. Use descriptive flag names that clearly indicate their purpose
2. Always provide a default value for feature flags
3. Clean up unused feature flags regularly
4. Use PostHog's targeting rules for gradual rollouts
5. Monitor feature flag usage through analytics
6. Document feature flag purposes and expected behaviors
7. Consider performance impact of feature flag checks

## TypeScript Support

The package includes TypeScript definitions for:

-   Flag creation functions
-   Configuration options
-   Return types

```typescript
import { createFlag } from '@playbookmedia/feature-flags/lib/create-flag'

// Type-safe flag creation
const myFlag = createFlag('myFlag')
// myFlag is typed as () => Promise<boolean>
```

## Integration with PostHog

Feature flags are tightly integrated with PostHog for:

-   User targeting
-   A/B testing
-   Gradual rollouts
-   Analytics tracking

Configure feature flags in PostHog to:

-   Target specific users or groups
-   Set percentage-based rollouts
-   Define complex targeting rules
-   Track feature usage

## Error Handling

```typescript
import { myFeature } from '@playbookmedia/feature-flags'

try {
    const isEnabled = await myFeature()
    // Use the feature flag
} catch (error) {
    // Handle any errors (e.g., PostHog API issues)
    console.error('Feature flag evaluation failed:', error)
    return false // Safe default
}
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
