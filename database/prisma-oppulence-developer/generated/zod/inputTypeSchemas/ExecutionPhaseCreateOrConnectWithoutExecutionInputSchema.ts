import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'
import { ExecutionPhaseCreateWithoutExecutionInputSchema } from './ExecutionPhaseCreateWithoutExecutionInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema'

export const ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateOrConnectWithoutExecutionInput> =
    z
        .object({
            where: z.lazy(() => ExecutionPhaseWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => ExecutionPhaseCreateWithoutExecutionInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema)
            ])
        })
        .strict()

export default ExecutionPhaseCreateOrConnectWithoutExecutionInputSchema
