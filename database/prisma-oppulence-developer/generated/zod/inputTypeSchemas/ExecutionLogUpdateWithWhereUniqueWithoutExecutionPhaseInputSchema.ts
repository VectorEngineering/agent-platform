import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogWhereUniqueInputSchema } from './ExecutionLogWhereUniqueInputSchema'
import { ExecutionLogUpdateWithoutExecutionPhaseInputSchema } from './ExecutionLogUpdateWithoutExecutionPhaseInputSchema'
import { ExecutionLogUncheckedUpdateWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedUpdateWithoutExecutionPhaseInputSchema'

export const ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInputSchema: z.ZodType<Prisma.ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInput> =
    z
        .object({
            where: z.lazy(() => ExecutionLogWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => ExecutionLogUpdateWithoutExecutionPhaseInputSchema),
                z.lazy(() => ExecutionLogUncheckedUpdateWithoutExecutionPhaseInputSchema)
            ])
        })
        .strict()

export default ExecutionLogUpdateWithWhereUniqueWithoutExecutionPhaseInputSchema
