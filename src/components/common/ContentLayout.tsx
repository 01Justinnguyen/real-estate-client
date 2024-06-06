'use client'

import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export default function ContentLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  return <Box pt={`${isHomePage ? '0' : '170px'}`}>{children}</Box>
}
