import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowExecutionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowExecutionAvgOrderByAggregateInput> = z
    .object({
        creditsConsumed: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default WorkflowExecutionAvgOrderByAggregateInputSchema
