import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionPhaseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExecutionPhaseMaxOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        number: z.lazy(() => SortOrderSchema).optional(),
        node: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        startedAt: z.lazy(() => SortOrderSchema).optional(),
        completedAt: z.lazy(() => SortOrderSchema).optional(),
        inputs: z.lazy(() => SortOrderSchema).optional(),
        outputs: z.lazy(() => SortOrderSchema).optional(),
        creditsConsumed: z.lazy(() => SortOrderSchema).optional(),
        workflowExecutionId: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default ExecutionPhaseMaxOrderByAggregateInputSchema
