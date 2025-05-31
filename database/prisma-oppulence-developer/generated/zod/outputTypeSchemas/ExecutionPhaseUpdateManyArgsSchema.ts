import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseUpdateManyMutationInputSchema } from '../inputTypeSchemas/ExecutionPhaseUpdateManyMutationInputSchema'
import { ExecutionPhaseUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ExecutionPhaseUncheckedUpdateManyInputSchema'
import { ExecutionPhaseWhereInputSchema } from '../inputTypeSchemas/ExecutionPhaseWhereInputSchema'

export const ExecutionPhaseUpdateManyArgsSchema: z.ZodType<Prisma.ExecutionPhaseUpdateManyArgs> = z
    .object({
        data: z.union([ExecutionPhaseUpdateManyMutationInputSchema, ExecutionPhaseUncheckedUpdateManyInputSchema]),
        where: ExecutionPhaseWhereInputSchema.optional()
    })
    .strict()

export default ExecutionPhaseUpdateManyArgsSchema
