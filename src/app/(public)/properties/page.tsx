'use client'
import accountApiRequest from '@/apis/client'
import { clientSessionToken } from '@/app/http'
import { useEffect } from 'react'

export default function PropertiesPage() {
  console.log('Đây là client component PropertiesPage')
  console.log('Đây là server component OutAgentsPage', clientSessionToken.value)
  useEffect(() => {
    async function fetchGetMeFromClient() {
      const result = await accountApiRequest.getMeProfile()
      console.log('🐻 ~ PropertiesPage ~ result:', result)
    }
    fetchGetMeFromClient()
  }, [])

  return <div>Properties page</div>
}
