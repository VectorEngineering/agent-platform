import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'
import { WorkflowExecutionCreateWithoutWorkflowInputSchema } from './WorkflowExecutionCreateWithoutWorkflowInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema'

export const WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionCreateOrConnectWithoutWorkflowInput> =
    z
        .object({
            where: z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => WorkflowExecutionCreateWithoutWorkflowInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema)
            ])
        })
        .strict()

export default WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema
