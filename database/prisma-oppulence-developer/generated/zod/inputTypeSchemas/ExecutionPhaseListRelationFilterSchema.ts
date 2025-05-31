import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereInputSchema } from './ExecutionPhaseWhereInputSchema'

export const ExecutionPhaseListRelationFilterSchema: z.ZodType<Prisma.ExecutionPhaseListRelationFilter> = z
    .object({
        every: z.lazy(() => ExecutionPhaseWhereInputSchema).optional(),
        some: z.lazy(() => ExecutionPhaseWhereInputSchema).optional(),
        none: z.lazy(() => ExecutionPhaseWhereInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseListRelationFilterSchema
