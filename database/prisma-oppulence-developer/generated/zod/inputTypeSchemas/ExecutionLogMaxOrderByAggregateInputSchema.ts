import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExecutionLogMaxOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        logLevel: z.lazy(() => SortOrderSchema).optional(),
        message: z.lazy(() => SortOrderSchema).optional(),
        timestamp: z.lazy(() => SortOrderSchema).optional(),
        executionPhaseId: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default ExecutionLogMaxOrderByAggregateInputSchema
