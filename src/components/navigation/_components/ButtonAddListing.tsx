import ButtonCustom from '@/components/common/ButtonCustom'
import React from 'react'

interface ButtonAddListingProps {
  isHomePage: boolean
}

export default function ButtonAddListing({ isHomePage }: ButtonAddListingProps) {
  return (
    <ButtonCustom
      _hover={{
        bg: 'gray.500'
      }}
      fontWeight={400}
      color={`${isHomePage ? 'primary.900' : 'white'}`}
      variant='outline'
    >
      Add Listing
    </ButtonCustom>
  )
}
