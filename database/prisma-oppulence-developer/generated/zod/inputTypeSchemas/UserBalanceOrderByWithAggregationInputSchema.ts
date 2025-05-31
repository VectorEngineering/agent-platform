import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { UserBalanceCountOrderByAggregateInputSchema } from './UserBalanceCountOrderByAggregateInputSchema'
import { UserBalanceAvgOrderByAggregateInputSchema } from './UserBalanceAvgOrderByAggregateInputSchema'
import { UserBalanceMaxOrderByAggregateInputSchema } from './UserBalanceMaxOrderByAggregateInputSchema'
import { UserBalanceMinOrderByAggregateInputSchema } from './UserBalanceMinOrderByAggregateInputSchema'
import { UserBalanceSumOrderByAggregateInputSchema } from './UserBalanceSumOrderByAggregateInputSchema'

export const UserBalanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserBalanceOrderByWithAggregationInput> = z
    .object({
        userId: z.lazy(() => SortOrderSchema).optional(),
        credits: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => UserBalanceCountOrderByAggregateInputSchema).optional(),
        _avg: z.lazy(() => UserBalanceAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => UserBalanceMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => UserBalanceMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => UserBalanceSumOrderByAggregateInputSchema).optional()
    })
    .strict()

export default UserBalanceOrderByWithAggregationInputSchema
