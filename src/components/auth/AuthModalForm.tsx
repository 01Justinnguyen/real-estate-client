'use client'

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
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
import React, { useRef } from 'react'

interface ModalFormTypes {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModalForm({ isOpen, onClose }: ModalFormTypes) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)
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
              {/* Login */}
              <TabPanel>
                <LoginForm onClose={onClose} initialRef={initialRef} />
              </TabPanel>
              {/* Register */}
              <TabPanel>
                <RegisterForm onClose={onClose} initialRef={initialRef} />
              </TabPanel>
              {/* Forgot */}
              <TabPanel>
                <ForgotPasswordForm onClose={onClose} initialRef={initialRef} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  )
}
