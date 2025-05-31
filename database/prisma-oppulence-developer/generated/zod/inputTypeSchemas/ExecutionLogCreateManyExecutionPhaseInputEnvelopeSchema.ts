import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogCreateManyExecutionPhaseInputSchema } from './ExecutionLogCreateManyExecutionPhaseInputSchema'

export const ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema: z.ZodType<Prisma.ExecutionLogCreateManyExecutionPhaseInputEnvelope> =
    z
        .object({
            data: z.union([
                z.lazy(() => ExecutionLogCreateManyExecutionPhaseInputSchema),
                z.lazy(() => ExecutionLogCreateManyExecutionPhaseInputSchema).array()
            ]),
            skipDuplicates: z.boolean().optional()
        })
        .strict()

export default ExecutionLogCreateManyExecutionPhaseInputEnvelopeSchema
