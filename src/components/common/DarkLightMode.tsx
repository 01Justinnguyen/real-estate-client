'use client'

import { FaMoon } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'
import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function DarkLightMode() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Tooltip label='DarkLight Mode' fontSize='10px' placement='left-start'>
        <IconButton
          aria-label='darklight-mode'
          icon={colorMode === 'light' ? <FaSun color='white' /> : <FaMoon />}
          onClick={toggleColorMode}
          className='!px-0'
          variant={''}
          _hover={{
            bg: 'gray.500'
          }}
        />
      </Tooltip>
    </>
  )
}
