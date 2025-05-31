import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionCreateWithoutPhasesInputSchema } from './WorkflowExecutionCreateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema'
import { WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema } from './WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'

export const WorkflowExecutionCreateNestedOneWithoutPhasesInputSchema: z.ZodType<Prisma.WorkflowExecutionCreateNestedOneWithoutPhasesInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => WorkflowExecutionCreateWithoutPhasesInputSchema),
                    z.lazy(() => WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema)
                ])
                .optional(),
            connectOrCreate: z.lazy(() => WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema).optional(),
            connect: z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).optional()
        })
        .strict()

export default WorkflowExecutionCreateNestedOneWithoutPhasesInputSchema
