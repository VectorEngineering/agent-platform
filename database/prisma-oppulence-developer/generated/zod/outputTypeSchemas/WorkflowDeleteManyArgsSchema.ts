import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowWhereInputSchema } from '../inputTypeSchemas/WorkflowWhereInputSchema'

export const WorkflowDeleteManyArgsSchema: z.ZodType<Prisma.WorkflowDeleteManyArgs> = z
    .object({
        where: WorkflowWhereInputSchema.optional()
    })
    .strict()

export default WorkflowDeleteManyArgsSchema
