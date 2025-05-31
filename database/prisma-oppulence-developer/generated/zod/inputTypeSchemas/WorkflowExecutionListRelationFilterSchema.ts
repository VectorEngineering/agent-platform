import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereInputSchema } from './WorkflowExecutionWhereInputSchema'

export const WorkflowExecutionListRelationFilterSchema: z.ZodType<Prisma.WorkflowExecutionListRelationFilter> = z
    .object({
        every: z.lazy(() => WorkflowExecutionWhereInputSchema).optional(),
        some: z.lazy(() => WorkflowExecutionWhereInputSchema).optional(),
        none: z.lazy(() => WorkflowExecutionWhereInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionListRelationFilterSchema
