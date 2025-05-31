import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogIncludeSchema } from '../inputTypeSchemas/ExecutionLogIncludeSchema'
import { ExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/ExecutionLogWhereUniqueInputSchema'
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

export const ExecutionLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExecutionLogFindUniqueOrThrowArgs> = z
    .object({
        select: ExecutionLogSelectSchema.optional(),
        include: ExecutionLogIncludeSchema.optional(),
        where: ExecutionLogWhereUniqueInputSchema
    })
    .strict()

export default ExecutionLogFindUniqueOrThrowArgsSchema
