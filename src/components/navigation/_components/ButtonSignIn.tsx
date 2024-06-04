'use client'

import AuthModalForm from '@/components/auth/AuthModalForm'
import ButtonCustom from '@/components/common/ButtonCustom'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'

interface ButtonSignInProps {
  isHomePage: boolean
}

export default function ButtonSignIn({ isHomePage }: ButtonSignInProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ButtonCustom
        _hover={{
          bg: 'gray.500'
        }}
        onClick={onOpen}
        fontWeight={400}
        color={`${isHomePage ? 'white' : 'primary.900'}`}
        variant='outline'
      >
        Sign In
      </ButtonCustom>
      <AuthModalForm isOpen={isOpen} onClose={onClose} />
    </>
  )
}
