import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowExecutionSelectSchema } from '../inputTypeSchemas/WorkflowExecutionSelectSchema'
import { WorkflowExecutionIncludeSchema } from '../inputTypeSchemas/WorkflowExecutionIncludeSchema'

export const WorkflowExecutionArgsSchema: z.ZodType<Prisma.WorkflowExecutionDefaultArgs> = z
    .object({
        select: z.lazy(() => WorkflowExecutionSelectSchema).optional(),
        include: z.lazy(() => WorkflowExecutionIncludeSchema).optional()
    })
    .strict()

export default WorkflowExecutionArgsSchema
