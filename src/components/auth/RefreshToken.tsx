'use client'

import authApiRequest from '@/apis/auth'
import { clientSessionToken } from '@/app/http'
import { useEffect } from 'react'
import { differenceInMinutes } from 'date-fns'

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(
      () => {
        ;async () => {
          const now = new Date()
          const expiresAt = new Date(clientSessionToken.expiresAt)
          if (differenceInMinutes(expiresAt, now) < 5) {
            const res = await authApiRequest.refreshTokenFromNextClientToNextServer()
            clientSessionToken.value = res.payload.data.new_access_token
            clientSessionToken.expiresAt = res.payload.data.access_token_expiresAt
          }
        }
      },
      1000 * 60 * 20
    )
    return () => clearInterval(interval)
  }, [])
  return null
}
