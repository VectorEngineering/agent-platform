import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { CredentialUserIdNameCompoundUniqueInputSchema } from './CredentialUserIdNameCompoundUniqueInputSchema'
import { CredentialWhereInputSchema } from './CredentialWhereInputSchema'
import { StringFilterSchema } from './StringFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'

export const CredentialWhereUniqueInputSchema: z.ZodType<Prisma.CredentialWhereUniqueInput> = z
    .union([
        z.object({
            id: z.string().cuid(),
            userId_name: z.lazy(() => CredentialUserIdNameCompoundUniqueInputSchema)
        }),
        z.object({
            id: z.string().cuid()
        }),
        z.object({
            userId_name: z.lazy(() => CredentialUserIdNameCompoundUniqueInputSchema)
        })
    ])
    .and(
        z
            .object({
                id: z.string().cuid().optional(),
                userId_name: z.lazy(() => CredentialUserIdNameCompoundUniqueInputSchema).optional(),
                AND: z.union([z.lazy(() => CredentialWhereInputSchema), z.lazy(() => CredentialWhereInputSchema).array()]).optional(),
                OR: z
                    .lazy(() => CredentialWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z.union([z.lazy(() => CredentialWhereInputSchema), z.lazy(() => CredentialWhereInputSchema).array()]).optional(),
                userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
            })
            .strict()
    )

export default CredentialWhereUniqueInputSchema
