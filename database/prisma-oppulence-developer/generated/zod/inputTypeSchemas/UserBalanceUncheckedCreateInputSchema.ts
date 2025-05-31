import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const UserBalanceUncheckedCreateInputSchema: z.ZodType<Prisma.UserBalanceUncheckedCreateInput> = z
    .object({
        userId: z.string(),
        credits: z.number().int().optional()
    })
    .strict()

export default UserBalanceUncheckedCreateInputSchema
