import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema'
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema'
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema'
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema'
import { ExecutionPhaseUpdateManyWithoutExecutionNestedInputSchema } from './ExecutionPhaseUpdateManyWithoutExecutionNestedInputSchema'
import { WorkflowUpdateOneRequiredWithoutExecutionsNestedInputSchema } from './WorkflowUpdateOneRequiredWithoutExecutionsNestedInputSchema'

export const WorkflowExecutionUpdateInputSchema: z.ZodType<Prisma.WorkflowExecutionUpdateInput> = z
    .object({
        id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        trigger: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
        startedAt: z
            .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
            .optional()
            .nullable(),
        completedAt: z
            .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
            .optional()
            .nullable(),
        definition: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        creditsConsumed: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
        phases: z.lazy(() => ExecutionPhaseUpdateManyWithoutExecutionNestedInputSchema).optional(),
        workflow: z.lazy(() => WorkflowUpdateOneRequiredWithoutExecutionsNestedInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionUpdateInputSchema
