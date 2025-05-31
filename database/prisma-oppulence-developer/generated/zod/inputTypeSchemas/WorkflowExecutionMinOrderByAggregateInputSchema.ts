import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowExecutionMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowExecutionMinOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        workflowId: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        trigger: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        startedAt: z.lazy(() => SortOrderSchema).optional(),
        completedAt: z.lazy(() => SortOrderSchema).optional(),
        definition: z.lazy(() => SortOrderSchema).optional(),
        creditsConsumed: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default WorkflowExecutionMinOrderByAggregateInputSchema
