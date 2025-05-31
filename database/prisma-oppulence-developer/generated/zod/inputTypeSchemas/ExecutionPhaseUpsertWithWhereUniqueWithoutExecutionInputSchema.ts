import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'
import { ExecutionPhaseUpdateWithoutExecutionInputSchema } from './ExecutionPhaseUpdateWithoutExecutionInputSchema'
import { ExecutionPhaseUncheckedUpdateWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedUpdateWithoutExecutionInputSchema'
import { ExecutionPhaseCreateWithoutExecutionInputSchema } from './ExecutionPhaseCreateWithoutExecutionInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema'

export const ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInput> =
    z
        .object({
            where: z.lazy(() => ExecutionPhaseWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => ExecutionPhaseUpdateWithoutExecutionInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedUpdateWithoutExecutionInputSchema)
            ]),
            create: z.union([
                z.lazy(() => ExecutionPhaseCreateWithoutExecutionInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema)
            ])
        })
        .strict()

export default ExecutionPhaseUpsertWithWhereUniqueWithoutExecutionInputSchema
