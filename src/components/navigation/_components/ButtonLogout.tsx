'use client'

import authApiRequest from '@/apis/auth'
import ButtonCustom from '@/components/common/ButtonCustom'
import { handleErrorApi } from '@/utils/errorsHandler'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ButonLogoutProps {
  isHomePage: boolean
}

export default function ButtonLogout({ isHomePage }: ButonLogoutProps) {
  const toast = useToast()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      toast({
        title: 'Thành công.',
        description: `Đăng xuất thành công`,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true
      })
      router.push('/')
    } catch (errors) {
      handleErrorApi({
        errors
      })
      await authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
        router.push('/')
      })
    }
  }
  return (
    <ButtonCustom
      _hover={{
        bg: 'gray.500'
      }}
      onClick={handleLogout}
      fontWeight={400}
      color={`${isHomePage ? 'primary.900' : 'white'}`}
      variant='outline'
    >
      Logout
    </ButtonCustom>
  )
}
