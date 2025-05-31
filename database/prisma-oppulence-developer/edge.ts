import { Client } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { PrismaClient } from '@prisma/client'

type CustomFetch = (url: string, init?: RequestInit) => Promise<Response>

const customFetch: CustomFetch = (url: string, init?: RequestInit) => {
    if (!init) return fetch(url)
    const { cache, ...rest } = init
    return fetch(url, rest)
}

// Ensure database name is included in the URL
const getDatabaseUrl = () => {
    const url = process.env.PLANETSCALE_DATABASE_URL || process.env.DATABASE_URL
    if (!url) throw new Error('Database URL is not defined')

    // For local development with PlanetScale proxy
    if (url.startsWith('http://')) {
        return `${url}/planetscale`
    }

    return url
}

const client = new Client({
    url: getDatabaseUrl(),
    fetch: customFetch
})

const adapter = new PrismaPlanetScale(client)

export const prismaEdge = new PrismaClient({
    adapter
})
