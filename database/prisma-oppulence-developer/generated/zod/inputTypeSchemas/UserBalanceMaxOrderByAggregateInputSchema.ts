import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserBalanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserBalanceMaxOrderByAggregateInput> = z
    .object({
        userId: z.lazy(() => SortOrderSchema).optional(),
        credits: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserBalanceMaxOrderByAggregateInputSchema
