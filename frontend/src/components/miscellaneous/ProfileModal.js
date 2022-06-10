import React from 'react'
import {useDisclosure, Text, Image, Button, Modal, ModalOverlay, ModalCloseButton, ModalContent, ModalBody, ModalFooter, ModalHeader} from '@chakra-ui/react'

const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <div>
          {
              children ? <span onClick={onOpen}>{children}</span> :(<i class="fas fa-eye" onClick={onOpen}></i>)
          }
          
          <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent h='410px'>
                  <ModalHeader
                      fontSize='40px'
                      fontFamily='sans-serif'
                      d='flex'
                      justifyContent='center'
                  >{user.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody
                      d='flex'
                      flexDir='column'
                      alignItems='center'
                      justifyContent='space-between'
                  >
                      <Image
                          borderRadius='full'
                          boxSize='150px'
                          src={user.pic}
                          alt={user.name}
                      />
                      <Text
                          fontSize={{base: '28px', md: '30px'}}
                          fontFamily='sans-serif'
                      > Email: {user.email}
                      </Text>
                  </ModalBody>
                  <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onClose}> Close</Button>
                     
                  </ModalFooter>
              </ModalContent>
          </Modal>
      </div>
  )
}

export default ProfileModal