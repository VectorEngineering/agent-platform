import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    verbose: true,
    schema: './src/schema/index.ts',
    out: './drizzle/migrations',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DRIZZLE_DATABASE_URL!
    }
})
