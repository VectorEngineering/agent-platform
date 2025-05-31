import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateWithoutExecutionPhaseInputSchema'
import { ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema'
import { ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema'
import { ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInputSchema } from './ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInputSchema'
import { ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema } from './ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema'
import { ExecutionLogWhereUniqueInputSchema } from './ExecutionLogWhereUniqueInputSchema'
import { ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInputSchema } from './ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInputSchema'
import { ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInputSchema } from './ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInputSchema'
import { ExecutionLogScalarWhereInputSchema } from './ExecutionLogScalarWhereInputSchema'

export const ExecutionLogUncheckedUpdateManyWithoutExecutionPhaseNestedInputSchema: z.ZodType<Prisma.ExecutionLogUncheckedUpdateManyWithoutExecutionPhaseNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ExecutionLogCreateWithoutExecutionPhaseInputSchema),
                    z.lazy(() => ExecutionLogCreateWithoutExecutionPhaseInputSchema).array(),
                    z.lazy(() => ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema),
                    z.lazy(() => ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema).array()
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(() => ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema),
                    z.lazy(() => ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema).array()
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(() => ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInputSchema),
                    z.lazy(() => ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInputSchema).array()
                ])
                .optional(),
            createMany: z.lazy(() => ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema).optional(),
            set: z
                .union([z.lazy(() => ExecutionLogWhereUniqueInputSchema), z.lazy(() => ExecutionLogWhereUniqueInputSchema).array()])
                .optional(),
            disconnect: z
                .union([z.lazy(() => ExecutionLogWhereUniqueInputSchema), z.lazy(() => ExecutionLogWhereUniqueInputSchema).array()])
                .optional(),
            delete: z
                .union([z.lazy(() => ExecutionLogWhereUniqueInputSchema), z.lazy(() => ExecutionLogWhereUniqueInputSchema).array()])
                .optional(),
            connect: z
                .union([z.lazy(() => ExecutionLogWhereUniqueInputSchema), z.lazy(() => ExecutionLogWhereUniqueInputSchema).array()])
                .optional(),
            update: z
                .union([
                    z.lazy(() => ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInputSchema),
                    z.lazy(() => ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInputSchema).array()
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(() => ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInputSchema),
                    z.lazy(() => ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInputSchema).array()
                ])
                .optional(),
            deleteMany: z
                .union([z.lazy(() => ExecutionLogScalarWhereInputSchema), z.lazy(() => ExecutionLogScalarWhereInputSchema).array()])
                .optional()
        })
        .strict()

export default ExecutionLogUncheckedUpdateManyWithoutExecutionPhaseNestedInputSchema
