import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowExecutionWhereInputSchema } from '../inputTypeSchemas/WorkflowExecutionWhereInputSchema'

export const WorkflowExecutionDeleteManyArgsSchema: z.ZodType<Prisma.WorkflowExecutionDeleteManyArgs> = z
    .object({
        where: WorkflowExecutionWhereInputSchema.optional()
    })
    .strict()

export default WorkflowExecutionDeleteManyArgsSchema
