import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserBalanceWhereUniqueInputSchema } from '../inputTypeSchemas/UserBalanceWhereUniqueInputSchema'
import { UserBalanceCreateInputSchema } from '../inputTypeSchemas/UserBalanceCreateInputSchema'
import { UserBalanceUncheckedCreateInputSchema } from '../inputTypeSchemas/UserBalanceUncheckedCreateInputSchema'
import { UserBalanceUpdateInputSchema } from '../inputTypeSchemas/UserBalanceUpdateInputSchema'
import { UserBalanceUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserBalanceUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserBalanceSelectSchema: z.ZodType<Prisma.UserBalanceSelect> = z
    .object({
        userId: z.boolean().optional(),
        credits: z.boolean().optional()
    })
    .strict()

export const UserBalanceUpsertArgsSchema: z.ZodType<Prisma.UserBalanceUpsertArgs> = z
    .object({
        select: UserBalanceSelectSchema.optional(),
        where: UserBalanceWhereUniqueInputSchema,
        create: z.union([UserBalanceCreateInputSchema, UserBalanceUncheckedCreateInputSchema]),
        update: z.union([UserBalanceUpdateInputSchema, UserBalanceUncheckedUpdateInputSchema])
    })
    .strict()

export default UserBalanceUpsertArgsSchema
