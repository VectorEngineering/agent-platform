import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { SortOrderInputSchema } from './SortOrderInputSchema'
import { WorkflowExecutionOrderByWithRelationInputSchema } from './WorkflowExecutionOrderByWithRelationInputSchema'
import { ExecutionLogOrderByRelationAggregateInputSchema } from './ExecutionLogOrderByRelationAggregateInputSchema'
import { ExecutionPhaseOrderByRelevanceInputSchema } from './ExecutionPhaseOrderByRelevanceInputSchema'

export const ExecutionPhaseOrderByWithRelationInputSchema: z.ZodType<Prisma.ExecutionPhaseOrderByWithRelationInput> = z
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
        execution: z.lazy(() => WorkflowExecutionOrderByWithRelationInputSchema).optional(),
        logs: z.lazy(() => ExecutionLogOrderByRelationAggregateInputSchema).optional(),
        _relevance: z.lazy(() => ExecutionPhaseOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseOrderByWithRelationInputSchema
