import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseWhereInputSchema } from './ExecutionPhaseWhereInputSchema'
import { ExecutionPhaseUpdateWithoutLogsInputSchema } from './ExecutionPhaseUpdateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema'

export const ExecutionPhaseUpdateToOneWithWhereWithoutLogsInputSchema: z.ZodType<Prisma.ExecutionPhaseUpdateToOneWithWhereWithoutLogsInput> =
    z
        .object({
            where: z.lazy(() => ExecutionPhaseWhereInputSchema).optional(),
            data: z.union([
                z.lazy(() => ExecutionPhaseUpdateWithoutLogsInputSchema),
                z.lazy(() => ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema)
            ])
        })
        .strict()

export default ExecutionPhaseUpdateToOneWithWhereWithoutLogsInputSchema
