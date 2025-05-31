import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogWhereUniqueInputSchema } from './ExecutionLogWhereUniqueInputSchema'
import { ExecutionLogCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateWithoutExecutionPhaseInputSchema'
import { ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema'

export const ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema: z.ZodType<Prisma.ExecutionLogCreateOrConnectWithoutExecutionPhaseInput> =
    z
        .object({
            where: z.lazy(() => ExecutionLogWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ExecutionLogCreateWithoutExecutionPhaseInputSchema),
                z.lazy(() => ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema)
            ])
        })
        .strict()

export default ExecutionLogCreateOrConnectWithoutExecutionPhaseInputSchema
