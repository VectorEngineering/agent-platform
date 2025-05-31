import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowCreateWithoutExecutionsInputSchema } from './WorkflowCreateWithoutExecutionsInputSchema'
import { WorkflowUncheckedCreateWithoutExecutionsInputSchema } from './WorkflowUncheckedCreateWithoutExecutionsInputSchema'
import { WorkflowCreateOrConnectWithoutExecutionsInputSchema } from './WorkflowCreateOrConnectWithoutExecutionsInputSchema'
import { WorkflowUpsertWithoutExecutionsInputSchema } from './WorkflowUpsertWithoutExecutionsInputSchema'
import { WorkflowWhereUniqueInputSchema } from './WorkflowWhereUniqueInputSchema'
import { WorkflowUpdateToOneWithWhereWithoutExecutionsInputSchema } from './WorkflowUpdateToOneWithWhereWithoutExecutionsInputSchema'
import { WorkflowUpdateWithoutExecutionsInputSchema } from './WorkflowUpdateWithoutExecutionsInputSchema'
import { WorkflowUncheckedUpdateWithoutExecutionsInputSchema } from './WorkflowUncheckedUpdateWithoutExecutionsInputSchema'

export const WorkflowUpdateOneRequiredWithoutExecutionsNestedInputSchema: z.ZodType<Prisma.WorkflowUpdateOneRequiredWithoutExecutionsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => WorkflowCreateWithoutExecutionsInputSchema),
                    z.lazy(() => WorkflowUncheckedCreateWithoutExecutionsInputSchema)
                ])
                .optional(),
            connectOrCreate: z.lazy(() => WorkflowCreateOrConnectWithoutExecutionsInputSchema).optional(),
            upsert: z.lazy(() => WorkflowUpsertWithoutExecutionsInputSchema).optional(),
            connect: z.lazy(() => WorkflowWhereUniqueInputSchema).optional(),
            update: z
                .union([
                    z.lazy(() => WorkflowUpdateToOneWithWhereWithoutExecutionsInputSchema),
                    z.lazy(() => WorkflowUpdateWithoutExecutionsInputSchema),
                    z.lazy(() => WorkflowUncheckedUpdateWithoutExecutionsInputSchema)
                ])
                .optional()
        })
        .strict()

export default WorkflowUpdateOneRequiredWithoutExecutionsNestedInputSchema
