import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserBalanceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserBalanceAvgOrderByAggregateInput> = z
    .object({
        credits: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserBalanceAvgOrderByAggregateInputSchema
