import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowCreateManyInputSchema } from '../inputTypeSchemas/WorkflowCreateManyInputSchema'

export const WorkflowCreateManyArgsSchema: z.ZodType<Prisma.WorkflowCreateManyArgs> = z
    .object({
        data: z.union([WorkflowCreateManyInputSchema, WorkflowCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default WorkflowCreateManyArgsSchema
