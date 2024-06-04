import Navigation from '@/components/Navigation'
import TopHeader from '@/components/TopHeader'
import { Box } from '@chakra-ui/react'
import { headers } from 'next/headers'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isHomePage = headers().get('x-is-home-page') === 'true'
  return (
    <Box>
      <TopHeader isHomePage={isHomePage} />
      <Navigation isHomePage={isHomePage} />
      <Box pt={`${isHomePage ? '0' : '170px'}`}>{children}</Box>
    </Box>
  )
}
