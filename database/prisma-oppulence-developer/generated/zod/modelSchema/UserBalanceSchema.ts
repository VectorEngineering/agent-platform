import { z } from 'zod'

/////////////////////////////////////////
// USER BALANCE SCHEMA
/////////////////////////////////////////

export const UserBalanceSchema = z.object({
    userId: z.string(),
    credits: z.number().int()
})

export type UserBalance = z.infer<typeof UserBalanceSchema>

/////////////////////////////////////////
// USER BALANCE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserBalanceOptionalDefaultsSchema = UserBalanceSchema.merge(
    z.object({
        credits: z.number().int().optional()
    })
)

export type UserBalanceOptionalDefaults = z.infer<typeof UserBalanceOptionalDefaultsSchema>

export default UserBalanceSchema
