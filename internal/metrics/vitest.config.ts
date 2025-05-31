import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        deps: {
            inline: [/.*/, 'zod']
        },
        server: {
            deps: {
                inline: [/.*/, 'zod']
            }
        }
    },
    resolve: {
        alias: {
            zod: 'node_modules/zod/lib/index.js'
        }
    }
})
