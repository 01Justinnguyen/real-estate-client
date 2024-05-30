'use client'
import theme from '@/app/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useState } from 'react'
import { clientSessionToken } from '@/app/http'
const cache = createCache({ key: 'css', prepend: true })

export function Providers({ children, initialToken }: { children: React.ReactNode; initialToken?: string }) {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = initialToken as string
    }
  })

  return (
    <CacheProvider value={cache}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
