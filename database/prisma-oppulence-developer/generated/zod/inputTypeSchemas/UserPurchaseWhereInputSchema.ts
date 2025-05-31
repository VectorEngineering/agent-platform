import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFilterSchema } from './StringFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'

export const UserPurchaseWhereInputSchema: z.ZodType<Prisma.UserPurchaseWhereInput> = z
    .object({
        AND: z.union([z.lazy(() => UserPurchaseWhereInputSchema), z.lazy(() => UserPurchaseWhereInputSchema).array()]).optional(),
        OR: z
            .lazy(() => UserPurchaseWhereInputSchema)
            .array()
            .optional(),
        NOT: z.union([z.lazy(() => UserPurchaseWhereInputSchema), z.lazy(() => UserPurchaseWhereInputSchema).array()]).optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        stripeId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        amount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        currency: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
    })
    .strict()

export default UserPurchaseWhereInputSchema
