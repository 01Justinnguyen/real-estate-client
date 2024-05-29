import envConfig from '@/config'
import { cookies } from 'next/headers'

export default async function OutAgentsPage() {
  console.log('Đây là server component OutAgentsPage')
  const cookieStore = cookies()
  const token = cookieStore.get('refreshToken')

  const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/v1/test`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`
    }
  }).then((res) => res.json())
  console.log('🐻 ~ OutAgentsPage ~ result:', result)
  return <div>our agent page</div>
}
