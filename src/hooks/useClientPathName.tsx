'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useClientPathName() {
  const isClient = typeof window !== 'undefined'
  const [pathname, setPathname] = useState<string | null>(null)

  useEffect(() => {
    if (isClient) {
      setPathname(window.location.pathname)
    }
  }, [isClient])

  console.log('🐻 ~ useClientPathName ~ pathname:', pathname)

  return isClient ? usePathname() : pathname
}
