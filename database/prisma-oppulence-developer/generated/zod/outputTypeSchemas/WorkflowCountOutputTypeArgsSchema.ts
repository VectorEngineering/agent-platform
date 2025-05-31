import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowCountOutputTypeSelectSchema } from './WorkflowCountOutputTypeSelectSchema'

export const WorkflowCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkflowCountOutputTypeDefaultArgs> = z
    .object({
        select: z.lazy(() => WorkflowCountOutputTypeSelectSchema).nullish()
    })
    .strict()

export default WorkflowCountOutputTypeSelectSchema
