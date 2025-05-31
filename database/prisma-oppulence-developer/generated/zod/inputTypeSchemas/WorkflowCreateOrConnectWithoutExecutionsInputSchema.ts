import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowWhereUniqueInputSchema } from './WorkflowWhereUniqueInputSchema'
import { WorkflowCreateWithoutExecutionsInputSchema } from './WorkflowCreateWithoutExecutionsInputSchema'
import { WorkflowUncheckedCreateWithoutExecutionsInputSchema } from './WorkflowUncheckedCreateWithoutExecutionsInputSchema'

export const WorkflowCreateOrConnectWithoutExecutionsInputSchema: z.ZodType<Prisma.WorkflowCreateOrConnectWithoutExecutionsInput> = z
    .object({
        where: z.lazy(() => WorkflowWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => WorkflowCreateWithoutExecutionsInputSchema),
            z.lazy(() => WorkflowUncheckedCreateWithoutExecutionsInputSchema)
        ])
    })
    .strict()

export default WorkflowCreateOrConnectWithoutExecutionsInputSchema
