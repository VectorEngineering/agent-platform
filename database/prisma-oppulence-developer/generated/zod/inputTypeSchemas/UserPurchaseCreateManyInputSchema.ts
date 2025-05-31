import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const UserPurchaseCreateManyInputSchema: z.ZodType<Prisma.UserPurchaseCreateManyInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        stripeId: z.string(),
        description: z.string(),
        amount: z.number().int(),
        currency: z.string(),
        date: z.coerce.date().optional()
    })
    .strict()

export default UserPurchaseCreateManyInputSchema
