import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereInputSchema } from './ExecutionPhaseWhereInputSchema'

export const ExecutionPhaseRelationFilterSchema: z.ZodType<Prisma.ExecutionPhaseRelationFilter> = z
    .object({
        is: z.lazy(() => ExecutionPhaseWhereInputSchema).optional(),
        isNot: z.lazy(() => ExecutionPhaseWhereInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseRelationFilterSchema
