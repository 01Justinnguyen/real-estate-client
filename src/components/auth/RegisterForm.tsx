'use client'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputProps,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useToast
} from '@chakra-ui/react'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/authSchemaValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { MutableRefObject } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PasswordInput from '@/components/auth/PasswordInput'
import envConfig from '@/config'

interface RegisterFormProps extends InputProps {
  onClose: () => void
  initialRef: MutableRefObject<null | HTMLInputElement>
}

export default function RegisterForm({ onClose, initialRef, ...InputProps }: RegisterFormProps) {
  const toast = useToast()
  const {
    register,
    control,
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
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/v1/auth/register`, {
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
      if (status === 409) {
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
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
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
        </ModalBody>
        <ModalFooter>
          <Button type='submit' colorScheme='blue' mr={3}>
            Sign up
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </>
  )
}