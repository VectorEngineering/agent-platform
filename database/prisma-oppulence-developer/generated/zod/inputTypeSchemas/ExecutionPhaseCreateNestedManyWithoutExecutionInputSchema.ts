import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseCreateWithoutExecutionInputSchema } from './ExecutionPhaseCreateWithoutExecutionInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema'
import { ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema } from './ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema'
import { ExecutionPhaseCreateManyExecutionInputEnvelopeSchema } from './ExecutionPhaseCreateManyExecutionInputEnvelopeSchema'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'

export const ExecutionPhaseCreateNestedManyWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateNestedManyWithoutExecutionInput> =
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
            createMany: z.lazy(() => ExecutionPhaseCreateManyExecutionInputEnvelopeSchema).optional(),
            connect: z
                .union([z.lazy(() => ExecutionPhaseWhereUniqueInputSchema), z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).array()])
                .optional()
        })
        .strict()

export default ExecutionPhaseCreateNestedManyWithoutExecutionInputSchema
