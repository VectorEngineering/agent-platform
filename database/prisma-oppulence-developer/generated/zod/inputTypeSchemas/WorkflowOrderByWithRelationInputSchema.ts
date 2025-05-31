import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { SortOrderInputSchema } from './SortOrderInputSchema'
import { WorkflowExecutionOrderByRelationAggregateInputSchema } from './WorkflowExecutionOrderByRelationAggregateInputSchema'
import { WorkflowOrderByRelevanceInputSchema } from './WorkflowOrderByRelevanceInputSchema'

export const WorkflowOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkflowOrderByWithRelationInput> = z
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
        executions: z.lazy(() => WorkflowExecutionOrderByRelationAggregateInputSchema).optional(),
        _relevance: z.lazy(() => WorkflowOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default WorkflowOrderByWithRelationInputSchema
