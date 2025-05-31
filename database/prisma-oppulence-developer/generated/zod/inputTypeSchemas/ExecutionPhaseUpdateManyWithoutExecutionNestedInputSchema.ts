import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseCreateWithoutExecutionInputSchema } from './ExecutionPhaseCreateWithoutExecutionInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema'
import { ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema } from './ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema'
import { ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInputSchema } from './ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInputSchema'
import { ExecutionPhaseCreateManyExecutionInputEnvelopeSchema } from './ExecutionPhaseCreateManyExecutionInputEnvelopeSchema'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'
import { ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInputSchema } from './ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInputSchema'
import { ExecutionPhaseUpdateManyWithWhereWithoutExecutionInputSchema } from './ExecutionPhaseUpdateManyWithWhereWithoutExecutionInputSchema'
import { ExecutionPhaseScalarWhereInputSchema } from './ExecutionPhaseScalarWhereInputSchema'

export const ExecutionPhaseUpdateManyWithoutExecutionNestedInputSchema: z.ZodType<Prisma.ExecutionPhaseUpdateManyWithoutExecutionNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ExecutionPhaseCreateWithoutExecutionInputSchema),
                    z.lazy(() => ExecutionPhaseCreateWithoutExecutionInputSchema).array(),
                    z.lazy(() => ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema),
                    z.lazy(() => ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema).array()
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(() => ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema),
                    z.lazy(() => ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema).array()
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(() => ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInputSchema),
                    z.lazy(() => ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInputSchema).array()
                ])
                .optional(),
            createMany: z.lazy(() => ExecutionPhaseCreateManyExecutionInputEnvelopeSchema).optional(),
            set: z
                .union([z.lazy(() => ExecutionPhaseWhereUniqueInputSchema), z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).array()])
                .optional(),
            disconnect: z
                .union([z.lazy(() => ExecutionPhaseWhereUniqueInputSchema), z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).array()])
                .optional(),
            delete: z
                .union([z.lazy(() => ExecutionPhaseWhereUniqueInputSchema), z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).array()])
                .optional(),
            connect: z
                .union([z.lazy(() => ExecutionPhaseWhereUniqueInputSchema), z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).array()])
                .optional(),
            update: z
                .union([
                    z.lazy(() => ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInputSchema),
                    z.lazy(() => ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInputSchema).array()
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(() => ExecutionPhaseUpdateManyWithWhereWithoutExecutionInputSchema),
                    z.lazy(() => ExecutionPhaseUpdateManyWithWhereWithoutExecutionInputSchema).array()
                ])
                .optional(),
            deleteMany: z
                .union([z.lazy(() => ExecutionPhaseScalarWhereInputSchema), z.lazy(() => ExecutionPhaseScalarWhereInputSchema).array()])
                .optional()
        })
        .strict()

export default ExecutionPhaseUpdateManyWithoutExecutionNestedInputSchema
