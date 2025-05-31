import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogScalarWhereInputSchema } from './ExecutionLogScalarWhereInputSchema'
import { ExecutionLogUpdateManyMutationInputSchema } from './ExecutionLogUpdateManyMutationInputSchema'
import { ExecutionLogUncheckedUpdateManyWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedUpdateManyWithoutExecutionPhaseInputSchema'

export const ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInputSchema: z.ZodType<Prisma.ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInput> =
    z
        .object({
            where: z.lazy(() => ExecutionLogScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => ExecutionLogUpdateManyMutationInputSchema),
                z.lazy(() => ExecutionLogUncheckedUpdateManyWithoutExecutionPhaseInputSchema)
            ])
        })
        .strict()

export default ExecutionLogUpdateManyWithWhereWithoutExecutionPhaseInputSchema
