import PasswordInput from '@/components/auth/PasswordInput'
import envConfig from '@/config'
import { LoginBody, LoginBodyType } from '@/schemaValidations/authSchemaValidation'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  InputProps,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { MutableRefObject } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormProps extends InputProps {
  onClose: () => void
  initialRef: MutableRefObject<null | HTMLInputElement>
}

export default function LoginForm({ onClose, initialRef }: LoginFormProps) {
  const toast = useToast()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody)
  })

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/v1/auth/login`, {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        toast({
          title: 'Thành công.',
          description: `${res.status}`,
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true
        })
        return data
      })
    } catch (error: any) {
      const status = error.status as number
      if (status === 401) {
        toast({
          title: 'Lỗi.',
          description: `${error.payload.message}`,
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true
        })
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder='Type your phone number' {...register('phone')} />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <PasswordInput placeholder='Type your password' name='password' register={register} />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type='submit' colorScheme='blue' mr={3}>
            Sign in
          </Button>
          <button onClick={onClose}>Cancel</button>
        </ModalFooter>
      </form>
    </>
  )
}
