import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const CredentialUserIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.CredentialUserIdNameCompoundUniqueInput> = z
    .object({
        userId: z.string(),
        name: z.string()
    })
    .strict()

export default CredentialUserIdNameCompoundUniqueInputSchema
