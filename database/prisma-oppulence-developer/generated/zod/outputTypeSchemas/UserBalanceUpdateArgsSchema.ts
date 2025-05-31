import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceUpdateInputSchema } from '../inputTypeSchemas/UserBalanceUpdateInputSchema'
import { UserBalanceUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserBalanceUncheckedUpdateInputSchema'
import { UserBalanceWhereUniqueInputSchema } from '../inputTypeSchemas/UserBalanceWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserBalanceSelectSchema: z.ZodType<Prisma.UserBalanceSelect> = z
    .object({
        userId: z.boolean().optional(),
        credits: z.boolean().optional()
    })
    .strict()

export const UserBalanceUpdateArgsSchema: z.ZodType<Prisma.UserBalanceUpdateArgs> = z
    .object({
        select: UserBalanceSelectSchema.optional(),
        data: z.union([UserBalanceUpdateInputSchema, UserBalanceUncheckedUpdateInputSchema]),
        where: UserBalanceWhereUniqueInputSchema
    })
    .strict()

export default UserBalanceUpdateArgsSchema
