import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseCreateManyExecutionInputSchema } from './ExecutionPhaseCreateManyExecutionInputSchema'

export const ExecutionPhaseCreateManyExecutionInputEnvelopeSchema: z.ZodType<Prisma.ExecutionPhaseCreateManyExecutionInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => ExecutionPhaseCreateManyExecutionInputSchema),
            z.lazy(() => ExecutionPhaseCreateManyExecutionInputSchema).array()
        ]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default ExecutionPhaseCreateManyExecutionInputEnvelopeSchema
