import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function HomePage() {
  return (
    <Box as='main' bg='white' w='100%'>
      <Box height='fit-content' w='100%' position='relative'>
        <Image src='/images/banner.png' />

        <Box mt='160px' className='absolute inset-0 flex items-center justify-center flex-col'>
          <Text mb='24px' fontSize='50px' color='white' as='h2'>
            Find Your Dream Home
          </Text>
          <Text textAlign='center' maxW='696px' fontSize='20px' color='primary.50'>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales
            ultrices nulla blandit volutpat.
          </Text>
        </Box>
      </Box>

      <Box>Content</Box>
    </Box>
  )
}
