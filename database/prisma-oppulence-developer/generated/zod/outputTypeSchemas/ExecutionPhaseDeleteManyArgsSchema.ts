import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseWhereInputSchema } from '../inputTypeSchemas/ExecutionPhaseWhereInputSchema'

export const ExecutionPhaseDeleteManyArgsSchema: z.ZodType<Prisma.ExecutionPhaseDeleteManyArgs> = z
    .object({
        where: ExecutionPhaseWhereInputSchema.optional()
    })
    .strict()

export default ExecutionPhaseDeleteManyArgsSchema
