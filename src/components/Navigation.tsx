'use client'

import { navigation } from '@/constants/constants'
import { Box, Button, Flex, Image, Stack } from '@chakra-ui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

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
              fontWeight={400}
              color={`${pathname !== '/' ? 'primary.900' : 'white'}`}
              variant='outline'
            >
              Add Listing
            </Button>
          </Stack>

          {/* <Stack direction='row' spacing={4} align='center'>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='ghost'>
              HOME
            </Button>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='ghost'>
              ABOUT US
            </Button>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='ghost'>
              OUR AGENTS
            </Button>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='ghost'>
              PROPERTIES
            </Button>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='ghost'>
              BLOG
            </Button>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='ghost'>
              SEARCH
            </Button>
            <Button fontWeight={400} color={`${pathname !== '/' ? 'primary.900' : 'white'}`} variant='outline'>
              Add Listing
            </Button>
          </Stack> */}
        </Flex>
      </Box>
    </>
  )
}
