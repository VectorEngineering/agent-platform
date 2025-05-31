import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserPurchaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserPurchaseAvgOrderByAggregateInput> = z
    .object({
        amount: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserPurchaseAvgOrderByAggregateInputSchema
