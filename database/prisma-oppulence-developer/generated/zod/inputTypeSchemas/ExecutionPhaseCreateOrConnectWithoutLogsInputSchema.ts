import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'
import { ExecutionPhaseCreateWithoutLogsInputSchema } from './ExecutionPhaseCreateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedCreateWithoutLogsInputSchema'

export const ExecutionPhaseCreateOrConnectWithoutLogsInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateOrConnectWithoutLogsInput> = z
    .object({
        where: z.lazy(() => ExecutionPhaseWhereUniqueInputSchema),
        create: z.union([
            z.lazy(() => ExecutionPhaseCreateWithoutLogsInputSchema),
            z.lazy(() => ExecutionPhaseUncheckedCreateWithoutLogsInputSchema)
        ])
    })
    .strict()

export default ExecutionPhaseCreateOrConnectWithoutLogsInputSchema
