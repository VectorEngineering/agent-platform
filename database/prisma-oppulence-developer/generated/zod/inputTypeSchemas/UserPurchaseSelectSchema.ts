import { z } from 'zod'
import type { Prisma } from '@prisma/client'

export const UserPurchaseSelectSchema: z.ZodType<Prisma.UserPurchaseSelect> = z
    .object({
        id: z.boolean().optional(),
        userId: z.boolean().optional(),
        stripeId: z.boolean().optional(),
        description: z.boolean().optional(),
        amount: z.boolean().optional(),
        currency: z.boolean().optional(),
        date: z.boolean().optional()
    })
    .strict()

export default UserPurchaseSelectSchema
