import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceWhereInputSchema } from '../inputTypeSchemas/UserBalanceWhereInputSchema'
import { UserBalanceOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserBalanceOrderByWithRelationInputSchema'
import { UserBalanceWhereUniqueInputSchema } from '../inputTypeSchemas/UserBalanceWhereUniqueInputSchema'
import { UserBalanceScalarFieldEnumSchema } from '../inputTypeSchemas/UserBalanceScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserBalanceSelectSchema: z.ZodType<Prisma.UserBalanceSelect> = z
    .object({
        userId: z.boolean().optional(),
        credits: z.boolean().optional()
    })
    .strict()

export const UserBalanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserBalanceFindFirstOrThrowArgs> = z
    .object({
        select: UserBalanceSelectSchema.optional(),
        where: UserBalanceWhereInputSchema.optional(),
        orderBy: z.union([UserBalanceOrderByWithRelationInputSchema.array(), UserBalanceOrderByWithRelationInputSchema]).optional(),
        cursor: UserBalanceWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z.union([UserBalanceScalarFieldEnumSchema, UserBalanceScalarFieldEnumSchema.array()]).optional()
    })
    .strict()

export default UserBalanceFindFirstOrThrowArgsSchema
