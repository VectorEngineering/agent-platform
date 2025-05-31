import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionCreateWithoutWorkflowInputSchema } from './WorkflowExecutionCreateWithoutWorkflowInputSchema'
import { WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema } from './WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema'
import { WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema } from './WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema'
import { WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema } from './WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema'
import { WorkflowExecutionWhereUniqueInputSchema } from './WorkflowExecutionWhereUniqueInputSchema'

export const WorkflowExecutionCreateNestedManyWithoutWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionCreateNestedManyWithoutWorkflowInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => WorkflowExecutionCreateWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionCreateWithoutWorkflowInputSchema).array(),
                    z.lazy(() => WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(() => WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema),
                    z.lazy(() => WorkflowExecutionCreateOrConnectWithoutWorkflowInputSchema).array()
                ])
                .optional(),
            createMany: z.lazy(() => WorkflowExecutionCreateManyWorkflowInputEnvelopeSchema).optional(),
            connect: z
                .union([
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema),
                    z.lazy(() => WorkflowExecutionWhereUniqueInputSchema).array()
                ])
                .optional()
        })
        .strict()

export default WorkflowExecutionCreateNestedManyWithoutWorkflowInputSchema
