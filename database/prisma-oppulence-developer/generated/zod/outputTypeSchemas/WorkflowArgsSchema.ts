import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowSelectSchema } from '../inputTypeSchemas/WorkflowSelectSchema'
import { WorkflowIncludeSchema } from '../inputTypeSchemas/WorkflowIncludeSchema'

export const WorkflowArgsSchema: z.ZodType<Prisma.WorkflowDefaultArgs> = z
    .object({
        select: z.lazy(() => WorkflowSelectSchema).optional(),
        include: z.lazy(() => WorkflowIncludeSchema).optional()
    })
    .strict()

export default WorkflowArgsSchema
