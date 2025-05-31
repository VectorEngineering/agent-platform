import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const UserPurchaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserPurchaseSumOrderByAggregateInput> = z
    .object({
        amount: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default UserPurchaseSumOrderByAggregateInputSchema
