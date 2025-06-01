import { BusinessConfig as platform } from '@dub/platform-config'
export function getAppUrl() {
    if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
        return platform.platformUrl
    }

    if (process.env.VERCEL_ENV === 'preview') {
        return `https://${process.env.VERCEL_URL}`
    }

    return 'http://localhost:3001'
}

export function getEmailUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000'
    }

    return platform.webUrl
}

export function getWebsiteUrl() {
    if (process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production') {
        return platform.webUrl
    }

    if (process.env.VERCEL_ENV === 'preview') {
        return `https://${process.env.VERCEL_URL}`
    }

    return 'http://localhost:3000'
}
