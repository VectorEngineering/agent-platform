import { z } from 'zod'
import type { Prisma } from '@prisma/client'

export const ExecutionPhaseCountOutputTypeSelectSchema: z.ZodType<Prisma.ExecutionPhaseCountOutputTypeSelect> = z
    .object({
        logs: z.boolean().optional()
    })
    .strict()

export default ExecutionPhaseCountOutputTypeSelectSchema
