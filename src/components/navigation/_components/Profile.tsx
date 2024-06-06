'use client'

import authApiRequest from '@/apis/auth'
import { handleErrorApi } from '@/utils/errorsHandler'
import { Avatar, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Profile() {
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
      location.reload()
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
    <Menu>
      <MenuButton as={'button'}>
        <Avatar src='https://avatars.githubusercontent.com/u/87435674?v=4' />
      </MenuButton>
      <MenuList>
        <MenuGroup title='Profile'>
          <MenuItem>Account Settings</MenuItem>
          <MenuItem>Payments </MenuItem>
          <MenuItem onClick={handleLogout}>Logout </MenuItem>
        </MenuGroup>
        <MenuDivider />
      </MenuList>
    </Menu>
  )
}
