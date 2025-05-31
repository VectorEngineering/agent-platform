import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema'
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema'

export const UserBalanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserBalanceUncheckedUpdateManyInput> = z
    .object({
        userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
        credits: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional()
    })
    .strict()

export default UserBalanceUncheckedUpdateManyInputSchema
