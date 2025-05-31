import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema'
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema'
import { ExecutionPhaseUpdateOneRequiredWithoutLogsNestedInputSchema } from './ExecutionPhaseUpdateOneRequiredWithoutLogsNestedInputSchema'

export const ExecutionLogUpdateInputSchema: z.ZodType<Prisma.ExecutionLogUpdateInput> = z
    .object({
        id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        logLevel: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        message: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        timestamp: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
        executionPhase: z.lazy(() => ExecutionPhaseUpdateOneRequiredWithoutLogsNestedInputSchema).optional()
    })
    .strict()

export default ExecutionLogUpdateInputSchema
