import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const WorkflowUncheckedCreateWithoutExecutionsInputSchema: z.ZodType<Prisma.WorkflowUncheckedCreateWithoutExecutionsInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        name: z.string(),
        description: z.string().optional().nullable(),
        definition: z.string(),
        executionPlan: z.string().optional().nullable(),
        creditsCost: z.number().int().optional(),
        cron: z.string().optional().nullable(),
        status: z.string(),
        lastRunAt: z.coerce.date().optional().nullable(),
        lastRunId: z.string().optional().nullable(),
        lastRunStatus: z.string().optional().nullable(),
        nextRunAt: z.coerce.date().optional().nullable(),
        createdAt: z.coerce.date().optional(),
        updateAt: z.coerce.date().optional()
    })
    .strict()

export default WorkflowUncheckedCreateWithoutExecutionsInputSchema
