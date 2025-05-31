import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { SortOrderInputSchema } from './SortOrderInputSchema'
import { WorkflowExecutionCountOrderByAggregateInputSchema } from './WorkflowExecutionCountOrderByAggregateInputSchema'
import { WorkflowExecutionAvgOrderByAggregateInputSchema } from './WorkflowExecutionAvgOrderByAggregateInputSchema'
import { WorkflowExecutionMaxOrderByAggregateInputSchema } from './WorkflowExecutionMaxOrderByAggregateInputSchema'
import { WorkflowExecutionMinOrderByAggregateInputSchema } from './WorkflowExecutionMinOrderByAggregateInputSchema'
import { WorkflowExecutionSumOrderByAggregateInputSchema } from './WorkflowExecutionSumOrderByAggregateInputSchema'

export const WorkflowExecutionOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkflowExecutionOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        workflowId: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        trigger: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        startedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        completedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        definition: z.lazy(() => SortOrderSchema).optional(),
        creditsConsumed: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => WorkflowExecutionCountOrderByAggregateInputSchema).optional(),
        _avg: z.lazy(() => WorkflowExecutionAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => WorkflowExecutionMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => WorkflowExecutionMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => WorkflowExecutionSumOrderByAggregateInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionOrderByWithAggregationInputSchema
