import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseWhereInputSchema } from '../inputTypeSchemas/UserPurchaseWhereInputSchema'
import { UserPurchaseOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserPurchaseOrderByWithAggregationInputSchema'
import { UserPurchaseScalarFieldEnumSchema } from '../inputTypeSchemas/UserPurchaseScalarFieldEnumSchema'
import { UserPurchaseScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserPurchaseScalarWhereWithAggregatesInputSchema'

export const UserPurchaseGroupByArgsSchema: z.ZodType<Prisma.UserPurchaseGroupByArgs> = z
    .object({
        where: UserPurchaseWhereInputSchema.optional(),
        orderBy: z.union([UserPurchaseOrderByWithAggregationInputSchema.array(), UserPurchaseOrderByWithAggregationInputSchema]).optional(),
        by: UserPurchaseScalarFieldEnumSchema.array(),
        having: UserPurchaseScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default UserPurchaseGroupByArgsSchema
