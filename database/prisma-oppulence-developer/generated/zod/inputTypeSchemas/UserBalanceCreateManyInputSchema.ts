import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const UserBalanceCreateManyInputSchema: z.ZodType<Prisma.UserBalanceCreateManyInput> = z
    .object({
        userId: z.string(),
        credits: z.number().int().optional()
    })
    .strict()

export default UserBalanceCreateManyInputSchema
