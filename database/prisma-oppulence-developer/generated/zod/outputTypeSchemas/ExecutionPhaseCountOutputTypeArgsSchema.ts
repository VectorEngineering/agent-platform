import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseCountOutputTypeSelectSchema } from './ExecutionPhaseCountOutputTypeSelectSchema'

export const ExecutionPhaseCountOutputTypeArgsSchema: z.ZodType<Prisma.ExecutionPhaseCountOutputTypeDefaultArgs> = z
    .object({
        select: z.lazy(() => ExecutionPhaseCountOutputTypeSelectSchema).nullish()
    })
    .strict()

export default ExecutionPhaseCountOutputTypeSelectSchema
