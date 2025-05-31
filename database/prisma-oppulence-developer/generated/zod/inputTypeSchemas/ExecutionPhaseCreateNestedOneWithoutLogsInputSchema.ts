import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseCreateWithoutLogsInputSchema } from './ExecutionPhaseCreateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedCreateWithoutLogsInputSchema'
import { ExecutionPhaseCreateOrConnectWithoutLogsInputSchema } from './ExecutionPhaseCreateOrConnectWithoutLogsInputSchema'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'

export const ExecutionPhaseCreateNestedOneWithoutLogsInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateNestedOneWithoutLogsInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ExecutionPhaseCreateWithoutLogsInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedCreateWithoutLogsInputSchema)
            ])
            .optional(),
        connectOrCreate: z.lazy(() => ExecutionPhaseCreateOrConnectWithoutLogsInputSchema).optional(),
        connect: z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseCreateNestedOneWithoutLogsInputSchema
