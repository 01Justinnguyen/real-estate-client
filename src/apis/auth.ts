import http from '@/app/http'
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType
} from '@/schemaValidations/authSchemaValidation'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/v1/auth/login', body),
  register: (body: RegisterBodyType) => http.post<RegisterResType>('/v1/auth/register', body),
  auth: (body: { accessToken: string; accessExpiresDate: Date; refreshToken: string; refreshExpiresDate: Date }) =>
    http.post('/api/auth', body, {
      baseUrl: ''
    })
}

export default authApiRequest
