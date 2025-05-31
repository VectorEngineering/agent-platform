import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseWhereInputSchema } from '../inputTypeSchemas/UserPurchaseWhereInputSchema'
import { UserPurchaseOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserPurchaseOrderByWithRelationInputSchema'
import { UserPurchaseWhereUniqueInputSchema } from '../inputTypeSchemas/UserPurchaseWhereUniqueInputSchema'

export const UserPurchaseAggregateArgsSchema: z.ZodType<Prisma.UserPurchaseAggregateArgs> = z
    .object({
        where: UserPurchaseWhereInputSchema.optional(),
        orderBy: z.union([UserPurchaseOrderByWithRelationInputSchema.array(), UserPurchaseOrderByWithRelationInputSchema]).optional(),
        cursor: UserPurchaseWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default UserPurchaseAggregateArgsSchema
