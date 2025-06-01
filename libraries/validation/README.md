# @playbookmedia/validation

A validation package built on top of Zod, providing reusable validation schemas for common data types across the application.

## Installation

```bash
npm install @playbookmedia/validation
# or
yarn add @playbookmedia/validation
# or
pnpm add @playbookmedia/validation
```

## Features

-   Pre-built validation schemas
-   Type-safe validation
-   Reusable validation rules
-   Consistent validation across the application
-   TypeScript support
-   Built on Zod for robust type inference

## Usage

### Basic Validation

```typescript
import { validation } from '@playbookmedia/validation'

// Validate an identifier
try {
    const validId = validation.identifier.parse('my-valid-id-123')
    // validId is type-safe and validated
} catch (error) {
    // Handle validation error
}

// Validate a name
const nameResult = validation.name.safeParse('My Project Name')
if (nameResult.success) {
    // Use the validated name
    const name = nameResult.data
} else {
    // Handle validation error
    console.error(nameResult.error)
}
```

### Schema Types

#### Identifier Validation

```typescript
import { validation } from '@playbookmedia/validation'

// Valid identifiers
validation.identifier.parse('my-project-123') // ✅
validation.identifier.parse('user_profile') // ✅
validation.identifier.parse('app.config') // ✅
validation.identifier.parse('v1:api') // ✅

// Invalid identifiers
validation.identifier.parse('my project') // ❌ Contains spaces
validation.identifier.parse('ab') // ❌ Too short
validation.identifier.parse('$special') // ❌ Invalid characters
```

#### Name Validation

```typescript
import { validation } from '@playbookmedia/validation'

// Valid names
validation.name.parse('My Project Name') // ✅
validation.name.parse('User Profile 123') // ✅
validation.name.parse('App Configuration') // ✅

// Invalid names
validation.name.parse('ab') // ❌ Too short
validation.name.parse('A'.repeat(257)) // ❌ Too long
```

#### Description Validation

```typescript
import { validation } from '@playbookmedia/validation'

// Valid descriptions
validation.description.parse('This is a valid description') // ✅
validation.description.parse('Project details go here: 123') // ✅

// Invalid descriptions
validation.description.parse('ab') // ❌ Too short
validation.description.parse('A'.repeat(257)) // ❌ Too long
```

#### Solomon AI ID Validation

```typescript
import { validation } from '@playbookmedia/validation'

// Valid Solomon AI IDs
validation.solomonAiId.parse('abc_12345678') // ✅
validation.solomonAiId.parse('xyz_abcdef123456') // ✅

// Invalid Solomon AI IDs
validation.solomonAiId.parse('abcd_12345678') // ❌ Prefix too long
validation.solomonAiId.parse('ab_12345678') // ❌ Prefix too short
validation.solomonAiId.parse('123_12345678') // ❌ Invalid prefix characters
validation.solomonAiId.parse('abc_123') // ❌ ID part too short
validation.solomonAiId.parse('abc_123$%^') // ❌ Invalid ID characters
```

## Validation Rules

### Identifier Rules

-   Minimum length: 3 characters
-   Maximum length: 256 characters
-   Allowed characters: alphanumeric, underscores, periods, colons, and hyphens
-   URL-safe format

### Name Rules

-   Minimum length: 3 characters
-   Maximum length: 256 characters
-   Any characters allowed
-   Not intended for URL usage

### Description Rules

-   Minimum length: 3 characters
-   Maximum length: 256 characters
-   Any characters allowed
-   Not intended for URL usage

### Solomon AI ID Rules

-   Format: `prefix_id`
-   Prefix must be exactly 3 lowercase letters
-   ID part must be at least 8 alphanumeric characters
-   No special characters in ID part

## Type Safety

The package provides full TypeScript support:

```typescript
import { validation } from '@playbookmedia/validation'
import { z } from 'zod'

// Get inferred types from schemas
type Identifier = z.infer<typeof validation.identifier>
type Name = z.infer<typeof validation.name>
type Description = z.infer<typeof validation.description>
type SolomonAiId = z.infer<typeof validation.solomonAiId>
```

## Best Practices

1. Always use type inference with TypeScript
2. Handle validation errors appropriately
3. Use `safeParse` when you need to handle validation errors gracefully
4. Use `parse` when you want to throw on invalid data
5. Consider using validation schemas in your API routes and forms
6. Keep validation consistent across your application

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
