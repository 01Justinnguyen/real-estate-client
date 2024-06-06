import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  useToast
} from '@chakra-ui/react'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/authSchemaValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { MutableRefObject } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PasswordInput from '@/components/auth/PasswordInput'
import authApiRequest from '@/apis/auth'
import { clientSessionToken } from '@/app/http'
import { handleErrorApi } from '@/utils/errorsHandler'

interface RegisterFormProps extends InputProps {
  onClose: () => void
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const toast = useToast()
  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      phone: '',
      name: '',
      email: '',
      password: '',
      role: 'USER',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: RegisterBodyType) {
    try {
      const result = await authApiRequest.register(values)
      toast({
        title: 'Thành công.',
        description: `${result.payload.message}`,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true
      })
      location.reload()
      onClose()
      await authApiRequest.auth({
        accessToken: result.payload.data.access_token,
        refreshToken: result.payload.data.refresh_token,
        accessExpiresDate: result.payload.data.access_token_expiresAt,
        refreshExpiresDate: result.payload.data.refresh_token_expiresAt
      })
      clientSessionToken.value = result.payload.data.access_token
      clientSessionToken.expiresAt = result.payload.data.access_token_expiresAt
    } catch (error: any) {
      handleErrorApi({
        errors,
        setError
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Your fullname</FormLabel>
          <Input placeholder='Type your full name' {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.email}>
          <FormLabel>Your Email</FormLabel>
          <Input placeholder='Type your email' {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.phone}>
          <FormLabel>Phone Number</FormLabel>
          <Input placeholder='Type your phone number' {...register('phone')} />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <PasswordInput placeholder='Type your password' name='password' register={register} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm password</FormLabel>
          <PasswordInput placeholder='Type your confirm password' name='confirmPassword' register={register} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.role}>
          <FormLabel>Select your role</FormLabel>
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <RadioGroup defaultValue='USER' {...field}>
                <HStack spacing='24px'>
                  <Radio value='USER'>User</Radio>
                  <Radio value='AGENT'>Agent</Radio>
                </HStack>
              </RadioGroup>
            )}
          />
          <FormHelperText>Select only if you're a fan.</FormHelperText>
          <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
        </FormControl>
        <Flex justify='flex-end' mt={4}>
          <Button type='submit' colorScheme='blue' mr={3}>
            Sign up
          </Button>
        </Flex>
      </form>
    </>
  )
}
