'use client'

import { Box, Button, Flex, IconButton, Spacer, Text, useColorMode } from '@chakra-ui/react'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { FaFacebookF, FaDribbble, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function TopHeader() {
  const pathname = usePathname()
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      sx={{ borderBottom: '2px #fff' }}
      w='100%'
      top='0'
      zIndex='50'
      h='85px'
      bg={`${pathname !== '/' ? 'primary.700' : 'transparent'}`}
      position='fixed'
      p='26px 100px'
    >
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex as='div' alignItems='center' gap='2'>
          <HiOutlineMailOpen color='white' className='text-[24px]' />
          <Text color='white'>Email us at : liam@mail.com</Text>
        </Flex>

        <Flex>
          <Flex alignItems='center' gap='6'>
            <IconButton
              aria-label='darklight-mode'
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              className='!px-0'
              variant={''}
              _hover={{
                bg: 'gray.500'
              }}
            />
            <FaFacebookF color='white' className='text-[20px]' />
            <FaDribbble color='white' className='text-[20px]' />
            <FaLinkedinIn color='white' className='text-[20px]' />
            <FaInstagram color='white' className='text-[20px]' />
            <Box
              sx={{
                height: '30px',
                border: '1px solid #fff'
              }}
            />

            <FiPhone color='white' className='text-[20px]' />
            <Text color='white'>123-4567 890</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
