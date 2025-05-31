import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const CredentialUncheckedCreateInputSchema: z.ZodType<Prisma.CredentialUncheckedCreateInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        name: z.string(),
        value: z.string(),
        createdAt: z.coerce.date().optional()
    })
    .strict()

export default CredentialUncheckedCreateInputSchema
