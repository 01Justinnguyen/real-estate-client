import Link from 'next/link'
import React from 'react'
import { Image } from '@chakra-ui/react'

interface NavLogoProps {
  isHomePage: boolean
}

export default function NavLogo({ isHomePage }: NavLogoProps) {
  return (
    <Link href={'/'}>
      <Image srcSet={`${isHomePage ? '/images/logo2x.png 2x' : '/images/logo.png 2x'}`} />
    </Link>
  )
}
