import { StripeAgentToolkit } from '@stripe/agent-toolkit/ai-sdk'
import { env } from '@playbookmedia/env'

export const paymentsAgentToolkit = new StripeAgentToolkit({
    secretKey: env.STRIPE_SECRET_KEY,
    configuration: {
        actions: {
            paymentLinks: {
                create: true
            },
            products: {
                create: true
            },
            prices: {
                create: true
            }
        }
    }
})
