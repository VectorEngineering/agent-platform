import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogWhereUniqueInputSchema } from './ExecutionLogWhereUniqueInputSchema'
import { ExecutionLogUpdateWithoutExecutionPhaseInputSchema } from './ExecutionLogUpdateWithoutExecutionPhaseInputSchema'
import { ExecutionLogUncheckedUpdateWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedUpdateWithoutExecutionPhaseInputSchema'
import { ExecutionLogCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateWithoutExecutionPhaseInputSchema'
import { ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema'

export const ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInputSchema: z.ZodType<Prisma.ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInput> =
    z
        .object({
            where: z.lazy(() => ExecutionLogWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => ExecutionLogUpdateWithoutExecutionPhaseInputSchema),
                z.lazy(() => ExecutionLogUncheckedUpdateWithoutExecutionPhaseInputSchema)
            ]),
            create: z.union([
                z.lazy(() => ExecutionLogCreateWithoutExecutionPhaseInputSchema),
                z.lazy(() => ExecutionLogUncheckedCreateWithoutExecutionPhaseInputSchema)
            ])
        })
        .strict()

export default ExecutionLogUpsertWithWhereUniqueWithoutExecutionPhaseInputSchema
