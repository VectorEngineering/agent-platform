import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowExecutionSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowExecutionSumOrderByAggregateInput> = z
    .object({
        creditsConsumed: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default WorkflowExecutionSumOrderByAggregateInputSchema
