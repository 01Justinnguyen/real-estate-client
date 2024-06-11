import { phoneRegex } from '@/constants/regex'
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

export const UpdateProfileBody = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Tên phải lớn hơn hoặc bằng 2 ký tự')
    .max(255, 'Tên phải nhỏ hơn hoặc bằng 255 ký tự')
    .optional(),
  email: z.string().trim().email('Email không hợp lệ').optional(),
  phone: z
    .string()
    .trim()
    .refine((phone) => {
      return phoneRegex.test(phone)
    }, 'Số điện thoại phải đủ 10 ký tự và bắt đầu bằng số 0')
    .optional(),
  address: z
    .string()
    .trim()
    .min(5, 'Địa chỉ phải lớn hơn hoặc bằng 5 ký tự')
    .max(500, 'Địa chỉ phải nhỏ hơn hoặc bằng 500 ký tự')
    .optional(),
  avatar: z.string().url().optional(),
  date_of_birth: z.union([z.string(), z.date()]).optional()
})

export type UpdateProfileBodyType = z.TypeOf<typeof UpdateProfileBody>
