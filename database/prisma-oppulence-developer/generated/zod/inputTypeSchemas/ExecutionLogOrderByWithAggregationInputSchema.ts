import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { ExecutionLogCountOrderByAggregateInputSchema } from './ExecutionLogCountOrderByAggregateInputSchema'
import { ExecutionLogMaxOrderByAggregateInputSchema } from './ExecutionLogMaxOrderByAggregateInputSchema'
import { ExecutionLogMinOrderByAggregateInputSchema } from './ExecutionLogMinOrderByAggregateInputSchema'

export const ExecutionLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExecutionLogOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        logLevel: z.lazy(() => SortOrderSchema).optional(),
        message: z.lazy(() => SortOrderSchema).optional(),
        timestamp: z.lazy(() => SortOrderSchema).optional(),
        executionPhaseId: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => ExecutionLogCountOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => ExecutionLogMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => ExecutionLogMinOrderByAggregateInputSchema).optional()
    })
    .strict()

export default ExecutionLogOrderByWithAggregationInputSchema
