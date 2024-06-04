import authApiRequest from '@/apis/auth'
import { clientSessionToken } from '@/app/http'
import PasswordInput from '@/components/auth/PasswordInput'
import { LoginBody, LoginBodyType } from '@/schemaValidations/authSchemaValidation'
import { handleErrorApi } from '@/utils/errorsHandler'
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

export default function LoginForm({ onClose }: LoginFormProps) {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      phone: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await authApiRequest.login(values)
      toast({
        title: 'Thành công.',
        description: `${result.payload.message}`,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true
      })
      onClose()
      await authApiRequest.auth({
        accessToken: result.payload.data.access_token,
        refreshToken: result.payload.data.refresh_token,
        accessExpiresDate: result.payload.data.access_token_expiresAt,
        refreshExpiresDate: result.payload.data.refresh_token_expiresAt
      })
      clientSessionToken.value = result.payload.data.access_token
    } catch (errors: any) {
      handleErrorApi({
        errors,
        setError
      })
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
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </>
  )
}
