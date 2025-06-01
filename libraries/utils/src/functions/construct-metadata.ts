import { BusinessConfig as platform } from '@dub/platform-config'
import type { Metadata } from 'next'
import { HOME_DOMAIN } from '../constants'

export function constructMetadata({
    title,
    description = platform.description,
    image = platform.assets.thumbnail,
    video,
    icons = [
        {
            rel: 'apple-touch-icon',
            sizes: '32x32',
            url: platform.assets.appleTouchIcon
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: platform.assets.favicon32
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: platform.assets.favicon16
        }
    ],
    canonicalUrl,
    noIndex = false
}: {
    title?: string
    description?: string
    image?: string | null
    video?: string | null
    icons?: Metadata['icons']
    canonicalUrl?: string
    noIndex?: boolean
} = {}): Metadata {
    return {
        title: title ? `${title} | ${platform.company}` : platform.title,
        description,
        openGraph: {
            title,
            description,
            ...(image && {
                images: image
            }),
            ...(video && {
                videos: video
            })
        },
        twitter: {
            title,
            description,
            ...(image && {
                card: 'summary_large_image',
                images: [image]
            }),
            ...(video && {
                player: video
            }),
            creator: '@dubdotco'
        },
        icons,
        metadataBase: new URL(HOME_DOMAIN),
        ...(canonicalUrl && {
            alternates: {
                canonical: canonicalUrl
            }
        }),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    }
}
