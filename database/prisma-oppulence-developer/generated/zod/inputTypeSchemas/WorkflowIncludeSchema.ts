import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowExecutionFindManyArgsSchema } from '../outputTypeSchemas/WorkflowExecutionFindManyArgsSchema'
import { WorkflowCountOutputTypeArgsSchema } from '../outputTypeSchemas/WorkflowCountOutputTypeArgsSchema'

export const WorkflowIncludeSchema: z.ZodType<Prisma.WorkflowInclude> = z
    .object({
        executions: z.union([z.boolean(), z.lazy(() => WorkflowExecutionFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => WorkflowCountOutputTypeArgsSchema)]).optional()
    })
    .strict()

export default WorkflowIncludeSchema
