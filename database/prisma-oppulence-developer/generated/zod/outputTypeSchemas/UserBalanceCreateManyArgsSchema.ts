import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceCreateManyInputSchema } from '../inputTypeSchemas/UserBalanceCreateManyInputSchema'

export const UserBalanceCreateManyArgsSchema: z.ZodType<Prisma.UserBalanceCreateManyArgs> = z
    .object({
        data: z.union([UserBalanceCreateManyInputSchema, UserBalanceCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default UserBalanceCreateManyArgsSchema
