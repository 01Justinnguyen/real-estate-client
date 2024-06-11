'use client'

import accountApiRequest from '@/apis/client'
import mediaApiRequest from '@/apis/media'
import ImageUpload from '@/components/common/ImageUpload'
import { GetMeProfileResType, UpdateProfileBody } from '@/schemaValidations/client.schema'
import { handleErrorApi } from '@/utils/errorsHandler'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
  useToast
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type UpdateFormType = GetMeProfileResType['data']

export default function UpdateForm({ profile }: { profile: UpdateFormType }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors }
  } = useForm<UpdateFormType>({
    resolver: zodResolver(UpdateProfileBody),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      address: profile.address,
      phone: profile.phone,
      date_of_birth: new Date(profile.date_of_birth).toISOString().split('T')[0]
    }
  })

  async function onSubmit(values: UpdateFormType) {
    if (loading) return
    setLoading(true)
    try {
      console.log('🐻 ~ onSubmit ~ values:', values)
      const formData = new FormData()
      formData.append('file', file as Blob)
      const uploadImageResult = await mediaApiRequest.uploadAvatar(formData)
      const imageUrl = uploadImageResult.payload.data
      const result = await accountApiRequest.updateMeProfile({
        ...values,
        date_of_birth: new Date(values.date_of_birth),
        avatar: imageUrl
      })
      toast({
        title: 'Thành công.',
        description: `${result.payload.message}`,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true
      })
    } catch (error: any) {
      handleErrorApi({
        errors: error,
        setError
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4' display='flex' justifyContent='center' alignItems='center' isInvalid={!!errors.avatar}>
          <Controller
            name='avatar'
            control={control}
            render={({ field }) => (
              <ImageUpload
                className='rounded-full'
                image={file}
                // imageUrl={profile.avatar}
                onChange={(file) => {
                  setFile(file)
                  field.onChange(file ? 'http://localhost:3000/' + file.name : '') // Cập nhật giá trị avatar trong form
                }}
                handleDeleteImage={() => {
                  setFile(null)
                  field.onChange('')
                }}
              />
            )}
          />
          <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type='text' {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type='email' {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.phone}>
          <FormLabel>Phone</FormLabel>
          <Input type='text' {...register('phone')} />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.date_of_birth}>
          <FormLabel>Date Of Birth</FormLabel>
          <Input placeholder='Select Date and Time' size='md' type='date' {...register('date_of_birth')} />
          <FormErrorMessage>{errors.date_of_birth?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input type='text' {...register('address')} />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>

        <Flex justify='flex-end' mt={4}>
          <Button isLoading={loading} loadingText='Submitting' type='submit' mt='4'>
            Update Profile
          </Button>
        </Flex>
      </form>
    </>
  )
}
