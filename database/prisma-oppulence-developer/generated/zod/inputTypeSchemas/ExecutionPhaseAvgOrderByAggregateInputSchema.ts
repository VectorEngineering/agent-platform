import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionPhaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExecutionPhaseAvgOrderByAggregateInput> = z
    .object({
        number: z.lazy(() => SortOrderSchema).optional(),
        creditsConsumed: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default ExecutionPhaseAvgOrderByAggregateInputSchema
