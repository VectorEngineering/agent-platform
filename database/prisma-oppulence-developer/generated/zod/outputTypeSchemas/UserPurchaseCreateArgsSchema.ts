import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseCreateInputSchema } from '../inputTypeSchemas/UserPurchaseCreateInputSchema'
import { UserPurchaseUncheckedCreateInputSchema } from '../inputTypeSchemas/UserPurchaseUncheckedCreateInputSchema'
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

export const UserPurchaseCreateArgsSchema: z.ZodType<Prisma.UserPurchaseCreateArgs> = z
    .object({
        select: UserPurchaseSelectSchema.optional(),
        data: z.union([UserPurchaseCreateInputSchema, UserPurchaseUncheckedCreateInputSchema])
    })
    .strict()

export default UserPurchaseCreateArgsSchema
