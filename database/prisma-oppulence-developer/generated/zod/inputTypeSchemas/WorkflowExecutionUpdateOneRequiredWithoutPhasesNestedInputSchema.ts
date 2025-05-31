import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionCreateWithoutPhasesInputSchema } from './WorkflowExecutionCreateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema'
import { WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema } from './WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema'
import { WorkflowExecutionUpsertWithoutPhasesInputSchema } from './WorkflowExecutionUpsertWithoutPhasesInputSchema'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'
import { WorkflowExecutionUpdateToOneWithWhereWithoutPhasesInputSchema } from './WorkflowExecutionUpdateToOneWithWhereWithoutPhasesInputSchema'
import { WorkflowExecutionUpdateWithoutPhasesInputSchema } from './WorkflowExecutionUpdateWithoutPhasesInputSchema'
import { WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema } from './WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema'

export const WorkflowExecutionUpdateOneRequiredWithoutPhasesNestedInputSchema: z.ZodType<Prisma.WorkflowExecutionUpdateOneRequiredWithoutPhasesNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => WorkflowExecutionCreateWithoutPhasesInputSchema),
                    z.lazy(() => WorkflowExecutionUncheckedCreateWithoutPhasesInputSchema)
                ])
                .optional(),
            connectOrCreate: z.lazy(() => WorkflowExecutionCreateOrConnectWithoutPhasesInputSchema).optional(),
            upsert: z.lazy(() => WorkflowExecutionUpsertWithoutPhasesInputSchema).optional(),
            connect: z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).optional(),
            update: z
                .union([
                    z.lazy(() => WorkflowExecutionUpdateToOneWithWhereWithoutPhasesInputSchema),
                    z.lazy(() => WorkflowExecutionUpdateWithoutPhasesInputSchema),
                    z.lazy(() => WorkflowExecutionUncheckedUpdateWithoutPhasesInputSchema)
                ])
                .optional()
        })
        .strict()

export default WorkflowExecutionUpdateOneRequiredWithoutPhasesNestedInputSchema
