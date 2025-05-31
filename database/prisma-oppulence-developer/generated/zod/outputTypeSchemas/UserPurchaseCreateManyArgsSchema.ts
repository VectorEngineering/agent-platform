import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { UserPurchaseCreateManyInputSchema } from '../inputTypeSchemas/UserPurchaseCreateManyInputSchema'

export const UserPurchaseCreateManyArgsSchema: z.ZodType<Prisma.UserPurchaseCreateManyArgs> = z
    .object({
        data: z.union([UserPurchaseCreateManyInputSchema, UserPurchaseCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default UserPurchaseCreateManyArgsSchema
