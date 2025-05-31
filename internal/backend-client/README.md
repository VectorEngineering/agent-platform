# @playbookmedia/backend-client

This package provides a robust and flexible client for interacting with backend services. It's designed to be used as an internal module within a larger project.

## Features

- Configurable API service with support for multiple endpoints
- Token-based authentication
- Middleware support for request/response manipulation
- Error handling and logging
- TypeScript support

## Installation

As this is an internal package, you can include it in your project by adding it to your `package.json`:

```json
"dependencies": {
    "@internal/backend-client": "1.0.0"
}
```

## Usage

### Initializing the API Service

```typescript
import { ApiServiceFactory } from '@internal/backend-client/client'

// Initialize with default configuration
const apiService = ApiServiceFactory.getInstance()
// Or initialize with custom configuration
const customConfig = {
    apiUrl: 'https://api.example.com',
    token: 'your-auth-token',
    timeout: 5000
}
ApiServiceFactory.initialize(customConfig)
```

### Making API Calls

```typescript
const userService = apiService.getUserServiceV2Api()
const users = await userService.getUsers()
```

### Managing Authentication

```typescript
// Set a new token
apiService.setToken('new-auth-token')
// Get the current token
const currentToken = apiService.getToken()
```

### Adding Custom Middleware

```typescript
import { Middleware } from 'client-typescript-sdk'

const customMiddleware: Middleware = {
    pre: async (context) => {
        // Modify request before sending
    },
    post: async (context) => {
        // Process response after receiving
    },
    onError: async (context) => {
        // Handle errors
    }
}
ApiServiceFactory.addMiddleware(customMiddleware)
```

## Configuration

The API client can be configured using environment variables:

- `API_URL`: The base URL for the API
- `API_TOKEN`: Authentication token
- `API_TIMEOUT`: Request timeout in milliseconds
- `API_KEY`: API key for authentication

## Development

### Scripts

- `npm run clean`: Remove build artifacts and node_modules
- `npm run format`: Format code using Biome
- `npm run lint`: Lint code using Biome
- `npm run test`: Run tests using Jest
- `npm run typecheck`: Run TypeScript type checking

### Testing

Tests are written using Jest. Run the test suite with:

```bash
npm run test
```
