import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionPhaseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExecutionPhaseOrderByRelationAggregateInput> = z
    .object({
        _count: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default ExecutionPhaseOrderByRelationAggregateInputSchema
