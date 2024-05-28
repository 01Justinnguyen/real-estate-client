import { Button, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'

interface PasswordInputProps extends InputProps {
  register?: UseFormRegister<any>
}

export default function PasswordInput({ register, name, ...rest }: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const registerResult = register && name ? register(name) : {}
  return (
    <InputGroup size='md'>
      <Input type={show ? 'text' : 'password'} {...registerResult} {...rest} />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? <FaRegEyeSlash /> : <FaRegEye />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
