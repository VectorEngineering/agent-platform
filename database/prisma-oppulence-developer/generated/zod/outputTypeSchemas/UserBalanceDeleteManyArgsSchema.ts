import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceWhereInputSchema } from '../inputTypeSchemas/UserBalanceWhereInputSchema'

export const UserBalanceDeleteManyArgsSchema: z.ZodType<Prisma.UserBalanceDeleteManyArgs> = z
    .object({
        where: UserBalanceWhereInputSchema.optional()
    })
    .strict()

export default UserBalanceDeleteManyArgsSchema
