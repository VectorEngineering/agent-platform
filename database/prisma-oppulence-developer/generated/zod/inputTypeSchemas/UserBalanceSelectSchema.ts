import { z } from 'zod'
import type { Prisma } from '@prisma/client'

export const UserBalanceSelectSchema: z.ZodType<Prisma.UserBalanceSelect> = z
    .object({
        userId: z.boolean().optional(),
        credits: z.boolean().optional()
    })
    .strict()

export default UserBalanceSelectSchema
