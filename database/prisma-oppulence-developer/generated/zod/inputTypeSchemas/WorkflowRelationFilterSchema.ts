import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowWhereInputSchema } from './WorkflowWhereInputSchema'

export const WorkflowRelationFilterSchema: z.ZodType<Prisma.WorkflowRelationFilter> = z
    .object({
        is: z.lazy(() => WorkflowWhereInputSchema).optional(),
        isNot: z.lazy(() => WorkflowWhereInputSchema).optional()
    })
    .strict()

export default WorkflowRelationFilterSchema
