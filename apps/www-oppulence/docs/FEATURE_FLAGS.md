# Feature Flags Documentation

This document outlines the feature flags used in the application to conditionally enable/disable features based on environment.

## Header Component Feature Flags

The header component uses several environment variables to control the visibility of various UI elements:

| Environment Variable               | Purpose                                           |
| ---------------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_ENABLE_AUTH_BUTTON`   | Controls the display of the authentication button |
| `NEXT_PUBLIC_ENABLE_GITHUB_LINK`   | Controls the display of the GitHub link           |
| `NEXT_PUBLIC_ENABLE_DOWNLOAD_LINK` | Controls the display of the download link         |
| `NEXT_PUBLIC_ENABLE_STATUS_LINK`   | Controls the display of the status link           |
| `NEXT_PUBLIC_ENABLE_DOCS_LINK`     | Controls the display of the documentation link    |

## Usage

1. To enable a feature, set the corresponding environment variable to `"true"` in your `.env` or `.env.local` file:

```
NEXT_PUBLIC_ENABLE_AUTH_BUTTON=true
```

2. To disable a feature, either set the value to anything other than `"true"` or remove the variable entirely:

```
NEXT_PUBLIC_ENABLE_AUTH_BUTTON=false
```

3. All feature flags are prefixed with `NEXT_PUBLIC_` to make them accessible in the browser.

## Implementation

The feature flags are implemented using a type-safe system located in `utils/feature-flags.ts`:

```typescript
// Enum of available feature flags
export enum FeatureFlag {
  AUTH_BUTTON = "AUTH_BUTTON",
  GITHUB_LINK = "GITHUB_LINK",
  DOWNLOAD_LINK = "DOWNLOAD_LINK",
  STATUS_LINK = "STATUS_LINK",
  DOCS_LINK = "DOCS_LINK",
  // Add new feature flags here
}

// Type-safe function to check if a feature is enabled
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  if (typeof process === "undefined") return false;

  // Check if the environment variable exists and is set to "true"
  return process.env[`NEXT_PUBLIC_ENABLE_${feature}`] === "true";
}
```

### Using Feature Flags in Components

To use feature flags in your components:

```typescript
import { FeatureFlag, isFeatureEnabled } from "@/utils/feature-flags";

// In your component:
const showAuthButton = isFeatureEnabled(FeatureFlag.AUTH_BUTTON);

// In JSX:
{showAuthButton && <AuthButton />}
```

### Adding New Feature Flags

To add a new feature flag:

1. Add the new flag to the `FeatureFlag` enum in `utils/feature-flags.ts`
2. Add the corresponding environment variable to your `.env` file
3. Update this documentation with the new flag details
