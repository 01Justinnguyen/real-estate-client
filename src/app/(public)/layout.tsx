'use client'

import AuthModalForm from '@/components/common/AuthModalForm'
import Navigation from '@/components/Navigation'
import TopHeader from '@/components/TopHeader'
import useClientPathName from '@/hooks/useClientPathName'
import { useAppStore } from '@/store/useAppStore'
import { Box } from '@chakra-ui/react'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isShowModal, setShowModal } = useAppStore()
  const pathname = useClientPathName()

  return (
    <div>
      <TopHeader />
      <Navigation />
      <Box pt={`${pathname !== '/' ? '170px' : '0px'}`}>{children}</Box>
      <AuthModalForm isOpen={isShowModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
