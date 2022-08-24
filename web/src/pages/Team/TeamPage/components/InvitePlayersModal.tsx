import React from 'react'

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'

import InvitePlayers from './InvitePlayers'

type InvitePlayersModalProps = { teamId: string }

const InvitePlayersModal = ({ teamId }: InvitePlayersModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Nodig spelers uit</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nodig spelers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InvitePlayers teamId={teamId} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Klaar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InvitePlayersModal
