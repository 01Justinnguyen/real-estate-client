import { Button, Flex, FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'
import React from 'react'

interface ForgotPasswordProps extends InputProps {
  onClose: () => void
}

export default function ForgotPasswordForm({ onClose, ...InputProps }: ForgotPasswordProps) {
  return (
    <>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input placeholder='Type your phone number' />
      </FormControl>

      <Flex justify='flex-end' mt={4}>
        <Button colorScheme='blue' mr={3}>
          Submit
        </Button>
      </Flex>
    </>
  )
}
