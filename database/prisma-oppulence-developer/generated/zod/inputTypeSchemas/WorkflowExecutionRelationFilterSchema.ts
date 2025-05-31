import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereInputSchema } from './WorkflowExecutionWhereInputSchema'

export const WorkflowExecutionRelationFilterSchema: z.ZodType<Prisma.WorkflowExecutionRelationFilter> = z
    .object({
        is: z.lazy(() => WorkflowExecutionWhereInputSchema).optional(),
        isNot: z.lazy(() => WorkflowExecutionWhereInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionRelationFilterSchema
