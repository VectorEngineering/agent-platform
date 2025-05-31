import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseWhereInputSchema } from '../inputTypeSchemas/UserPurchaseWhereInputSchema'

export const UserPurchaseDeleteManyArgsSchema: z.ZodType<Prisma.UserPurchaseDeleteManyArgs> = z
    .object({
        where: UserPurchaseWhereInputSchema.optional()
    })
    .strict()

export default UserPurchaseDeleteManyArgsSchema
