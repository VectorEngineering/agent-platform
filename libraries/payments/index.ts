import 'server-only'

import Stripe from 'stripe'
import { env } from '@playbookmedia/env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia'
})

export type { Stripe } from 'stripe'
