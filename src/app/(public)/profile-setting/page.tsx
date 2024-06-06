import accountApiRequest from '@/apis/client'
import UpdateForm from '@/components/client/UpdateForm'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text
} from '@chakra-ui/react'
import { cookies } from 'next/headers'

export default async function ProfileSetting() {
  const token = cookies().get('accessToken')?.value
  const result = await accountApiRequest.getMeServer(token as string)
  console.log('🐻 ~ ProfileSetting ~ result:', result)
  return (
    <Box p='100px 100px'>
      <Heading as='h2' size='2xl' mb='30px'>
        Profile
      </Heading>
      <Card>
        <CardHeader>
          <Heading size='md'>Personal Info</Heading>
        </CardHeader>

        <CardBody>
          <Box>
            <UpdateForm profile={result.payload.data} />
          </Box>
        </CardBody>
      </Card>
    </Box>
  )
}
