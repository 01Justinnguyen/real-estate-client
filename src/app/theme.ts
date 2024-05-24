// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import '@fontsource/inter'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

// colors
const colors = {
  primary: {
    0: '#FFFFFF',
    50: '#EDEFF6',
    400: '#6E80B4',
    500: '#4A60A1',
    600: '#3B4D81',
    700: '#2C3A61',
    900: '#0F1320'
  },
  textGray: {
    400: '#889099',
    500: '#6D737A',
    700: '#363A3D',
    800: '#1E2640',
    Black: '1B1D1F'
  },
  textSecondary: {
    normal: '#6D737A',
    medium: '#363A3D'
  }
}

// 3. extend the theme
const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  colors,
  config
})

export default theme
