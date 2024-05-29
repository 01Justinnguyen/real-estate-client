'use client'
import envConfig from '@/config'
import { useAppStore } from '@/store/useAppStore'

export default function PropertiesPage() {
  console.log('Đây là client component PropertiesPage')
  const { token } = useAppStore()
  console.log('🐻 ~ PropertiesPage ~ token from client component:', token)
  // const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/v1/test`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   }
  // }).then((res) => res.json())
  // console.log('🐻 ~ PropertiesPage ~ result:', result)
  return <div>Properties page</div>
}
