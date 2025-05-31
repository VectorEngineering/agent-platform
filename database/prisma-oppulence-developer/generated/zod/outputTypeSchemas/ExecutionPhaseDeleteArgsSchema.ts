import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseIncludeSchema } from '../inputTypeSchemas/ExecutionPhaseIncludeSchema'
import { ExecutionPhaseWhereUniqueInputSchema } from '../inputTypeSchemas/ExecutionPhaseWhereUniqueInputSchema'
import { WorkflowExecutionArgsSchema } from './WorkflowExecutionArgsSchema'
import { ExecutionLogFindManyArgsSchema } from './ExecutionLogFindManyArgsSchema'
import { ExecutionPhaseCountOutputTypeArgsSchema } from './ExecutionPhaseCountOutputTypeArgsSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExecutionPhaseSelectSchema: z.ZodType<Prisma.ExecutionPhaseSelect> = z
    .object({
        id: z.boolean().optional(),
        userId: z.boolean().optional(),
        status: z.boolean().optional(),
        number: z.boolean().optional(),
        node: z.boolean().optional(),
        name: z.boolean().optional(),
        startedAt: z.boolean().optional(),
        completedAt: z.boolean().optional(),
        inputs: z.boolean().optional(),
        outputs: z.boolean().optional(),
        creditsConsumed: z.boolean().optional(),
        workflowExecutionId: z.boolean().optional(),
        execution: z.union([z.boolean(), z.lazy(() => WorkflowExecutionArgsSchema)]).optional(),
        logs: z.union([z.boolean(), z.lazy(() => ExecutionLogFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => ExecutionPhaseCountOutputTypeArgsSchema)]).optional()
    })
    .strict()

export const ExecutionPhaseDeleteArgsSchema: z.ZodType<Prisma.ExecutionPhaseDeleteArgs> = z
    .object({
        select: ExecutionPhaseSelectSchema.optional(),
        include: ExecutionPhaseIncludeSchema.optional(),
        where: ExecutionPhaseWhereUniqueInputSchema
    })
    .strict()

export default ExecutionPhaseDeleteArgsSchema
