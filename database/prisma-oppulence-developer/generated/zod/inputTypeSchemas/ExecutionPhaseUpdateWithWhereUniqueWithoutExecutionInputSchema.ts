import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'
import { ExecutionPhaseUpdateWithoutExecutionInputSchema } from './ExecutionPhaseUpdateWithoutExecutionInputSchema'
import { ExecutionPhaseUncheckedUpdateWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedUpdateWithoutExecutionInputSchema'

export const ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInput> =
    z
        .object({
            where: z.lazy(() => ExecutionPhaseWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => ExecutionPhaseUpdateWithoutExecutionInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedUpdateWithoutExecutionInputSchema)
            ])
        })
        .strict()

export default ExecutionPhaseUpdateWithWhereUniqueWithoutExecutionInputSchema
