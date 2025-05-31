import { z } from 'zod'

export const ExecutionLogScalarFieldEnumSchema = z.enum(['id', 'logLevel', 'message', 'timestamp', 'executionPhaseId'])

export default ExecutionLogScalarFieldEnumSchema
