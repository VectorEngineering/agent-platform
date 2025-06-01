# @playbookmedia/auth

A comprehensive authentication package built on top of Clerk.js, providing seamless authentication and user management capabilities for Next.js applications.

## Features

-   🔐 **Secure Authentication**: Built on Clerk's robust authentication system
-   🎨 **Theme Integration**: Seamless integration with your app's theme system
-   🎯 **Type-safe**: Full TypeScript support
-   🎭 **Customizable**: Extensive styling and behavior customization options
-   🌓 **Dark Mode**: Automatic dark mode support
-   🚀 **Next.js 13+ App Router support**: Seamless integration with Next.js App Router
-   📋 **Server-side and client-side authentication**: Robust authentication capabilities

## Installation

```bash
npm install @playbookmedia/auth
# or
yarn add @playbookmedia/auth
# or
pnpm add @playbookmedia/auth
```

## Features

-   Pre-built authentication components
-   Middleware for route protection
-   Customizable UI elements
-   TypeScript support
-   Next.js 13+ App Router support
-   Server-side and client-side authentication

## Usage

### Authentication Components

#### Sign In Component

```typescript
import { SignIn } from '@playbookmedia/auth/components'

export default function SignInPage() {
    return (
        <div>
            <h1>Welcome Back</h1>
            <SignIn />
        </div>
    )
}
```

#### Sign Up Component

```typescript
import { SignUp } from '@playbookmedia/auth/components'

export default function SignUpPage() {
    return (
        <div>
            <h1>Create an Account</h1>
            <SignUp />
        </div>
    )
}
```

### Middleware Implementation

```typescript
// middleware.ts
import { authMiddleware } from '@playbookmedia/auth/middleware'

export default authMiddleware({
    // Your middleware configuration
    publicRoutes: ['/'],
    ignoredRoutes: ['/api/public']
})

// Required for middleware to work correctly
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
```

### Client Usage

```typescript
'use client'

import { useAuth } from '@playbookmedia/auth/client'

export function ProfileButton() {
    const { user, isSignedIn, signOut } = useAuth()

    if (!isSignedIn) {
        return null
    }

    return <button onClick={() => signOut()}>Sign out {user.firstName}</button>
}
```

### Server-Side Usage

```typescript
import { auth } from '@playbookmedia/auth/server'

export default async function Page() {
    const { userId } = auth()

    if (!userId) {
        return <div>Please sign in</div>
    }

    return <div>Your user ID is: {userId}</div>
}
```

## Configuration

The package requires Clerk.js configuration which should be set in your environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

## Component Customization

You can customize the appearance of authentication components:

```typescript
<SignIn
    appearance={{
        elements: {
            header: 'hidden'
            // Add more custom styles
        },
        variables: {
            colorPrimary: '#000000'
            // Add more custom variables
        }
    }}
/>
```

## Protected Routes

Example of protecting routes with the middleware:

```typescript
// middleware.ts
export default authMiddleware({
    publicRoutes: ['/', '/about', '/pricing', '/api/public(.*)'],
    ignoredRoutes: ['/_next/static/(.*)', '/favicon.ico']
})
```

## Best Practices

1. Always protect sensitive routes using the middleware
2. Use server-side authentication checks for data fetching
3. Implement proper error handling for authentication states
4. Keep authentication keys secure using environment variables
5. Use TypeScript for better type safety
6. Follow the principle of least privilege when setting up permissions

## TypeScript Support

The package includes comprehensive TypeScript definitions for:

-   Component props
-   Hook return types
-   Middleware configurations
-   User and session types

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT © [Playbook Media](https://github.com/playbookmedia)

## Related

-   [Clerk](https://clerk.com)
-   [Next.js](https://nextjs.org)
-   [next-themes](https://github.com/pacocoursey/next-themes)
