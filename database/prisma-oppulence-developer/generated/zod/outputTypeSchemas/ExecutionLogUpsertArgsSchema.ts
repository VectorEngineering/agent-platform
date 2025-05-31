import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogIncludeSchema } from '../inputTypeSchemas/ExecutionLogIncludeSchema'
import { ExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/ExecutionLogWhereUniqueInputSchema'
import { ExecutionLogCreateInputSchema } from '../inputTypeSchemas/ExecutionLogCreateInputSchema'
import { ExecutionLogUncheckedCreateInputSchema } from '../inputTypeSchemas/ExecutionLogUncheckedCreateInputSchema'
import { ExecutionLogUpdateInputSchema } from '../inputTypeSchemas/ExecutionLogUpdateInputSchema'
import { ExecutionLogUncheckedUpdateInputSchema } from '../inputTypeSchemas/ExecutionLogUncheckedUpdateInputSchema'
import { ExecutionPhaseArgsSchema } from './ExecutionPhaseArgsSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExecutionLogSelectSchema: z.ZodType<Prisma.ExecutionLogSelect> = z
    .object({
        id: z.boolean().optional(),
        logLevel: z.boolean().optional(),
        message: z.boolean().optional(),
        timestamp: z.boolean().optional(),
        executionPhaseId: z.boolean().optional(),
        executionPhase: z.union([z.boolean(), z.lazy(() => ExecutionPhaseArgsSchema)]).optional()
    })
    .strict()

export const ExecutionLogUpsertArgsSchema: z.ZodType<Prisma.ExecutionLogUpsertArgs> = z
    .object({
        select: ExecutionLogSelectSchema.optional(),
        include: ExecutionLogIncludeSchema.optional(),
        where: ExecutionLogWhereUniqueInputSchema,
        create: z.union([ExecutionLogCreateInputSchema, ExecutionLogUncheckedCreateInputSchema]),
        update: z.union([ExecutionLogUpdateInputSchema, ExecutionLogUncheckedUpdateInputSchema])
    })
    .strict()

export default ExecutionLogUpsertArgsSchema
