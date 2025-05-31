import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const CredentialCreateInputSchema: z.ZodType<Prisma.CredentialCreateInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        name: z.string(),
        value: z.string(),
        createdAt: z.coerce.date().optional()
    })
    .strict()

export default CredentialCreateInputSchema
