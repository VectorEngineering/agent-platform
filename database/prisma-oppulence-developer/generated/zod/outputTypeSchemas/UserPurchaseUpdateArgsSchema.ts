import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseUpdateInputSchema } from '../inputTypeSchemas/UserPurchaseUpdateInputSchema'
import { UserPurchaseUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserPurchaseUncheckedUpdateInputSchema'
import { UserPurchaseWhereUniqueInputSchema } from '../inputTypeSchemas/UserPurchaseWhereUniqueInputSchema'
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

export const UserPurchaseUpdateArgsSchema: z.ZodType<Prisma.UserPurchaseUpdateArgs> = z
    .object({
        select: UserPurchaseSelectSchema.optional(),
        data: z.union([UserPurchaseUpdateInputSchema, UserPurchaseUncheckedUpdateInputSchema]),
        where: UserPurchaseWhereUniqueInputSchema
    })
    .strict()

export default UserPurchaseUpdateArgsSchema
