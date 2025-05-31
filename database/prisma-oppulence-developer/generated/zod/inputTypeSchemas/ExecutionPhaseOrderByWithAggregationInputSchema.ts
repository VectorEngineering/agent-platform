import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { SortOrderInputSchema } from './SortOrderInputSchema'
import { ExecutionPhaseCountOrderByAggregateInputSchema } from './ExecutionPhaseCountOrderByAggregateInputSchema'
import { ExecutionPhaseAvgOrderByAggregateInputSchema } from './ExecutionPhaseAvgOrderByAggregateInputSchema'
import { ExecutionPhaseMaxOrderByAggregateInputSchema } from './ExecutionPhaseMaxOrderByAggregateInputSchema'
import { ExecutionPhaseMinOrderByAggregateInputSchema } from './ExecutionPhaseMinOrderByAggregateInputSchema'
import { ExecutionPhaseSumOrderByAggregateInputSchema } from './ExecutionPhaseSumOrderByAggregateInputSchema'

export const ExecutionPhaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExecutionPhaseOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        node: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        startedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        completedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        inputs: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        outputs: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        creditsConsumed: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        workflowExecutionId: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => ExecutionPhaseCountOrderByAggregateInputSchema).optional(),
        _avg: z.lazy(() => ExecutionPhaseAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => ExecutionPhaseMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => ExecutionPhaseMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => ExecutionPhaseSumOrderByAggregateInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseOrderByWithAggregationInputSchema
