import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseCreateWithoutLogsInputSchema } from './ExecutionPhaseCreateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedCreateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedCreateWithoutLogsInputSchema'
import { ExecutionPhaseCreateOrConnectWithoutLogsInputSchema } from './ExecutionPhaseCreateOrConnectWithoutLogsInputSchema'
import { ExecutionPhaseUpsertWithoutLogsInputSchema } from './ExecutionPhaseUpsertWithoutLogsInputSchema'
import { ExecutionPhaseWhereUniqueInputSchema } from './ExecutionPhaseWhereUniqueInputSchema'
import { ExecutionPhaseUpdateToOneWithWhereWithoutLogsInputSchema } from './ExecutionPhaseUpdateToOneWithWhereWithoutLogsInputSchema'
import { ExecutionPhaseUpdateWithoutLogsInputSchema } from './ExecutionPhaseUpdateWithoutLogsInputSchema'
import { ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema } from './ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema'

export const ExecutionPhaseUpdateOneRequiredWithoutLogsNestedInputSchema: z.ZodType<Prisma.ExecutionPhaseUpdateOneRequiredWithoutLogsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => ExecutionPhaseCreateWithoutLogsInputSchema),
                    z.lazy(() => ExecutionPhaseUncheckedCreateWithoutLogsInputSchema)
                ])
                .optional(),
            connectOrCreate: z.lazy(() => ExecutionPhaseCreateOrConnectWithoutLogsInputSchema).optional(),
            upsert: z.lazy(() => ExecutionPhaseUpsertWithoutLogsInputSchema).optional(),
            connect: z.lazy(() => ExecutionPhaseWhereUniqueInputSchema).optional(),
            update: z
                .union([
                    z.lazy(() => ExecutionPhaseUpdateToOneWithWhereWithoutLogsInputSchema),
                    z.lazy(() => ExecutionPhaseUpdateWithoutLogsInputSchema),
                    z.lazy(() => ExecutionPhaseUncheckedUpdateWithoutLogsInputSchema)
                ])
                .optional()
        })
        .strict()

export default ExecutionPhaseUpdateOneRequiredWithoutLogsNestedInputSchema
