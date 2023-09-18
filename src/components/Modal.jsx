/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { useState } from 'react'
import Auth from './Auth'

export default function MyModal({ isOpen, onOpenChange }) {
  const [signUp, setSignUp] = useState(false)

  return (
    <>
      {/* <Button onPress={useModal}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {signUp ? 'Sign Up' : 'Login'}
              </ModalHeader>
              <ModalBody>
                <Auth signUp={signUp} />
              </ModalBody>
              <ModalFooter>
                <div className='text-sm'>
                  {signUp ? (
                    <p>
                      Already have an Account?{' '}
                      <button
                        className='hover:text-blue-400 ml-2'
                        onClick={() => setSignUp(!signUp)}
                      >
                        Login
                      </button>
                    </p>
                  ) : (
                    <p>
                      Not Registered Yet?{' '}
                      <button
                        className='hover:text-blue-400 ml-2'
                        onClick={() => setSignUp(!signUp)}
                      >
                        Sign Up
                      </button>
                    </p>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
