import { clientSessionToken } from '@/app/http'
import ButtonAddListing from '@/components/navigation/_components/ButtonAddListing'
import ButtonLogout from '@/components/navigation/_components/ButtonLogout'
import ButtonSignIn from '@/components/navigation/_components/ButtonSignIn'
import MenuNav from '@/components/navigation/_components/MenuNav'
import NavLogo from '@/components/navigation/_components/NavLogo'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { cookies } from 'next/headers'

interface NavigationProps {
  isHomePage: boolean
}

export default function Navigation({ isHomePage }: NavigationProps) {
  console.log('navigation', clientSessionToken)
  const isAccess = cookies().get('accessToken')?.value
  console.log('🐻 ~ Navigation ~ isAccess:', isAccess)
  return (
    <>
      <Box
        p='26px 100px'
        w='100%'
        bgColor={isHomePage ? 'transparent' : 'white'}
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

            {!isAccess ? (
              <ButtonSignIn isHomePage={isHomePage} />
            ) : (
              <>
                <ButtonAddListing isHomePage={isHomePage} />
                <ButtonLogout isHomePage={isHomePage} />
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  )
}
