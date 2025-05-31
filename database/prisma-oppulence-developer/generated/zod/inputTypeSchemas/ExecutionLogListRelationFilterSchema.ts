import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogWhereInputSchema } from './ExecutionLogWhereInputSchema'

export const ExecutionLogListRelationFilterSchema: z.ZodType<Prisma.ExecutionLogListRelationFilter> = z
    .object({
        every: z.lazy(() => ExecutionLogWhereInputSchema).optional(),
        some: z.lazy(() => ExecutionLogWhereInputSchema).optional(),
        none: z.lazy(() => ExecutionLogWhereInputSchema).optional()
    })
    .strict()

export default ExecutionLogListRelationFilterSchema
