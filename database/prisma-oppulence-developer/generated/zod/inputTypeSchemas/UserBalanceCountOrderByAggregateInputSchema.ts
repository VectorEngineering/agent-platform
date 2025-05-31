import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserBalanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserBalanceCountOrderByAggregateInput> = z
    .object({
        userId: z.lazy(() => SortOrderSchema).optional(),
        credits: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserBalanceCountOrderByAggregateInputSchema
