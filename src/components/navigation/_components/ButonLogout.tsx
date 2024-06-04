'use client'

import authApiRequest from '@/apis/auth'
import ButtonCustom from '@/components/common/ButtonCustom'
import { handleErrorApi } from '@/utils/errorsHandler'
import { useToast } from '@chakra-ui/react'
import React from 'react'

interface ButonLogoutProps {
  isHomePage: boolean
}

export default function ButonLogout({ isHomePage }: ButonLogoutProps) {
  const toast = useToast()
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
    } catch (errors) {
      handleErrorApi({
        errors
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
