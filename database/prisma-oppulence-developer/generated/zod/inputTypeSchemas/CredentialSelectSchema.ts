import { z } from 'zod'
import type { Prisma } from '@prisma/client'

export const CredentialSelectSchema: z.ZodType<Prisma.CredentialSelect> = z
    .object({
        id: z.boolean().optional(),
        userId: z.boolean().optional(),
        name: z.boolean().optional(),
        value: z.boolean().optional(),
        createdAt: z.boolean().optional()
    })
    .strict()

export default CredentialSelectSchema
