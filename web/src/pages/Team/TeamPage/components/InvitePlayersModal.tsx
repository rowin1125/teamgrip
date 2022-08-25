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
  Heading,
} from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import InvitePlayers from './InvitePlayers'

type InvitePlayersModalProps = { team: FindTeamQuery['team'] }

const InvitePlayersModal = ({ team }: InvitePlayersModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Nodig spelers uit</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Nodig teamleden uit</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InvitePlayers team={team} />
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
