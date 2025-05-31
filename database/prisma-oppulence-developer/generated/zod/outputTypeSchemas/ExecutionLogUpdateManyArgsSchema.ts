import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogUpdateManyMutationInputSchema } from '../inputTypeSchemas/ExecutionLogUpdateManyMutationInputSchema'
import { ExecutionLogUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ExecutionLogUncheckedUpdateManyInputSchema'
import { ExecutionLogWhereInputSchema } from '../inputTypeSchemas/ExecutionLogWhereInputSchema'

export const ExecutionLogUpdateManyArgsSchema: z.ZodType<Prisma.ExecutionLogUpdateManyArgs> = z
    .object({
        data: z.union([ExecutionLogUpdateManyMutationInputSchema, ExecutionLogUncheckedUpdateManyInputSchema]),
        where: ExecutionLogWhereInputSchema.optional()
    })
    .strict()

export default ExecutionLogUpdateManyArgsSchema
