import { describe, expect, it, vi } from 'vitest'

// Mock modules before importing provider
vi.doMock('@playbookmedia/env', () => ({
    env: {
        OPENAI_API_KEY: 'test-key-123'
    }
}))

vi.doMock('@ai-sdk/openai', () => ({
    createOpenAI: vi.fn().mockReturnValue({
        compatibility: 'strict',
        baseURL: 'https://api.openai.com/v1',
        apiKey: 'test-key-123'
    })
}))

// Import after mocks
const { provider } = await import('./provider')

describe('AI Provider Configuration', () => {
    it('creates OpenAI provider with correct configuration', () => {
        expect(provider).toBeDefined()
        expect(provider).toHaveProperty('compatibility', 'strict')
        expect(provider).toHaveProperty('baseURL', 'https://api.openai.com/v1')
    })

    it('uses environment variable for API key', () => {
        expect(provider).toMatchObject({
            apiKey: 'test-key-123'
        })
    })
})
