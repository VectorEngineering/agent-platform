import { AnalyticsProvider } from '@playbookmedia/analytics'
import { AuthProvider } from '@playbookmedia/auth/provider'
import { ThemeProvider } from './providers/theme'
import type { ThemeProviderProps } from 'next-themes'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { VercelToolbar } from '@vercel/toolbar/next'
import { env } from '@playbookmedia/env'

type DesignSystemProviderProperties = ThemeProviderProps

export const DesignSystemProvider = ({ children, ...properties }: DesignSystemProviderProperties) => (
    <ThemeProvider {...properties}>
        <AuthProvider>
            <AnalyticsProvider>
                <TooltipProvider>{children}</TooltipProvider>
                <Toaster />
                {env.NODE_ENV === 'development' && env.FLAGS_SECRET && <VercelToolbar />}
            </AnalyticsProvider>
        </AuthProvider>
    </ThemeProvider>
)
