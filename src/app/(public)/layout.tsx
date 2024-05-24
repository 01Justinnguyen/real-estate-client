'use client'

import Navigation from '@/components/Navigation'
import TopHeader from '@/components/TopHeader'
import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <div>
      <TopHeader />
      <Navigation />
      <Box pt={`${pathname !== '/' ? '170px' : '0px'}`}>{children}</Box>
    </div>
  )
}
