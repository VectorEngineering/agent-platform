import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateWithoutExecutionPhaseInputSchema'
import { ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema'
import { ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema'
import { ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema } from './ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema'
import { ExecutionLogWhereUniqueInputSchema } from './ExecutionLogWhereUniqueInputSchema'

export const ExecutionLogCreateNestedManyWithoutExecutionPhaseInputSchema: z.ZodType<Prisma.ExecutionLogCreateNestedManyWithoutExecutionPhaseInput> =
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
            createMany: z.lazy(() => ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema).optional(),
            connect: z
                .union([z.lazy(() => ExecutionLogWhereUniqueInputSchema), z.lazy(() => ExecutionLogWhereUniqueInputSchema).array()])
                .optional()
        })
        .strict()

export default ExecutionLogCreateNestedManyWithoutExecutionPhaseInputSchema
