import ModalForm from '@/components/common/ModalForm'
import { navigation } from '@/constants/constants'
import { Box, Button, Flex, Image, Stack, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box p='26px 100px' w='100%' position='fixed' zIndex='50' h='85px' bg='transparent' top='85px'>
        <Flex justifyContent='space-between' gap='2'>
          <Link href={'/'}>
            <Image
              srcSet={`${pathname !== '/' ? '/images/logo.png 2x' : '/images/logo2x.png 2x'}`}
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
                    color={`${pathname !== '/' ? 'primary.900' : 'white'}`}
                  >
                    {navItem.content}
                  </Button>
                </Link>
              )
            })}
            <Button
              _hover={{
                bg: 'gray.500'
              }}
              onClick={onOpen}
              fontWeight={400}
              color={`${pathname !== '/' ? 'primary.900' : 'white'}`}
              variant='outline'
            >
              Add Listing
            </Button>
          </Stack>
        </Flex>
      </Box>
      <ModalForm isOpen={isOpen} onClose={onClose} />
    </>
  )
}
