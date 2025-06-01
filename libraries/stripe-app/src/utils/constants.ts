import { BusinessConfig as platform } from '@dub/platform-config'
import { StripeMode } from './types'

// Dub
export const DUB_CLIENT_ID = 'dub_app_517290377fe6b4dfcc8726a7061ba9b6da1c4d7d7d75f77a'
export const DUB_HOST = platform.platformUrl

// Stripe
export const STRIPE_MODE: StripeMode = 'live'
