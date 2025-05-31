import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserPurchaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserPurchaseMinOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        stripeId: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        amount: z.lazy(() => SortOrderSchema).optional(),
        currency: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserPurchaseMinOrderByAggregateInputSchema
