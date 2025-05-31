import { z } from 'zod'

export const ExecutionLogOrderByRelevanceFieldEnumSchema = z.enum(['id', 'logLevel', 'message', 'executionPhaseId'])

export default ExecutionLogOrderByRelevanceFieldEnumSchema
