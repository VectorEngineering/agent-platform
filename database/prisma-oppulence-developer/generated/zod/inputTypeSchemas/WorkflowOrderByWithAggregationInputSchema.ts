import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { SortOrderInputSchema } from './SortOrderInputSchema'
import { WorkflowCountOrderByAggregateInputSchema } from './WorkflowCountOrderByAggregateInputSchema'
import { WorkflowAvgOrderByAggregateInputSchema } from './WorkflowAvgOrderByAggregateInputSchema'
import { WorkflowMaxOrderByAggregateInputSchema } from './WorkflowMaxOrderByAggregateInputSchema'
import { WorkflowMinOrderByAggregateInputSchema } from './WorkflowMinOrderByAggregateInputSchema'
import { WorkflowSumOrderByAggregateInputSchema } from './WorkflowSumOrderByAggregateInputSchema'

export const WorkflowOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkflowOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        definition: z.lazy(() => SortOrderSchema).optional(),
        executionPlan: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        creditsCost: z.lazy(() => SortOrderSchema).optional(),
        cron: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        lastRunAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        lastRunId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        lastRunStatus: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        nextRunAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        updateAt: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => WorkflowCountOrderByAggregateInputSchema).optional(),
        _avg: z.lazy(() => WorkflowAvgOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => WorkflowMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => WorkflowMinOrderByAggregateInputSchema).optional(),
        _sum: z.lazy(() => WorkflowSumOrderByAggregateInputSchema).optional()
    })
    .strict()

export default WorkflowOrderByWithAggregationInputSchema
