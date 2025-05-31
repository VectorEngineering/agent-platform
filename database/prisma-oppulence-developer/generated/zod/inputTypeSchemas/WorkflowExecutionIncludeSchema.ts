import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseFindManyArgsSchema } from '../outputTypeSchemas/ExecutionPhaseFindManyArgsSchema'
import { WorkflowArgsSchema } from '../outputTypeSchemas/WorkflowArgsSchema'
import { WorkflowExecutionCountOutputTypeArgsSchema } from '../outputTypeSchemas/WorkflowExecutionCountOutputTypeArgsSchema'

export const WorkflowExecutionIncludeSchema: z.ZodType<Prisma.WorkflowExecutionInclude> = z
    .object({
        phases: z.union([z.boolean(), z.lazy(() => ExecutionPhaseFindManyArgsSchema)]).optional(),
        workflow: z.union([z.boolean(), z.lazy(() => WorkflowArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => WorkflowExecutionCountOutputTypeArgsSchema)]).optional()
    })
    .strict()

export default WorkflowExecutionIncludeSchema
