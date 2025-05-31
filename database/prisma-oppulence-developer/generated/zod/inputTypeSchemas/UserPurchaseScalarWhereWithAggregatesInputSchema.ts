import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema'
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema'
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema'

export const UserPurchaseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserPurchaseScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserPurchaseScalarWhereWithAggregatesInputSchema),
                z.lazy(() => UserPurchaseScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        OR: z
            .lazy(() => UserPurchaseScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserPurchaseScalarWhereWithAggregatesInputSchema),
                z.lazy(() => UserPurchaseScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        stripeId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        description: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        amount: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
        currency: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional()
    })
    .strict()

export default UserPurchaseScalarWhereWithAggregatesInputSchema
