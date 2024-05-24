import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function DarkLightMode() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
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
    </>
  )
}
