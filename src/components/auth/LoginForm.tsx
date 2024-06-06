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
  useToast,
  Flex
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormProps extends InputProps {
  onClose: () => void
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const toast = useToast()
  const router = useRouter()
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
      router.refresh()
      router.push('/')
      onClose()
      await authApiRequest.auth({
        accessToken: result.payload.data.access_token,
        refreshToken: result.payload.data.refresh_token,
        accessExpiresDate: result.payload.data.access_token_expiresAt,
        refreshExpiresDate: result.payload.data.refresh_token_expiresAt
      })
      clientSessionToken.value = result.payload.data.access_token
      clientSessionToken.expiresAt = result.payload.data.access_token_expiresAt
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

        <Flex justify='flex-end' mt={4}>
          <Button colorScheme='blue' type='submit'>
            Sign in
          </Button>
        </Flex>
      </form>
    </>
  )
}
