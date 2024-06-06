'use client'

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import {
  ModalOverlay,
  Modal,
  ModalContent,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react'
import React from 'react'

interface ModalFormTypes {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModalForm({ isOpen, onClose }: ModalFormTypes) {
  console.log('AuthModalForm nav,  Rerender nè vì login')

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authentication</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
                <Tab>Forgot</Tab>
              </TabList>
              <TabPanels>
                {/* Login */}
                <TabPanel>
                  <LoginForm onClose={onClose} />
                </TabPanel>
                {/* Register */}
                <TabPanel>
                  <RegisterForm onClose={onClose} />
                </TabPanel>
                {/* Forgot */}
                <TabPanel>
                  <ForgotPasswordForm onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
