import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'
import { WorkflowExecutionUpdateWithoutWorkflowInputSchema } from './WorkflowExecutionUpdateWithoutWorkflowInputSchema'
import { WorkflowExecutionUncheckedUpdateWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedUpdateWithoutWorkflowInputSchema'
import { WorkflowExecutionCreateWithoutWorkflowInputSchema } from './WorkflowExecutionCreateWithoutWorkflowInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema'

export const WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInput> =
    z
        .object({
            where: z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => WorkflowExecutionUpdateWithoutWorkflowInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedUpdateWithoutWorkflowInputSchema)
            ]),
            create: z.union([
                z.lazy(() => WorkflowExecutionCreateWithoutWorkflowInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema)
            ])
        })
        .strict()

export default WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInputSchema
