import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogIncludeSchema } from '../inputTypeSchemas/ExecutionLogIncludeSchema'
import { ExecutionLogCreateInputSchema } from '../inputTypeSchemas/ExecutionLogCreateInputSchema'
import { ExecutionLogUncheckedCreateInputSchema } from '../inputTypeSchemas/ExecutionLogUncheckedCreateInputSchema'
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

export const ExecutionLogCreateArgsSchema: z.ZodType<Prisma.ExecutionLogCreateArgs> = z
    .object({
        select: ExecutionLogSelectSchema.optional(),
        include: ExecutionLogIncludeSchema.optional(),
        data: z.union([ExecutionLogCreateInputSchema, ExecutionLogUncheckedCreateInputSchema])
    })
    .strict()

export default ExecutionLogCreateArgsSchema
