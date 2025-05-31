import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { ExecutionPhaseOrderByWithRelationInputSchema } from './ExecutionPhaseOrderByWithRelationInputSchema'
import { ExecutionLogOrderByRelevanceInputSchema } from './ExecutionLogOrderByRelevanceInputSchema'

export const ExecutionLogOrderByWithRelationInputSchema: z.ZodType<Prisma.ExecutionLogOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        logLevel: z.lazy(() => SortOrderSchema).optional(),
        message: z.lazy(() => SortOrderSchema).optional(),
        timestamp: z.lazy(() => SortOrderSchema).optional(),
        executionPhaseId: z.lazy(() => SortOrderSchema).optional(),
        executionPhase: z.lazy(() => ExecutionPhaseOrderByWithRelationInputSchema).optional(),
        _relevance: z.lazy(() => ExecutionLogOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default ExecutionLogOrderByWithRelationInputSchema
