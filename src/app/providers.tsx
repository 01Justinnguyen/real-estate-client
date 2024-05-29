'use client'
import theme from '@/app/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useAppStore } from '@/store/useAppStore'
import { useEffect } from 'react'
const cache = createCache({ key: 'css', prepend: true })

export function Providers({ children, initialToken }: { children: React.ReactNode; initialToken?: string }) {
  console.log('🐻 ~ Providers ~ initialToken:', initialToken)
  const { setToken } = useAppStore()
  useEffect(() => {
    if (initialToken) {
      setToken(initialToken)
    }
  }, [setToken])
  return (
    <CacheProvider value={cache}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
