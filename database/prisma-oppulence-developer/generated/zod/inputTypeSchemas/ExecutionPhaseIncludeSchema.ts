import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowExecutionArgsSchema } from '../outputTypeSchemas/WorkflowExecutionArgsSchema'
import { ExecutionLogFindManyArgsSchema } from '../outputTypeSchemas/ExecutionLogFindManyArgsSchema'
import { ExecutionPhaseCountOutputTypeArgsSchema } from '../outputTypeSchemas/ExecutionPhaseCountOutputTypeArgsSchema'

export const ExecutionPhaseIncludeSchema: z.ZodType<Prisma.ExecutionPhaseInclude> = z
    .object({
        execution: z.union([z.boolean(), z.lazy(() => WorkflowExecutionArgsSchema)]).optional(),
        logs: z.union([z.boolean(), z.lazy(() => ExecutionLogFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => ExecutionPhaseCountOutputTypeArgsSchema)]).optional()
    })
    .strict()

export default ExecutionPhaseIncludeSchema
