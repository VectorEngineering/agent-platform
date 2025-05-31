import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowExecutionCountOutputTypeSelectSchema } from './WorkflowExecutionCountOutputTypeSelectSchema'

export const WorkflowExecutionCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkflowExecutionCountOutputTypeDefaultArgs> = z
    .object({
        select: z.lazy(() => WorkflowExecutionCountOutputTypeSelectSchema).nullish()
    })
    .strict()

export default WorkflowExecutionCountOutputTypeSelectSchema
