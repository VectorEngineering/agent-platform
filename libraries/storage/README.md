# @playbookmedia/storage

A storage package built on top of Vercel Blob, providing seamless blob storage capabilities for your application.

## Installation

```bash
npm install @playbookmedia/storage
# or
yarn add @playbookmedia/storage
# or
pnpm add @playbookmedia/storage
```

## Features

-   Seamless integration with Vercel Blob
-   Client-side and server-side storage capabilities
-   Type-safe API
-   Secure file uploads and downloads
-   URL generation for stored files
-   Automatic content type detection

## Usage

### Server-Side Storage

```typescript
import { put, del, list } from '@playbookmedia/storage'

// Upload a file
const { url } = await put('my-file.txt', Buffer.from('Hello, World!'), {
    access: 'public',
    addRandomSuffix: true
})

// List files
const { blobs } = await list()

// Delete a file
await del('my-file.txt')
```

### Client-Side Upload

```typescript
import { upload } from '@playbookmedia/storage/client'

// Handle file upload from a form
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const file = event.currentTarget.file.files[0]

    const { url } = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload'
    })

    console.log('File uploaded:', url)
}
```

### API Route for Client Upload

```typescript
// app/api/upload/route.ts
import { handleUpload } from '@playbookmedia/storage'

export async function POST(request: Request) {
    try {
        const response = await handleUpload(request)
        return response
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
```

## Configuration

The package requires Vercel Blob configuration which should be set in your environment variables:

```env
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

## File Access Control

You can control file access using the `access` parameter:

```typescript
// Public file
const { url: publicUrl } = await put('public-file.txt', data, {
    access: 'public'
})

// Private file
const { url: privateUrl } = await put('private-file.txt', data, {
    access: 'private'
})
```

## URL Generation

```typescript
import { getUrl } from '@playbookmedia/storage'

// Get a URL for a stored file
const url = await getUrl('my-file.txt')

// Get a temporary URL for a private file
const tempUrl = await getUrl('private-file.txt', {
    expiresIn: 3600 // 1 hour
})
```

## File Operations

### Uploading Files

```typescript
// Upload with metadata
const { url } = await put('image.jpg', imageBuffer, {
    access: 'public',
    metadata: {
        userId: '123',
        category: 'profile'
    }
})

// Upload with content type
const { url } = await put('data.json', jsonBuffer, {
    access: 'public',
    contentType: 'application/json'
})
```

### Listing Files

```typescript
// List all files
const { blobs } = await list()

// List files with prefix
const { blobs: imageBlobs } = await list({
    prefix: 'images/'
})

// Paginated listing
const { blobs, cursor } = await list({
    limit: 100,
    cursor: previousCursor
})
```

### Deleting Files

```typescript
// Delete a single file
await del('file-to-delete.txt')

// Delete multiple files
await Promise.all([del('file1.txt'), del('file2.txt')])
```

## Best Practices

1. Always handle upload errors gracefully
2. Use appropriate access controls for sensitive files
3. Clean up unused files to manage storage costs
4. Implement file size limits for uploads
5. Use content type validation when necessary
6. Consider implementing retry logic for failed operations
7. Monitor storage usage and implement quotas if needed

## TypeScript Support

The package includes TypeScript definitions for:

-   Upload functions and options
-   List operations and responses
-   URL generation options
-   Error types

```typescript
import type { PutOptions, ListResponse, GetUrlOptions } from '@playbookmedia/storage'
```

## Error Handling

```typescript
try {
    const { url } = await put('file.txt', data)
} catch (error) {
    if (error.name === 'BlobSizeError') {
        // Handle file size error
    } else if (error.name === 'BlobAccessError') {
        // Handle access error
    } else {
        // Handle other errors
    }
}
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

MIT
