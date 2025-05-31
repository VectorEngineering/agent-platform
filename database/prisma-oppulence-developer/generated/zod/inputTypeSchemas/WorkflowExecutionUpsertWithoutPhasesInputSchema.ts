import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionUpdateWithoutPhasesInputSchema } from './WorkflowExecutionUpdateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema'
import { WorkflowExecutionCreateWithoutPhasesInputSchema } from './WorkflowExecutionCreateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema'
import { WorkflowExecutionWhereInputSchema } from './WorkflowExecutionWhereInputSchema'

export const WorkflowExecutionUpsertWithoutPhasesInputSchema: z.ZodType<Prisma.WorkflowExecutionUpsertWithoutPhasesInput> = z
    .object({
        update: z.union([
            z.lazy(() => WorkflowExecutionUpdateWithoutPhasesInputSchema),
            z.lazy(() => WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema)
        ]),
        create: z.union([
            z.lazy(() => WorkflowExecutionCreateWithoutPhasesInputSchema),
            z.lazy(() => WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema)
        ]),
        where: z.lazy(() => WorkflowExecutionWhereInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionUpsertWithoutPhasesInputSchema
