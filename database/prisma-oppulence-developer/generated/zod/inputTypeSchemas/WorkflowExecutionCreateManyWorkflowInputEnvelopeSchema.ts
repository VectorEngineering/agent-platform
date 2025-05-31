import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionCreateManyWorkflowInputSchema } from './WorkflowExecutionCreateManyWorkflowInputSchema'

export const WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema: z.ZodType<Prisma.WorkflowExecutionCreateManyWorkflowInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => WorkflowExecutionCreateManyWorkflowInputSchema),
            z.lazy(() => WorkflowExecutionCreateManyWorkflowInputSchema).array()
        ]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema
