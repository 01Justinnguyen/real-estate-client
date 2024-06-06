import z from 'zod'

export const GetMeProfileRes = z
  .object({
    message: z.string(),
    data: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.string(),
      avatar: z.string(),
      date_of_birth: z.string(),
      email_verify: z.enum(['VERIFY', 'UNVERIFY']),
      phone_verify: z.enum(['VERIFY', 'UNVERIFY']),
      created_at: z.string()
    })
  })
  .strict()

export type GetMeProfileResType = z.TypeOf<typeof GetMeProfileRes>
