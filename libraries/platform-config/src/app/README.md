# Vector CRM Platform Configuration

This directory contains the core configuration for the Vector CRM Platform. It provides a centralized, type-safe way to manage platform-wide settings and configurations.

## Overview

The platform configuration is organized into several key areas:

1. Platform Identity
2. Environment Settings
3. Security & Compliance
4. Analytics & Tracking
5. API & Integration
6. User Interface
7. Pricing & Billing
8. Feature Management

## Quick Start

```typescript
import { BusinessConfig } from "@platform-config/app";

// Access configuration values
const { platformHost, company } = BusinessConfig;

// Use in components
function Header() {
  return <h1>{BusinessConfig.company}</h1>;
}
```

## Configuration Areas

### Platform Identity

```typescript
const identity = {
  platformHost: "app-business.getvector.app",
  company: "Vector Platform",
  name: "Vector Platform | Personal Finance",
  title: "Vector Platform | Your Personal Financial Assistant",
  description: "A better way to act on your finances.",
};
```

### Environment Settings

```typescript
const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PROD: process.env.NODE_ENV === "production",
  IS_DEV: process.env.NODE_ENV === "development",
};
```

### Security Configuration

```typescript
const security = {
  corsOrigins: ["https://app-business.getvector.app"],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
  },
};
```

### Analytics Configuration

```typescript
const analytics = {
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX",
    debug: ENV.IS_DEV,
  },
  mixpanel: {
    projectToken: "YOUR_TOKEN",
    debug: ENV.IS_DEV,
  },
};
```

### API Configuration

```typescript
const api = {
  baseUrl: ENV.IS_PROD ? "https://api.getvector.app/v1" : "https://api-staging.getvector.app/v1",
  timeout: 30000,
  retryAttempts: 3,
};
```

## Usage Examples

### Platform URLs

```typescript
import { BusinessConfig } from "@platform-config/app";

// Access platform URLs
const {
  platformUrl, // Main application URL
  webUrl, // Marketing website URL
  desktopUrl, // Desktop app URL scheme
  helpUrl, // Help center URL
  uptimeUrl, // Uptime monitoring URL
} = BusinessConfig;

// Use in navigation
function redirectToHelp() {
  window.location.href = BusinessConfig.helpUrl;
}
```

### Authentication & Security

```typescript
import { BusinessConfig } from "@platform-config/app";

// MFA configuration
const mfaSetup = {
  issuer: BusinessConfig.mfaIssuer,
  corsOrigins: BusinessConfig.security.corsOrigins,
};

// Rate limiting
const rateLimits = BusinessConfig.security.rateLimiting;
```

### Payment Integration

```typescript
import { BusinessConfig } from "@platform-config/app";

// Access payment configuration
const { subscriptionLink } = BusinessConfig.payments;
const { customerBillingPortalLink } = BusinessConfig.billings;

// Handle subscription
function redirectToSubscription(planId: string) {
  const url = new URL(subscriptionLink);
  url.searchParams.append("plan", planId);
  window.location.href = url.toString();
}
```

### Pricing Plans

```typescript
import { BusinessConfig } from "@platform-config/app";

// Access pricing plans
const { pricing } = BusinessConfig;

// Find most popular plan
const popularPlan = pricing.find((plan) => plan.isMostPopular);

// Calculate discounted yearly price
function getYearlyDiscount(plan) {
  const monthlyTotal = plan.monthlyPrice * 12;
  return monthlyTotal - plan.yearlyPrice;
}
```

### Feature Management

```typescript
import { BusinessConfig } from "@platform-config/app";

// Check if feature is enabled
if (BusinessConfig.features.enableLeadScoring) {
  // Implement lead scoring
}

// Combine multiple features
if (BusinessConfig.features.enableDealForecasting && BusinessConfig.features.enableAIFeatures) {
  // Implement AI-powered deal forecasting
}
```

## Best Practices

1. **Type Safety**

   - Always use TypeScript types for configuration access
   - Leverage autocompletion for configuration properties
   - Use strict type checking

2. **Environment Awareness**

   - Check environment before using sensitive features
   - Use environment-specific URLs and settings
   - Handle development vs production differences

3. **Security**

   - Never expose sensitive tokens in client-side code
   - Always use HTTPS for external URLs
   - Follow CSP best practices

4. **Performance**
   - Access configuration values efficiently
   - Cache frequently used values
   - Avoid deep cloning of configuration objects

## Contributing

When modifying the platform configuration:

1. Follow the existing structure
2. Add comprehensive documentation
3. Update TypeScript types
4. Consider backward compatibility
5. Test in all environments
6. Update relevant examples

## Related Documentation

- [Feature Flags System](../features/README.md)
- [Type Definitions](../types/README.md)
- [API Documentation](https://api-docs.vectorcrm.com)
