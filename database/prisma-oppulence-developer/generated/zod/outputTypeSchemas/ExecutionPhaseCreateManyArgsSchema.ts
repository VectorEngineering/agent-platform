import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseCreateManyInputSchema } from '../inputTypeSchemas/ExecutionPhaseCreateManyInputSchema'

export const ExecutionPhaseCreateManyArgsSchema: z.ZodType<Prisma.ExecutionPhaseCreateManyArgs> = z
    .object({
        data: z.union([ExecutionPhaseCreateManyInputSchema, ExecutionPhaseCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default ExecutionPhaseCreateManyArgsSchema
