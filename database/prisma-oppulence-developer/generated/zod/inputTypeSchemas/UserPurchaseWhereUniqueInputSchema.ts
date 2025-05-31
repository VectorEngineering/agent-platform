import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { UserPurchaseWhereInputSchema } from './UserPurchaseWhereInputSchema'
import { StringFilterSchema } from './StringFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'

export const UserPurchaseWhereUniqueInputSchema: z.ZodType<Prisma.UserPurchaseWhereUniqueInput> = z
    .object({
        id: z.string().cuid()
    })
    .and(
        z
            .object({
                id: z.string().cuid().optional(),
                AND: z.union([z.lazy(() => UserPurchaseWhereInputSchema), z.lazy(() => UserPurchaseWhereInputSchema).array()]).optional(),
                OR: z
                    .lazy(() => UserPurchaseWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z.union([z.lazy(() => UserPurchaseWhereInputSchema), z.lazy(() => UserPurchaseWhereInputSchema).array()]).optional(),
                userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                stripeId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                amount: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
                currency: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
            })
            .strict()
    )

export default UserPurchaseWhereUniqueInputSchema
