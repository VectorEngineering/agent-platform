import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceCreateInputSchema } from '../inputTypeSchemas/UserBalanceCreateInputSchema'
import { UserBalanceUncheckedCreateInputSchema } from '../inputTypeSchemas/UserBalanceUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserBalanceSelectSchema: z.ZodType<Prisma.UserBalanceSelect> = z
    .object({
        userId: z.boolean().optional(),
        credits: z.boolean().optional()
    })
    .strict()

export const UserBalanceCreateArgsSchema: z.ZodType<Prisma.UserBalanceCreateArgs> = z
    .object({
        select: UserBalanceSelectSchema.optional(),
        data: z.union([UserBalanceCreateInputSchema, UserBalanceUncheckedCreateInputSchema])
    })
    .strict()

export default UserBalanceCreateArgsSchema
