import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceWhereUniqueInputSchema } from '../inputTypeSchemas/UserBalanceWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserBalanceSelectSchema: z.ZodType<Prisma.UserBalanceSelect> = z
    .object({
        userId: z.boolean().optional(),
        credits: z.boolean().optional()
    })
    .strict()

export const UserBalanceDeleteArgsSchema: z.ZodType<Prisma.UserBalanceDeleteArgs> = z
    .object({
        select: UserBalanceSelectSchema.optional(),
        where: UserBalanceWhereUniqueInputSchema
    })
    .strict()

export default UserBalanceDeleteArgsSchema
