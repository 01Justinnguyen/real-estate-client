'use client'

import authApiRequest from '@/apis/auth'
import { clientSessionToken } from '@/app/http'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  useEffect(() => {
    async function ForceLogout() {
      if (token === clientSessionToken.value) {
        await authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
          router.push('/')
        })
      }
    }
    ForceLogout()
    // const controller = new AbortController()
    // const signal = controller.signal

    // return () => {
    //   controller.abort()
    // }
  }, [token, router, pathname])
  return <div>page</div>
}
