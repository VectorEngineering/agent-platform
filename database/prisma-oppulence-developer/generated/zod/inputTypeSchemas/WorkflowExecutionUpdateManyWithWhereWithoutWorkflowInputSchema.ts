import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionScalarWhereInputSchema } from './WorkflowExecutionScalarWhereInputSchema'
import { WorkflowExecutionUpdateManyMutationInputSchema } from './WorkflowExecutionUpdateManyMutationInputSchema'
import { WorkflowExecutionUncheckedUpdateManyWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedUpdateManyWithoutWorkflowInputSchema'

export const WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInput> =
    z
        .object({
            where: z.lazy(() => WorkflowExecutionScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => WorkflowExecutionUpdateManyMutationInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedUpdateManyWithoutWorkflowInputSchema)
            ])
        })
        .strict()

export default WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInputSchema
