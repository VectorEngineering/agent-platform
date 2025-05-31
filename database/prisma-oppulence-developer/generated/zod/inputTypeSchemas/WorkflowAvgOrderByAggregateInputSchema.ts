import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowAvgOrderByAggregateInput> = z
    .object({
        creditsCost: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default WorkflowAvgOrderByAggregateInputSchema
