import { clientSessionToken } from '@/app/http'

export default async function OutAgentsPage() {
  console.log('Đây là server component OutAgentsPage')

  console.log('Đây là server component OutAgentsPage', clientSessionToken.value)

  // const result = await accountApiRequest.getMeProfile(token?.value ?? '')
  // console.log('🐻 ~ OutAgentsPage ~ result:', result)
  return <div>our agent page</div>
}
