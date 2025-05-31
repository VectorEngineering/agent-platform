import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialUpdateManyMutationInputSchema } from '../inputTypeSchemas/CredentialUpdateManyMutationInputSchema'
import { CredentialUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CredentialUncheckedUpdateManyInputSchema'
import { CredentialWhereInputSchema } from '../inputTypeSchemas/CredentialWhereInputSchema'

export const CredentialUpdateManyArgsSchema: z.ZodType<Prisma.CredentialUpdateManyArgs> = z
    .object({
        data: z.union([CredentialUpdateManyMutationInputSchema, CredentialUncheckedUpdateManyInputSchema]),
        where: CredentialWhereInputSchema.optional()
    })
    .strict()

export default CredentialUpdateManyArgsSchema
