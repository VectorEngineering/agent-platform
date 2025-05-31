# @playbookmedia/db

A database schema package providing type-safe database access using Drizzle ORM.

## Features

- 🔑 Key Authentication & Management
- 👥 RBAC (Role-Based Access Control)
- 🚦 Rate Limiting
- 🔒 Secret Management
- 🪝 Webhook Support
- 📊 Audit Logging
- 🔍 Identity Management
- 🌐 API Gateway
- ⚡ Vercel Integration

## Installation

```bash
pnpm add @playbookmedia/db
```

## Usage

```typescript
import { drizzle } from '@playbookmedia/db'
import { connect } from '@planetscale/database'
const connection = connect({
    url: process.env.DATABASE_URL
})
const db = drizzle(connection)
```

## Schema Overview

### Authentication & Authorization

- `keys` - API key management
- `keyAuth` - Key authentication configuration
- `permissions` - RBAC permissions
- `roles` - RBAC roles

### Rate Limiting

- `ratelimitNamespaces` - Rate limit groupings
- `ratelimitOverrides` - Custom rate limit configurations

### Monitoring & Logging

- `auditLog` - Activity tracking
- `verificationMonitors` - Usage monitoring

### Integration

- `vercelIntegrations` - Vercel platform integration
- `vercelBindings` - Vercel environment bindings
- `webhooks` - Webhook configuration and delivery

### Infrastructure

- `workspaces` - Multi-tenant workspace management
- `secrets` - Encrypted secrets storage
- `gateways` - API gateway configuration
- `identities` - Identity management

## Development

### Prerequisites

- Node.js 18+
- pnpm
- MySQL compatible database (PlanetScale recommended)
