import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceWhereInputSchema } from '../inputTypeSchemas/UserBalanceWhereInputSchema'
import { UserBalanceOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserBalanceOrderByWithAggregationInputSchema'
import { UserBalanceScalarFieldEnumSchema } from '../inputTypeSchemas/UserBalanceScalarFieldEnumSchema'
import { UserBalanceScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserBalanceScalarWhereWithAggregatesInputSchema'

export const UserBalanceGroupByArgsSchema: z.ZodType<Prisma.UserBalanceGroupByArgs> = z
    .object({
        where: UserBalanceWhereInputSchema.optional(),
        orderBy: z.union([UserBalanceOrderByWithAggregationInputSchema.array(), UserBalanceOrderByWithAggregationInputSchema]).optional(),
        by: UserBalanceScalarFieldEnumSchema.array(),
        having: UserBalanceScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default UserBalanceGroupByArgsSchema
