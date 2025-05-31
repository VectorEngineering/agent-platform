import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseUpdateWithoutLogsInputSchema } from './ExecutionPhaseUpdateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema'
import { ExecutionPhaseCreateWithoutLogsInputSchema } from './ExecutionPhaseCreateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedCreateWithoutLogsInputSchema'
import { ExecutionPhaseWhereInputSchema } from './ExecutionPhaseWhereInputSchema'

export const ExecutionPhaseUpsertWithoutLogsInputSchema: z.ZodType<Prisma.ExecutionPhaseUpsertWithoutLogsInput> = z
    .object({
        update: z.union([
            z.lazy(() => ExecutionPhaseUpdateWithoutLogsInputSchema),
            z.lazy(() => ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema)
        ]),
        create: z.union([
            z.lazy(() => ExecutionPhaseCreateWithoutLogsInputSchema),
            z.lazy(() => ExecutionPhaseUncheckedCreateWithoutLogsInputSchema)
        ]),
        where: z.lazy(() => ExecutionPhaseWhereInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseUpsertWithoutLogsInputSchema
