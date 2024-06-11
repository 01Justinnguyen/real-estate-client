import accountApiRequest from '@/apis/client'
import UpdateForm from '@/components/client/UpdateForm'
import { Box, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import { cookies } from 'next/headers'

export default async function ProfileSetting() {
  const token = cookies().get('accessToken')?.value
  const result = await accountApiRequest.getMeServer(token as string)
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
