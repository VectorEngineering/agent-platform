import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseScalarWhereInputSchema } from './ExecutionPhaseScalarWhereInputSchema'
import { ExecutionPhaseUpdateManyMutationInputSchema } from './ExecutionPhaseUpdateManyMutationInputSchema'
import { ExecutionPhaseUncheckedUpdateManyWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedUpdateManyWithoutExecutionInputSchema'

export const ExecutionPhaseUpdateManyWithWhereWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseUpdateManyWithWhereWithoutExecutionInput> =
    z
        .object({
            where: z.lazy(() => ExecutionPhaseScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => ExecutionPhaseUpdateManyMutationInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedUpdateManyWithoutExecutionInputSchema)
            ])
        })
        .strict()

export default ExecutionPhaseUpdateManyWithWhereWithoutExecutionInputSchema
