'use client'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import { Button, useColorMode } from '@chakra-ui/react'
export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
        About
      </Link>
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? <SunIcon /> : <MoonIcon />}</Button>
    </>
  )
}
