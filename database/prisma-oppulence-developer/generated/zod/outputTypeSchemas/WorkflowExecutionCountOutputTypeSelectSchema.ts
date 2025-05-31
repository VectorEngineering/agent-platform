import { z } from 'zod'
import type { Prisma } from '@prisma/client'

export const WorkflowExecutionCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkflowExecutionCountOutputTypeSelect> = z
    .object({
        phases: z.boolean().optional()
    })
    .strict()

export default WorkflowExecutionCountOutputTypeSelectSchema
