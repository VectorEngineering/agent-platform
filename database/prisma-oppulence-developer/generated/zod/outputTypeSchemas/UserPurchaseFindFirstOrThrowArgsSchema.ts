import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseWhereInputSchema } from '../inputTypeSchemas/UserPurchaseWhereInputSchema'
import { UserPurchaseOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserPurchaseOrderByWithRelationInputSchema'
import { UserPurchaseWhereUniqueInputSchema } from '../inputTypeSchemas/UserPurchaseWhereUniqueInputSchema'
import { UserPurchaseScalarFieldEnumSchema } from '../inputTypeSchemas/UserPurchaseScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserPurchaseSelectSchema: z.ZodType<Prisma.UserPurchaseSelect> = z
    .object({
        id: z.boolean().optional(),
        userId: z.boolean().optional(),
        stripeId: z.boolean().optional(),
        description: z.boolean().optional(),
        amount: z.boolean().optional(),
        currency: z.boolean().optional(),
        date: z.boolean().optional()
    })
    .strict()

export const UserPurchaseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserPurchaseFindFirstOrThrowArgs> = z
    .object({
        select: UserPurchaseSelectSchema.optional(),
        where: UserPurchaseWhereInputSchema.optional(),
        orderBy: z.union([UserPurchaseOrderByWithRelationInputSchema.array(), UserPurchaseOrderByWithRelationInputSchema]).optional(),
        cursor: UserPurchaseWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z.union([UserPurchaseScalarFieldEnumSchema, UserPurchaseScalarFieldEnumSchema.array()]).optional()
    })
    .strict()

export default UserPurchaseFindFirstOrThrowArgsSchema
