'use client'

import {
  Button,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  RadioGroup,
  Radio,
  FormHelperText,
  HStack
} from '@chakra-ui/react'
import React from 'react'

interface ModalFormTypes {
  isOpen: boolean
  onClose: () => void
}

export default function ModalForm({ isOpen, onClose }: ModalFormTypes) {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
              <Tab>Forgot</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input ref={initialRef} placeholder='Type your phone number' />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Type your password' />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3}>
                    Sign in
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </TabPanel>
              <TabPanel>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Your fullname</FormLabel>
                    <Input ref={initialRef} placeholder='Type your full name' />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input ref={initialRef} placeholder='Type your phone number' />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder='Type your password' />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Confirm password</FormLabel>
                    <Input placeholder='Type your confirm password' />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Select your role</FormLabel>
                    <RadioGroup defaultValue='USER'>
                      <HStack spacing='24px'>
                        <Radio value='USER'>User</Radio>
                        <Radio value='CLIENT'>Client</Radio>
                      </HStack>
                    </RadioGroup>
                    <FormHelperText>Select only if you're a fan.</FormHelperText>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3}>
                    Sign up
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </TabPanel>
              <TabPanel>
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  )
}
