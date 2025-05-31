import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseUpdateManyMutationInputSchema } from '../inputTypeSchemas/UserPurchaseUpdateManyMutationInputSchema'
import { UserPurchaseUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/UserPurchaseUncheckedUpdateManyInputSchema'
import { UserPurchaseWhereInputSchema } from '../inputTypeSchemas/UserPurchaseWhereInputSchema'

export const UserPurchaseUpdateManyArgsSchema: z.ZodType<Prisma.UserPurchaseUpdateManyArgs> = z
    .object({
        data: z.union([UserPurchaseUpdateManyMutationInputSchema, UserPurchaseUncheckedUpdateManyInputSchema]),
        where: UserPurchaseWhereInputSchema.optional()
    })
    .strict()

export default UserPurchaseUpdateManyArgsSchema
