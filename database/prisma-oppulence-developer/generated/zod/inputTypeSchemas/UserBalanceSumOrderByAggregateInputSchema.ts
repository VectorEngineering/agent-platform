import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserBalanceSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserBalanceSumOrderByAggregateInput> = z
    .object({
        credits: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserBalanceSumOrderByAggregateInputSchema
