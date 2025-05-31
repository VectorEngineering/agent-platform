import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const CredentialCreateManyInputSchema: z.ZodType<Prisma.CredentialCreateManyInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        name: z.string(),
        value: z.string(),
        createdAt: z.coerce.date().optional()
    })
    .strict()

export default CredentialCreateManyInputSchema
