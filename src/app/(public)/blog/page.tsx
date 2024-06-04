import accountApiRequest from '@/apis/client'
import { cookies } from 'next/headers'

export default async function BlogPage() {
  const token = cookies().get('accessToken')?.value
  const result = await accountApiRequest.getMeServer(token ?? '')
  console.log('🐻 ~ BlogPage ~ result:', result)
  return <div>blog page</div>
}
