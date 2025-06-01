import { analytics } from '@playbookmedia/analytics/posthog/server'
import { auth } from '@playbookmedia/auth/server'
import { unstable_flag as flag } from '@vercel/flags/next'

export const createFlag = (key: string) =>
    flag({
        key,
        defaultValue: false,
        async decide() {
            const { userId } = await auth()

            if (!userId) {
                return this.defaultValue as boolean
            }

            const isEnabled = await analytics.isFeatureEnabled(key, userId)

            return isEnabled ?? (this.defaultValue as boolean)
        }
    })
