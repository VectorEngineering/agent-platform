import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseWhereUniqueInputSchema } from '../inputTypeSchemas/UserPurchaseWhereUniqueInputSchema'
import { UserPurchaseCreateInputSchema } from '../inputTypeSchemas/UserPurchaseCreateInputSchema'
import { UserPurchaseUncheckedCreateInputSchema } from '../inputTypeSchemas/UserPurchaseUncheckedCreateInputSchema'
import { UserPurchaseUpdateInputSchema } from '../inputTypeSchemas/UserPurchaseUpdateInputSchema'
import { UserPurchaseUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserPurchaseUncheckedUpdateInputSchema'
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

export const UserPurchaseUpsertArgsSchema: z.ZodType<Prisma.UserPurchaseUpsertArgs> = z
    .object({
        select: UserPurchaseSelectSchema.optional(),
        where: UserPurchaseWhereUniqueInputSchema,
        create: z.union([UserPurchaseCreateInputSchema, UserPurchaseUncheckedCreateInputSchema]),
        update: z.union([UserPurchaseUpdateInputSchema, UserPurchaseUncheckedUpdateInputSchema])
    })
    .strict()

export default UserPurchaseUpsertArgsSchema
