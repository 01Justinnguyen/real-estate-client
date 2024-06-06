import ContentLayout from '@/components/common/ContentLayout'
import Navigation from '@/components/Navigation'
import TopHeader from '@/components/TopHeader'
import { Box } from '@chakra-ui/react'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Box>
      <TopHeader />
      <Navigation />
      <ContentLayout>{children}</ContentLayout>
    </Box>
  )
}
