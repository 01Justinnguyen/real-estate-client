import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

interface ButtonCustomProps extends ButtonProps {
  pathname?: string
}

export default function ButtonCustom({ pathname, children, ...rest }: ButtonCustomProps) {
  return <Button {...rest}>{children}</Button>
}
