import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'
import { WorkflowExecutionCreateWithoutPhasesInputSchema } from './WorkflowExecutionCreateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema'

export const WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema: z.ZodType<Prisma.WorkflowExecutionCreateOrConnectWithoutPhasesInput> =
    z
        .object({
            where: z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => WorkflowExecutionCreateWithoutPhasesInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema)
            ])
        })
        .strict()

export default WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema
