import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const UserBalanceCreateInputSchema: z.ZodType<Prisma.UserBalanceCreateInput> = z
    .object({
        userId: z.string(),
        credits: z.number().int().optional()
    })
    .strict()

export default UserBalanceCreateInputSchema
