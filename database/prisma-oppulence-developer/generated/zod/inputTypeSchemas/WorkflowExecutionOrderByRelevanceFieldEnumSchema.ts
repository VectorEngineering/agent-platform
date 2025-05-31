import { z } from 'zod'

export const WorkflowExecutionOrderByRelevanceFieldEnumSchema = z.enum(['id', 'workflowId', 'userId', 'trigger', 'status', 'definition'])

export default WorkflowExecutionOrderByRelevanceFieldEnumSchema
