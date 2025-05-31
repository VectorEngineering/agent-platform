import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceUpdateManyMutationInputSchema } from '../inputTypeSchemas/UserBalanceUpdateManyMutationInputSchema'
import { UserBalanceUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/UserBalanceUncheckedUpdateManyInputSchema'
import { UserBalanceWhereInputSchema } from '../inputTypeSchemas/UserBalanceWhereInputSchema'

export const UserBalanceUpdateManyArgsSchema: z.ZodType<Prisma.UserBalanceUpdateManyArgs> = z
    .object({
        data: z.union([UserBalanceUpdateManyMutationInputSchema, UserBalanceUncheckedUpdateManyInputSchema]),
        where: UserBalanceWhereInputSchema.optional()
    })
    .strict()

export default UserBalanceUpdateManyArgsSchema
