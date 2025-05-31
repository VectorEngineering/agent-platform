import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowWhereInputSchema } from './WorkflowWhereInputSchema'
import { WorkflowUpdateWithoutExecutionsInputSchema } from './WorkflowUpdateWithoutExecutionsInputSchema'
import { WorkflowUncheckedUpdateWithoutExecutionsInputSchema } from './WorkflowUncheckedUpdateWithoutExecutionsInputSchema'

export const WorkflowUpdateToOneWithWhereWithoutExecutionsInputSchema: z.ZodType<Prisma.WorkflowUpdateToOneWithWhereWithoutExecutionsInput> =
    z
        .object({
            where: z.lazy(() => WorkflowWhereInputSchema).optional(),
            data: z.union([
                z.lazy(() => WorkflowUpdateWithoutExecutionsInputSchema),
                z.lazy(() => WorkflowUncheckedUpdateWithoutExecutionsInputSchema)
            ])
        })
        .strict()

export default WorkflowUpdateToOneWithWhereWithoutExecutionsInputSchema
