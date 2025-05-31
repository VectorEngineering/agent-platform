import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowUpdateWithoutExecutionsInputSchema } from './WorkflowUpdateWithoutExecutionsInputSchema'
import { WorkflowUncheckedUpdateWithoutExecutionsInputSchema } from './WorkflowUncheckedUpdateWithoutExecutionsInputSchema'
import { WorkflowCreateWithoutExecutionsInputSchema } from './WorkflowCreateWithoutExecutionsInputSchema'
import { WorkflowUncheckedCreateWithoutExecutionsInputSchema } from './WorkflowUncheckedCreateWithoutExecutionsInputSchema'
import { WorkflowWhereInputSchema } from './WorkflowWhereInputSchema'

export const WorkflowUpsertWithoutExecutionsInputSchema: z.ZodType<Prisma.WorkflowUpsertWithoutExecutionsInput> = z
    .object({
        update: z.union([
            z.lazy(() => WorkflowUpdateWithoutExecutionsInputSchema),
            z.lazy(() => WorkflowUncheckedUpdateWithoutExecutionsInputSchema)
        ]),
        create: z.union([
            z.lazy(() => WorkflowCreateWithoutExecutionsInputSchema),
            z.lazy(() => WorkflowUncheckedCreateWithoutExecutionsInputSchema)
        ]),
        where: z.lazy(() => WorkflowWhereInputSchema).optional()
    })
    .strict()

export default WorkflowUpsertWithoutExecutionsInputSchema
