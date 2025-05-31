import { z } from 'zod'

/////////////////////////////////////////
// USER PURCHASE SCHEMA
/////////////////////////////////////////

export const UserPurchaseSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    stripeId: z.string(),
    description: z.string(),
    amount: z.number().int(),
    currency: z.string(),
    date: z.coerce.date()
})

export type UserPurchase = z.infer<typeof UserPurchaseSchema>

/////////////////////////////////////////
// USER PURCHASE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserPurchaseOptionalDefaultsSchema = UserPurchaseSchema.merge(
    z.object({
        id: z.string().cuid().optional(),
        date: z.coerce.date().optional()
    })
)

export type UserPurchaseOptionalDefaults = z.infer<typeof UserPurchaseOptionalDefaultsSchema>

export default UserPurchaseSchema
