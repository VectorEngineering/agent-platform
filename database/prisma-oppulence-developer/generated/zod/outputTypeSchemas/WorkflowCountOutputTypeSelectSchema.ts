import { z } from 'zod'
import type { Prisma } from '@prisma/client'

export const WorkflowCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkflowCountOutputTypeSelect> = z
    .object({
        executions: z.boolean().optional()
    })
    .strict()

export default WorkflowCountOutputTypeSelectSchema
