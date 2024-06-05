import http from '@/app/http'
import {
  LoginBodyType,
  LoginResType,
  RefreshTokenResType,
  RegisterBodyType,
  RegisterResType
} from '@/schemaValidations/authSchemaValidation'
import { MessageResType } from '@/schemaValidations/common.schema'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/v1/auth/login', body),
  register: (body: RegisterBodyType) => http.post<RegisterResType>('/v1/auth/register', body),

  auth: (body: { accessToken: string; accessExpiresDate: string; refreshToken: string; refreshExpiresDate: string }) =>
    http.post('/api/auth', body, {
      baseUrl: ''
    }),

  logoutFromNextServerToServer: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) =>
    http.post<MessageResType>(
      '/v1/auth/logout',
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ),

  logoutFromNextClientToNextServer: (force?: boolean | undefined, signal?: AbortSignal | undefined) =>
    http.post<MessageResType>(
      '/api/auth/logout',
      {
        force
      },
      {
        baseUrl: '',
        signal
      }
    ),

  refreshTokenFromNextServerToServer: (refresh_token: string) =>
    http.post<RefreshTokenResType>('/v1/auth/refresh-token', {
      refresh_token
    }),

  refreshTokenFromNextClientToNextServer: () =>
    http.post<RefreshTokenResType>(
      '/api/auth/refresh-token',
      {},
      {
        baseUrl: ''
      }
    )
}

export default authApiRequest
