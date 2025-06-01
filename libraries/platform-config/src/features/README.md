# Feature Flags System

This directory contains the feature flags configuration for the Vector CRM Platform. The system provides a flexible and type-safe way to manage feature rollouts across different environments.

## Directory Structure

```
src/features/
├── README.md           # This documentation file
├── types.ts           # TypeScript type definitions
├── config.ts          # Feature flags configuration
└── index.ts          # Main entry point and processing logic
```

## Quick Start

```typescript
import { activeFeatureFlags } from "@platform-config/features";

// Check if a feature is enabled
if (activeFeatureFlags.enableLeadScoring) {
  // Implement lead scoring functionality
}
```

## Categories

The feature flags are organized into four main categories:

1. **Lead Management & Lifecycle**
2. **Contact Management & Relationships**
3. **Deal Management & Pipeline**
4. **Integrations & Connectivity**

## Usage Examples

### Lead Management

```typescript
import { activeFeatureFlags } from "@platform-config/features";

// Lead Capture
if (activeFeatureFlags.enableLeadCapture) {
  const leadSources = ["webform", "email", "social"];
  // Initialize multi-channel lead capture
  setupLeadCaptureSources(leadSources);
}

// Lead Scoring with AI
if (activeFeatureFlags.enableLeadScoring && activeFeatureFlags.enableLeadQualification) {
  // Combine scoring and BANT qualification
  const score = await calculateLeadScore(lead);
  const qualification = await qualifyLeadBANT(lead);

  if (score > 80 && qualification.isQualified) {
    assignToSalesTeam(lead);
  }
}

// Lead Routing
if (activeFeatureFlags.enableLeadRouting) {
  // Route based on territory and industry
  const territory = determineTerritoryFromLead(lead);
  const assignedRep = await findBestSalesRep({
    territory,
    industry: lead.industry,
    currentCapacity: true,
  });
}
```

### Contact Management

```typescript
import { activeFeatureFlags } from "@platform-config/features";

// Contact Enrichment and Timeline
if (activeFeatureFlags.enableContactEnrichment) {
  // Enrich contact data from third-party sources
  const enrichedData = await enrichContactData(contact.email);
  if (activeFeatureFlags.enableContactTimeline) {
    // Add enrichment event to timeline
    addToTimeline(contact.id, {
      type: "enrichment",
      data: enrichedData,
      timestamp: new Date(),
    });
  }
}

// Contact Relationships
if (activeFeatureFlags.enableContactRelationships) {
  // Map organizational relationships
  const relationships = await mapContactRelationships(contact.id);
  if (activeFeatureFlags.enableContactHierarchy) {
    // Build organizational hierarchy
    const hierarchy = buildOrgHierarchy(relationships);
    visualizeHierarchy(hierarchy);
  }
}
```

### Deal Management

```typescript
import { activeFeatureFlags } from "@platform-config/features";

// Deal Pipeline Management
if (activeFeatureFlags.enableDealStages) {
  // Setup custom pipeline stages
  const pipeline = await configurePipeline({
    stages: ["Qualification", "Discovery", "Proposal", "Negotiation", "Closed"],
    customFields: activeFeatureFlags.enableCustomFields ? customFields : [],
  });
}

// Deal Scoring and Forecasting
if (activeFeatureFlags.enableDealScoring) {
  // Calculate win probability
  const probability = await calculateWinProbability(deal);
  if (activeFeatureFlags.enableDealForecasting) {
    // Generate revenue forecast
    const forecast = await generateRevenueForecast({
      deal,
      probability,
      closingDate: deal.expectedCloseDate,
    });
  }
}
```

### Integrations

```typescript
import { activeFeatureFlags } from "@platform-config/features";

// Email and Calendar Integration
if (activeFeatureFlags.enableEmailIntegration && activeFeatureFlags.enableCalendarIntegration) {
  // Setup email tracking and calendar sync
  const emailConfig = await setupEmailTracking({
    provider: "gmail",
    trackOpens: true,
    trackClicks: true,
  });

  const calendarSync = await setupCalendarSync({
    provider: "google",
    twoWaySync: true,
  });
}

// CRM Data Sync
if (activeFeatureFlags.enableSalesforceIntegration) {
  // Setup Salesforce sync
  const sfSync = await configureSalesforceSync({
    objects: ["Lead", "Contact", "Opportunity"],
    direction: "bidirectional",
    frequency: "realtime",
  });
}
```

## Environment-Based Configuration

Features can be configured differently for development and production environments:

```typescript
{
  name: 'enableFeature',
  description: 'Feature description',
  enabled: false,          // Default state
  enabledInProd: true,     // Production override
  enabledInDev: false      // Development override
}
```

## Adding New Feature Flags

1. Define the feature flag in `config.ts`
2. Add any necessary types to `types.ts`
3. The feature will be automatically processed in `index.ts`

Example:

```typescript
// In config.ts
{
  name: 'enableNewFeature',
  description: 'Description of the new feature',
  enabled: false,
  enabledInProd: true,
  enabledInDev: true
}
```

## Best Practices

1. **Naming Convention**: Use `enable` prefix for all feature flags
2. **Description**: Provide clear, detailed descriptions
3. **Default State**: Consider security implications when setting default state
4. **Environment Overrides**: Use environment overrides for gradual rollouts
5. **Dependencies**: Document any feature flag dependencies
6. **Testing**: Test both enabled and disabled states

## Type Safety

The system is fully typed with TypeScript, providing:

- Autocomplete for feature flag names
- Type checking for feature flag values
- Compile-time validation of feature flag usage

## Contributing

When adding new feature flags:

1. Follow the existing categorization
2. Add comprehensive documentation
3. Include usage examples
4. Consider backward compatibility
5. Update tests if necessary
