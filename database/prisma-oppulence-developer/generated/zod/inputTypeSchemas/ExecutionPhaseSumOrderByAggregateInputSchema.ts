import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionPhaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExecutionPhaseSumOrderByAggregateInput> = z
    .object({
        number: z.lazy(() => SortOrderSchema).optional(),
        creditsConsumed: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default ExecutionPhaseSumOrderByAggregateInputSchema
