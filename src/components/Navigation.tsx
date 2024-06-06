import { clientSessionToken } from '@/app/http'
import ButtonAddListing from '@/components/navigation/_components/ButtonAddListing'
import ButtonSignIn from '@/components/navigation/_components/ButtonSignIn'
import MenuNav from '@/components/navigation/_components/MenuNav'
import NavLogo from '@/components/navigation/_components/NavLogo'
import Profile from '@/components/navigation/_components/Profile'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { headers } from 'next/headers'

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  console.log('From navigation', clientSessionToken.value)
  const pathname = headers().get('x-current-path')
  const isHomePage = pathname === '/'
  return (
    <>
      <Box
        p='26px 100px'
        w='100%'
        bgColor={pathname === '/' ? 'transparent' : 'white'}
        position='fixed'
        zIndex='50'
        h='85px'
        bg=''
        top='85px'
        className='nav'
      >
        <Flex justifyContent='space-between' gap='2'>
          <NavLogo isHomePage={isHomePage} />

          <Stack direction='row' spacing={4} align='center'>
            <MenuNav isHomePage={isHomePage} />

            {!clientSessionToken.value ? (
              <ButtonSignIn isHomePage={isHomePage} />
            ) : (
              <>
                <ButtonAddListing isHomePage={isHomePage} />
                <Profile />
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  )
}
