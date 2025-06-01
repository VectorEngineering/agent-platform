# Vector CRM Platform Type Definitions

This directory contains the core TypeScript type definitions for the Vector CRM Platform. It provides a comprehensive type system that ensures type safety and consistency across the platform.

## Overview

The type system is organized into several key areas:

1. Platform Configuration Types
2. UI Component Types
3. Integration Types
4. Security Types
5. Analytics Types

## Quick Start

```typescript
import type { SiteConfig, PricingPlan, NavItem } from "@platform-config/types";

// Use configuration types
const config: SiteConfig = {
  // Type-safe configuration
};

// Use component types
const navItem: NavItem = {
  title: "Dashboard",
  href: "/dashboard",
  showOnAuth: true,
};
```

## Type Categories

### Platform Configuration

```typescript
type SiteConfig = {
  platformHost: string;
  company: string;
  name: string;
  // ... other configuration properties
};
```

### Navigation Types

```typescript
type NavItem = {
  title: string;
  href: string;
  showOnAuth?: boolean;
};

// Usage example
const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Dashboard", href: "/dashboard", showOnAuth: true },
];
```

### Metadata Types

```typescript
type TwitterMetadata = {
  title: string;
  description: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
};

type OpenGraphMetadata = TwitterMetadata & {
  url: string;
  siteName: string;
  locale: string;
  type: string;
};
```

### Security Types

```typescript
type SecurityConfig = {
  corsOrigins: string[];
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
  };
  contentSecurityPolicy: {
    defaultSrc: string[];
    scriptSrc: string[];
    // ... other CSP directives
  };
};
```

### Analytics Types

```typescript
type AnalyticsConfig = {
  googleAnalytics: {
    measurementId: string;
    debug: boolean;
  };
  mixpanel: {
    projectToken: string;
    debug: boolean;
  };
  segment: {
    writeKey: string;
    debug: boolean;
  };
};
```

## Usage Examples

### Configuration Type Usage

```typescript
import type { SiteConfig } from "@platform-config/types";

function validateConfig(config: SiteConfig): boolean {
  // Type-safe configuration validation
  const { platformHost, company, email, security, features } = config;

  return (
    isValidHost(platformHost) &&
    isValidCompany(company) &&
    isValidEmail(email) &&
    isValidSecurity(security) &&
    isValidFeatures(features)
  );
}
```

### Pricing Plan Types

```typescript
import type { PricingPlan } from "@platform-config/types";

function calculateYearlyDiscount(plan: PricingPlan): number {
  const monthlyTotal = plan.monthlyPrice * 12;
  return monthlyTotal - plan.yearlyPrice;
}

function getPlanFeatures(plan: PricingPlan): string[] {
  return plan.features;
}
```

### Integration Types

```typescript
import type { FinancialEngineConfig } from "@platform-config/types";

function initializeEngine(config: FinancialEngineConfig) {
  const baseUrl = process.env.NODE_ENV === "production" ? config.baseUrlProd : config.baseUrlDev;

  return {
    baseUrl,
    headers: {
      Authorization: `Bearer ${config.bearerToken}`,
    },
  };
}
```

## Best Practices

1. **Type Safety**

   - Use strict TypeScript configuration
   - Avoid using `any` type
   - Leverage union types and intersections
   - Use readonly properties where appropriate

2. **Documentation**

   - Document all types with JSDoc comments
   - Include usage examples
   - Specify property constraints
   - Document breaking changes

3. **Organization**

   - Group related types together
   - Use meaningful type names
   - Keep types focused and single-purpose
   - Use composition over inheritance

4. **Validation**
   - Add runtime type validation where needed
   - Use branded types for special cases
   - Add type guards for complex types

## Type Extensions

### Extending Existing Types

```typescript
// Extend the base configuration
type ExtendedConfig = SiteConfig & {
  customFeature: {
    enabled: boolean;
    config: Record<string, unknown>;
  };
};

// Extend navigation items
type EnhancedNavItem = NavItem & {
  icon?: string;
  badge?: {
    text: string;
    variant: "success" | "warning" | "error";
  };
};
```

### Type Guards

```typescript
function isPricingPlan(plan: unknown): plan is PricingPlan {
  return (
    typeof plan === "object" &&
    plan !== null &&
    "id" in plan &&
    "name" in plan &&
    "features" in plan &&
    "monthlyPrice" in plan &&
    "yearlyPrice" in plan
  );
}
```

## Contributing

When adding or modifying types:

1. Follow TypeScript best practices
2. Add comprehensive JSDoc documentation
3. Include usage examples
4. Consider backward compatibility
5. Update related documentation
6. Add necessary type guards
7. Test with strict TypeScript settings

## Related Documentation

- [Platform Configuration](../app/README.md)
- [Feature Flags System](../features/README.md)
- [TypeScript Guidelines](https://typescript-guidelines.vectorcrm.com)
