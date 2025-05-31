import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFilterSchema } from './StringFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'

export const UserBalanceWhereInputSchema: z.ZodType<Prisma.UserBalanceWhereInput> = z
    .object({
        AND: z.union([z.lazy(() => UserBalanceWhereInputSchema), z.lazy(() => UserBalanceWhereInputSchema).array()]).optional(),
        OR: z
            .lazy(() => UserBalanceWhereInputSchema)
            .array()
            .optional(),
        NOT: z.union([z.lazy(() => UserBalanceWhereInputSchema), z.lazy(() => UserBalanceWhereInputSchema).array()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        credits: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional()
    })
    .strict()

export default UserBalanceWhereInputSchema
