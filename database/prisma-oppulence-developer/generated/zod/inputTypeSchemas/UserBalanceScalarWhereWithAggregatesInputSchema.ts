import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema'
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema'

export const UserBalanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserBalanceScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserBalanceScalarWhereWithAggregatesInputSchema),
                z.lazy(() => UserBalanceScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        OR: z
            .lazy(() => UserBalanceScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserBalanceScalarWhereWithAggregatesInputSchema),
                z.lazy(() => UserBalanceScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        credits: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional()
    })
    .strict()

export default UserBalanceScalarWhereWithAggregatesInputSchema
