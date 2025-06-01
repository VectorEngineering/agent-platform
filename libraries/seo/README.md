# @playbookmedia/seo

A SEO package providing structured data (JSON-LD) implementation for better search engine optimization and rich snippets.

## Installation

```bash
npm install @playbookmedia/seo
# or
yarn add @playbookmedia/seo
# or
pnpm add @playbookmedia/seo
```

## Features

-   JSON-LD structured data implementation
-   Type-safe schema definitions
-   React components for SEO
-   Schema.org type support
-   TypeScript support
-   Easy integration with Next.js

## Usage

### Basic JSON-LD Implementation

```typescript
import { JsonLd } from '@playbookmedia/seo'
import type { Organization } from '@playbookmedia/seo'

export default function OrganizationPage() {
    const organizationData: Organization = {
        '@type': 'Organization',
        '@context': 'https://schema.org',
        name: 'Playbook Media',
        url: 'https://playbookmedia.io',
        logo: 'https://playbookmedia.io/logo.png'
    }

    return (
        <>
            <JsonLd code={organizationData} />
            {/* Your page content */}
        </>
    )
}
```

### Common Schema Examples

#### Article Schema

```typescript
import { JsonLd } from '@playbookmedia/seo'
import type { Article } from '@playbookmedia/seo'

export default function BlogPost() {
    const articleData: Article = {
        '@type': 'Article',
        '@context': 'https://schema.org',
        headline: 'How to Implement SEO in Next.js',
        author: {
            '@type': 'Person',
            name: 'John Doe'
        },
        datePublished: '2024-01-28',
        image: 'https://example.com/article-image.jpg'
    }

    return <JsonLd code={articleData} />
}
```

#### Product Schema

```typescript
import { JsonLd } from '@playbookmedia/seo'
import type { Product } from '@playbookmedia/seo'

export default function ProductPage() {
    const productData: Product = {
        '@type': 'Product',
        '@context': 'https://schema.org',
        name: 'Premium Widget',
        description: 'The best widget in the market',
        brand: {
            '@type': 'Brand',
            name: 'WidgetCo'
        },
        offers: {
            '@type': 'Offer',
            price: '99.99',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
        }
    }

    return <JsonLd code={productData} />
}
```

#### Local Business Schema

```typescript
import { JsonLd } from '@playbookmedia/seo'
import type { LocalBusiness } from '@playbookmedia/seo'

export default function BusinessPage() {
    const businessData: LocalBusiness = {
        '@type': 'LocalBusiness',
        '@context': 'https://schema.org',
        name: 'Downtown Cafe',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Main St',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            postalCode: '94105',
            addressCountry: 'US'
        },
        openingHours: 'Mo-Fr 09:00-17:00',
        telephone: '+1-415-555-0123'
    }

    return <JsonLd code={businessData} />
}
```

## Schema Types

The package exports all schema types from `schema-dts`:

```typescript
import type {
    Thing,
    Organization,
    Person,
    Product,
    Article,
    LocalBusiness,
    WebSite
    // ... and many more
} from '@playbookmedia/seo'
```

## Best Practices

1. Always validate your schema using Google's Rich Results Test
2. Include only relevant and accurate information
3. Use the most specific schema type possible
4. Keep your structured data up to date
5. Test your implementation in search console
6. Follow Google's structured data guidelines
7. Use TypeScript for type safety

## Testing

You can validate your JSON-LD implementation using:

-   [Google's Rich Results Test](https://search.google.com/test/rich-results)
-   [Schema.org Validator](https://validator.schema.org/)

## Common Schema Properties

### Required Properties

Most schemas require these basic properties:

```typescript
{
  "@context": "https://schema.org",
  "@type": "SchemaType",
  "name": string
}
```

### Optional Properties

Common optional properties include:

```typescript
{
  "description": string,
  "image": string | ImageObject,
  "url": string,
  "identifier": string
}
```

## TypeScript Support

The package provides full TypeScript support through `schema-dts`:

```typescript
import type { WithContext, Thing } from '@playbookmedia/seo'

type JsonLdProps = {
    code: WithContext<Thing>
}
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
