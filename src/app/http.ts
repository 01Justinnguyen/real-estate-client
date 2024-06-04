import envConfig from '@/config'
import { RegisterResType } from '@/schemaValidations/authSchemaValidation'
import { normalizePath } from '@/utils/utils'
import { redirect } from 'next/navigation'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

const ENTITY_ERRORS_STATUS = 422
const AUTHENTICATION_ERRORS_STATUS = 401

type EntityErrorPayload = {
  message: string
  errors: {
    path: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload?: any }) {
    super('Http error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload

  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload })
    if (status !== ENTITY_ERRORS_STATUS) {
      throw new Error('EntityError must have status 422')
    }
    this.status = status
    this.payload = payload
  }
}

class SessionToken {
  private token = ''
  get value() {
    return this.token
  }
  set value(token: string) {
    // Nếu gọi method này ở server sẽ bị lỗi
    if (typeof window === undefined) {
      throw new Error('Cannot set token on server side')
    }
    this.token = token
  }
}

export const clientSessionToken = new SessionToken()

let clientLogoutRequest: null | Promise<any> = null

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options?.body) : undefined

  const baseHeader = {
    'Content-Type': 'application/json',
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
  }

  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options?.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeader,
      ...options?.headers
    },
    body,
    method
  })

  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  console.log('🐻 ~ data:', data)

  if (!res.ok) {
    if (res.status === ENTITY_ERRORS_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        }
      )
    } else if (res.status === AUTHENTICATION_ERRORS_STATUS) {
      if (typeof window !== 'undefined') {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeader
            }
          })
          await clientLogoutRequest
          clientSessionToken.value = ''
          clientLogoutRequest = null
          console.log('Đăng xuất thành công')
          location.href = '/'
        }
      } else {
        // Xử lý ở server
        const token = (options?.headers as any)?.Authorization.split(' ')[1]
        redirect(`/logout?token=${token}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  // Đảm bảo đoạn code này chỉ chạy ở client
  if (typeof window !== 'undefined') {
    if (['/v1/auth/login', '/v1/auth/register'].some((item) => item === normalizePath(url))) {
      clientSessionToken.value = (payload as RegisterResType).data.access_token
    } else if ('/v1/auth/logout' === normalizePath(url)) {
      clientSessionToken.value = ''
    }
  }

  return data
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options, body })
  }
}

export default http
