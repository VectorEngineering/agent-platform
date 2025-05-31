import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereInputSchema } from './WorkflowExecutionWhereInputSchema'
import { WorkflowExecutionUpdateWithoutPhasesInputSchema } from './WorkflowExecutionUpdateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema'

export const WorkflowExecutionUpdateToOneWithWhereWithoutPhasesInputSchema: z.ZodType<Prisma.WorkflowExecutionUpdateToOneWithWhereWithoutPhasesInput> =
    z
        .object({
            where: z.lazy(() => WorkflowExecutionWhereInputSchema).optional(),
            data: z.union([
                z.lazy(() => WorkflowExecutionUpdateWithoutPhasesInputSchema),
                z.lazy(() => WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema)
            ])
        })
        .strict()

export default WorkflowExecutionUpdateToOneWithWhereWithoutPhasesInputSchema
