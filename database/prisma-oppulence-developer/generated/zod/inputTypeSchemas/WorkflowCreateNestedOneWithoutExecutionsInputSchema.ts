import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowCreateWithoutExecutionsInputSchema } from './WorkflowCreateWithoutExecutionsInputSchema'
import { WorkflowUncheckedCreateWithoutExecutionsInputSchema } from './WorkflowUncheckedCreateWithoutExecutionsInputSchema'
import { WorkflowCreateOrConnectWithoutExecutionsInputSchema } from './WorkflowCreateOrConnectWithoutExecutionsInputSchema'
import { WorkflowWhereUniqueInputSchema } from './WorkflowWhereUniqueInputSchema'

export const WorkflowCreateNestedOneWithoutExecutionsInputSchema: z.ZodType<Prisma.WorkflowCreateNestedOneWithoutExecutionsInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => WorkflowCreateWithoutExecutionsInputSchema),
                z.lazy(() => WorkflowUncheckedCreateWithoutExecutionsInputSchema)
            ])
            .optional(),
        connectOrCreate: z.lazy(() => WorkflowCreateOrConnectWithoutExecutionsInputSchema).optional(),
        connect: z.lazy(() => WorkflowWhereUniqueInputSchema).optional()
    })
    .strict()

export default WorkflowCreateNestedOneWithoutExecutionsInputSchema
