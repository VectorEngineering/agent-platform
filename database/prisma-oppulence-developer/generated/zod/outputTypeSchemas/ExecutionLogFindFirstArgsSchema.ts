import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogIncludeSchema } from '../inputTypeSchemas/ExecutionLogIncludeSchema'
import { ExecutionLogWhereInputSchema } from '../inputTypeSchemas/ExecutionLogWhereInputSchema'
import { ExecutionLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExecutionLogOrderByWithRelationInputSchema'
import { ExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/ExecutionLogWhereUniqueInputSchema'
import { ExecutionLogScalarFieldEnumSchema } from '../inputTypeSchemas/ExecutionLogScalarFieldEnumSchema'
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

export const ExecutionLogFindFirstArgsSchema: z.ZodType<Prisma.ExecutionLogFindFirstArgs> = z
    .object({
        select: ExecutionLogSelectSchema.optional(),
        include: ExecutionLogIncludeSchema.optional(),
        where: ExecutionLogWhereInputSchema.optional(),
        orderBy: z.union([ExecutionLogOrderByWithRelationInputSchema.array(), ExecutionLogOrderByWithRelationInputSchema]).optional(),
        cursor: ExecutionLogWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z.union([ExecutionLogScalarFieldEnumSchema, ExecutionLogScalarFieldEnumSchema.array()]).optional()
    })
    .strict()

export default ExecutionLogFindFirstArgsSchema
