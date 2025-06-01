import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./test-setup.ts'],
        globals: true,
        mockReset: true,
        restoreMocks: true,
        clearMocks: true
    }
})
