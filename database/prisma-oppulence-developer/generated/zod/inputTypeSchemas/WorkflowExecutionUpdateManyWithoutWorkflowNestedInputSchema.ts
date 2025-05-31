import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionCreateWithoutWorkflowInputSchema } from './WorkflowExecutionCreateWithoutWorkflowInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema'
import { WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema } from './WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema'
import { WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInputSchema } from './WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInputSchema'
import { WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema } from './WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'
import { WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInputSchema } from './WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInputSchema'
import { WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInputSchema } from './WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInputSchema'
import { WorkflowExecutionScalarWhereInputSchema } from './WorkflowExecutionScalarWhereInputSchema'

export const WorkflowExecutionUpdateManyWithoutWorkflowNestedInputSchema: z.ZodType<Prisma.WorkflowExecutionUpdateManyWithoutWorkflowNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => WorkflowExecutionCreateWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionCreateWithoutWorkflowInputSchema).array(),
                    z.lazy(() => WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(() => WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(() => WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            createMany: z.lazy(() => WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema).optional(),
            set: z
                .union([
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).array()
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).array()
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).array()
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).array()
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(() => WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(() => WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => WorkflowExecutionScalarWhereInputSchema),
                    z.lazy(() => WorkflowExecutionScalarWhereInputSchema).array()
                ])
                .optional()
        })
        .strict()

export default WorkflowExecutionUpdateManyWithoutWorkflowNestedInputSchema
