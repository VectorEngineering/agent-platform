import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionCreateNestedOneWithoutPhasesInputSchema } from './WorkflowExecutionCreateNestedOneWithoutPhasesInputSchema'

export const ExecutionPhaseCreateWithoutLogsInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateWithoutLogsInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        status: z.string(),
        number: z.number().int(),
        node: z.string(),
        name: z.string(),
        startedAt: z.coerce.date().optional().nullable(),
        completedAt: z.coerce.date().optional().nullable(),
        inputs: z.string().optional().nullable(),
        outputs: z.string().optional().nullable(),
        creditsConsumed: z.number().int().optional().nullable(),
        execution: z.lazy(() => WorkflowExecutionCreateNestedOneWithoutPhasesInputSchema)
    })
    .strict()

export default ExecutionPhaseCreateWithoutLogsInputSchema
