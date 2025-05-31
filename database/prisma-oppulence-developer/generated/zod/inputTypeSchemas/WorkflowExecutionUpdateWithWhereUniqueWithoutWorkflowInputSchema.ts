import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'
import { WorkflowExecutionUpdateWithoutWorkflowInputSchema } from './WorkflowExecutionUpdateWithoutWorkflowInputSchema'
import { WorkflowExecutionUncheckedUpdateWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedUpdateWithoutWorkflowInputSchema'

export const WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInput> =
    z
        .object({
            where: z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => WorkflowExecutionUpdateWithoutWorkflowInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedUpdateWithoutWorkflowInputSchema)
            ])
        })
        .strict()

export default WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInputSchema
