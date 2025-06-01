import './globals.css'

import { Inter, JetBrains_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

import { AppProviders } from '@/components/providers/AppProviders'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap'
})

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: '#09090B' }
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
}

export const metadata: Metadata = {
    title: {
        default: 'Prospector',
        template: '%s | Prospector'
    },
    description: 'Enterprise-grade lead sourcing and automation platform',
    applicationName: 'Prospector',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Prospector'
    },
    formatDetection: {
        telephone: false
    },
    openGraph: {
        type: 'website',
        siteName: 'Prospector',
        title: 'Prospector',
        description: 'Enterprise-grade lead sourcing and automation platform'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider
            afterSignOutUrl={'/sign-in'}
            appearance={{
                elements: {
                    formButtonPrimary:
                        'bg-enterprise-600 hover:bg-enterprise-700 text-white font-enterprise transition-all duration-300 ease-enterprise-in hover:scale-[1.02] active:scale-[0.98]',
                    card: 'shadow-enterprise bg-background/95 backdrop-blur-sm',
                    headerTitle: 'text-2xl font-enterprise text-foreground tracking-tight',
                    socialButtonsBlockButton: 'hover:scale-[1.02] transition-transform duration-200',
                    socialButtonsProviderIcon: 'transition-transform duration-200 group-hover:scale-110',
                    formFieldInput: 'transition-shadow duration-200',
                    card__background: 'bg-background/95 backdrop-blur-sm'
                },
                layout: {
                    shimmer: true,
                    socialButtonsPlacement: 'bottom',
                    socialButtonsVariant: 'blockButton'
                }
            }}
        >
            <html lang='en' className={cn('antialiased overflow-x-hidden', inter.variable, jetbrainsMono.variable)}>
                {process.env.NODE_ENV === 'development' && (
                    <head>
                        <script src='https://unpkg.com/react-scan/dist/auto.global.js' async />
                        <link rel='apple-touch-icon' href='/icon.png' />
                    </head>
                )}
                <body
                    className={cn(
                        inter.className,
                        'bg-background text-foreground min-h-screen font-normal',
                        'selection:bg-enterprise-100 selection:text-enterprise-900',
                        'dark:selection:bg-enterprise-900 dark:selection:text-enterprise-100',
                        'motion-safe:scroll-smooth overflow-x-hidden'
                    )}
                >
                    <AppProviders>
                        <main className='relative flex min-h-screen flex-col overflow-hidden'>
                            <div className='fixed inset-0 flex justify-center sm:px-8'>
                                <div className='flex w-full max-w-7xl lg:px-8'>
                                    <div className='w-full bg-background ring-1 ring-zinc-100 dark:ring-zinc-300/20' />
                                </div>
                            </div>
                            <div className='relative flex w-full flex-col'>{children}</div>
                        </main>
                    </AppProviders>
                    <Toaster richColors position='top-right' closeButton theme='system' className='toaster group' />
                </body>
            </html>
        </ClerkProvider>
    )
}
