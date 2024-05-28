import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader
} from '@chakra-ui/react'
import React, { MutableRefObject } from 'react'

interface ForgotPasswordProps extends InputProps {
  onClose: () => void
  initialRef: MutableRefObject<null | HTMLInputElement>
}

export default function ForgotPasswordForm({ onClose, initialRef, ...InputProps }: ForgotPasswordProps) {
  return (
    <>
      <ModalHeader>Forgot password</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input ref={initialRef} placeholder='Type your phone number' />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3}>
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  )
}
