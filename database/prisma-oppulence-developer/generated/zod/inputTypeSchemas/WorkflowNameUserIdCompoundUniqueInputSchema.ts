import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const WorkflowNameUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.WorkflowNameUserIdCompoundUniqueInput> = z
    .object({
        name: z.string(),
        userId: z.string()
    })
    .strict()

export default WorkflowNameUserIdCompoundUniqueInputSchema
