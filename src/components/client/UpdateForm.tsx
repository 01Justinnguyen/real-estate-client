'use client'
import { GetMeProfileResType } from '@/schemaValidations/client.schema'
import { Button, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react'

type UpdateFormType = GetMeProfileResType['data']

export default function UpdateForm({ profile }: { profile: UpdateFormType }) {
  return (
    <>
      <form>
        <FormControl mt='4' display='flex' justifyContent='center' alignItems='center'>
          <Image
            borderRadius='full'
            boxSize='150px'
            src='https://avatars.githubusercontent.com/u/87435674?v=4'
            alt='avatar'
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel>Name</FormLabel>
          <Input type='text' value={profile.name} />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={profile.email} />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel>Phone</FormLabel>
          <Input type='text' value={profile.phone} />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel>Date Of Birth</FormLabel>
          <Input placeholder='Select Date and Time' size='md' type='datetime-local' />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel>Address</FormLabel>
          <Text fontSize='xl'>{profile.address}</Text>
        </FormControl>

        <FormControl mt='4' display='flex' justifyContent='right' alignItems='center'>
          <Button mt='4'>Update Profile</Button>
        </FormControl>
      </form>
    </>
  )
}
