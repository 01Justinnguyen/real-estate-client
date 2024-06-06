import ButtonCustom from '@/components/common/ButtonCustom'
import { navigation } from '@/constants/constants'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

interface MenuNavProps {
  isHomePage: boolean
}

export default function MenuNav({ isHomePage }: MenuNavProps) {
  // console.log('🐻 ~ MenuNav ~ isHomePage:', isHomePage)
  // console.log('Menu nav,  Rerender nè vì login')
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
              <Text>{navItem.content}</Text>
            </ButtonCustom>
          </Link>
        )
      })}
    </>
  )
}
