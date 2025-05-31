import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { SortOrderInputSchema } from './SortOrderInputSchema'
import { ExecutionPhaseOrderByRelationAggregateInputSchema } from './ExecutionPhaseOrderByRelationAggregateInputSchema'
import { WorkflowOrderByWithRelationInputSchema } from './WorkflowOrderByWithRelationInputSchema'
import { WorkflowExecutionOrderByRelevanceInputSchema } from './WorkflowExecutionOrderByRelevanceInputSchema'

export const WorkflowExecutionOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkflowExecutionOrderByWithRelationInput> = z
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
        phases: z.lazy(() => ExecutionPhaseOrderByRelationAggregateInputSchema).optional(),
        workflow: z.lazy(() => WorkflowOrderByWithRelationInputSchema).optional(),
        _relevance: z.lazy(() => WorkflowExecutionOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionOrderByWithRelationInputSchema
