import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFilterSchema } from './StringFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'

export const CredentialWhereInputSchema: z.ZodType<Prisma.CredentialWhereInput> = z
    .object({
        AND: z.union([z.lazy(() => CredentialWhereInputSchema), z.lazy(() => CredentialWhereInputSchema).array()]).optional(),
        OR: z
            .lazy(() => CredentialWhereInputSchema)
            .array()
            .optional(),
        NOT: z.union([z.lazy(() => CredentialWhereInputSchema), z.lazy(() => CredentialWhereInputSchema).array()]).optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
    })
    .strict()

export default CredentialWhereInputSchema
