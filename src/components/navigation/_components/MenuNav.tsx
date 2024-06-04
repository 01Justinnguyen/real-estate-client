import ButtonCustom from '@/components/common/ButtonCustom'
import { navigation } from '@/constants/constants'
import Link from 'next/link'
import React from 'react'

interface MenuNavProps {
  isHomePage: boolean
}

export default function MenuNav({ isHomePage }: MenuNavProps) {
  console.log('🐻 ~ MenuNav ~ isHomePage:', isHomePage)
  return (
    <>
      {navigation.map((navItem) => {
        return (
          <Link key={navItem.id} className='block' href={navItem.path}>
            <ButtonCustom
              variant={''}
              _hover={{
                fontWeight: 600
              }}
              fontWeight={400}
              color={`${isHomePage ? 'white' : 'primary.900'}`}
            >
              {navItem.content}
            </ButtonCustom>
          </Link>
        )
      })}
    </>
  )
}
