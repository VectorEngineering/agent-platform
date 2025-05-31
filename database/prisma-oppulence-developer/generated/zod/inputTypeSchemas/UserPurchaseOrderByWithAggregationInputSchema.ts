import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { UserPurchaseCountOrderByAggregateInputSchema } from './UserPurchaseCountOrderByAggregateInputSchema'
import { UserPurchaseAvgOrderByAggregateInputSchema } from './UserPurchaseAvgOrderByAggregateInputSchema'
import { UserPurchaseMaxOrderByAggregateInputSchema } from './UserPurchaseMaxOrderByAggregateInputSchema'
import { UserPurchaseMinOrderByAggregateInputSchema } from './UserPurchaseMinOrderByAggregateInputSchema'
import { UserPurchaseSumOrderByAggregateInputSchema } from './UserPurchaseSumOrderByAggregateInputSchema'

export const UserPurchaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserPurchaseOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        stripeId: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        amount: z.lazy(() => SortOrderSchema).optional(),
        currency: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => UserPurchaseCountOrderByAggregateInputSchema).optional(),
        _avg: z.lazy(() => UserPurchaseAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => UserPurchaseMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => UserPurchaseMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => UserPurchaseSumOrderByAggregateInputSchema).optional()
    })
    .strict()

export default UserPurchaseOrderByWithAggregationInputSchema
