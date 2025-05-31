import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowUpdateManyMutationInputSchema } from '../inputTypeSchemas/WorkflowUpdateManyMutationInputSchema'
import { WorkflowUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WorkflowUncheckedUpdateManyInputSchema'
import { WorkflowWhereInputSchema } from '../inputTypeSchemas/WorkflowWhereInputSchema'

export const WorkflowUpdateManyArgsSchema: z.ZodType<Prisma.WorkflowUpdateManyArgs> = z
    .object({
        data: z.union([WorkflowUpdateManyMutationInputSchema, WorkflowUncheckedUpdateManyInputSchema]),
        where: WorkflowWhereInputSchema.optional()
    })
    .strict()

export default WorkflowUpdateManyArgsSchema
