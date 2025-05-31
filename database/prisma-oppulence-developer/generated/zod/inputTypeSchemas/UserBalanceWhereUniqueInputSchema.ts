import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { UserBalanceWhereInputSchema } from './UserBalanceWhereInputSchema'
import { IntFilterSchema } from './IntFilterSchema'

export const UserBalanceWhereUniqueInputSchema: z.ZodType<Prisma.UserBalanceWhereUniqueInput> = z
    .object({
        userId: z.string()
    })
    .and(
        z
            .object({
                userId: z.string().optional(),
                AND: z.union([z.lazy(() => UserBalanceWhereInputSchema), z.lazy(() => UserBalanceWhereInputSchema).array()]).optional(),
                OR: z
                    .lazy(() => UserBalanceWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z.union([z.lazy(() => UserBalanceWhereInputSchema), z.lazy(() => UserBalanceWhereInputSchema).array()]).optional(),
                credits: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional()
            })
            .strict()
    )

export default UserBalanceWhereUniqueInputSchema
