import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceWhereInputSchema } from '../inputTypeSchemas/UserBalanceWhereInputSchema'
import { UserBalanceOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserBalanceOrderByWithRelationInputSchema'
import { UserBalanceWhereUniqueInputSchema } from '../inputTypeSchemas/UserBalanceWhereUniqueInputSchema'

export const UserBalanceAggregateArgsSchema: z.ZodType<Prisma.UserBalanceAggregateArgs> = z
    .object({
        where: UserBalanceWhereInputSchema.optional(),
        orderBy: z.union([UserBalanceOrderByWithRelationInputSchema.array(), UserBalanceOrderByWithRelationInputSchema]).optional(),
        cursor: UserBalanceWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default UserBalanceAggregateArgsSchema
