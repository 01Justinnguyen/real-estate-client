import authApiRequest from '@/apis/auth'
import { clientSessionToken } from '@/app/http'
import { navigation } from '@/constants/constants'
import { useAppStore } from '@/store/useAppStore'
import { handleErrorApi } from '@/utils/errorsHandler'
import { Box, Button, Flex, Image, Stack, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const { setShowModal } = useAppStore()
  const toast = useToast()

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      toast({
        title: 'Thành công.',
        description: `Đăng xuất thành công`,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true
      })
    } catch (errors) {
      handleErrorApi({
        errors
      })
    }
  }
  return (
    <>
      <Box p='26px 100px' w='100%' position='fixed' zIndex='50' h='85px' bg='transparent' top='85px'>
        <Flex justifyContent='space-between' gap='2'>
          <Link href={'/'}>
            <Image
              srcSet={`${pathname && pathname !== '/' ? '/images/logo.png 2x' : '/images/logo2x.png 2x'}`}
              fill='primary.500'
            />
          </Link>

          <Stack direction='row' spacing={4} align='center'>
            {navigation.map((navItem, idx) => {
              return (
                <Link key={navItem.id} className='block' href={navItem.path}>
                  <Button
                    variant={''}
                    _hover={{
                      fontWeight: 600
                    }}
                    fontWeight={400}
                    color={`${pathname !== null && pathname === '/' ? 'white' : 'primary.900'}`}
                  >
                    {navItem.content}
                  </Button>
                </Link>
              )
            })}
            {!clientSessionToken.value ? (
              <Button
                _hover={{
                  bg: 'gray.500'
                }}
                onClick={() => setShowModal(true)}
                fontWeight={400}
                color={`${pathname !== null && pathname !== '/' ? 'primary.900' : 'white'}`}
                variant='outline'
              >
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  _hover={{
                    bg: 'gray.500'
                  }}
                  onClick={() => setShowModal(true)}
                  fontWeight={400}
                  color={`${pathname && pathname !== '/' ? 'primary.900' : 'white'}`}
                  variant='outline'
                >
                  Add Listing
                </Button>
                <Button
                  _hover={{
                    bg: 'gray.500'
                  }}
                  onClick={handleLogout}
                  fontWeight={400}
                  color={`${pathname && pathname !== '/' ? 'primary.900' : 'white'}`}
                  variant='outline'
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  )
}
