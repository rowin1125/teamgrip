import React from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import InvitePlayers from './InvitePlayers'

type InvitePlayersModalProps = {
  team: FindTeamQuery['team']
  defaultIndex?: number
  setCurrentTabIndex
} & UseDisclosureProps

const InvitePlayersModal = ({
  team,
  setCurrentTabIndex,
  isOpen,
  onClose,
  onOpen,
  defaultIndex,
}: InvitePlayersModalProps) => {
  const handleOpenModel = () => {
    setCurrentTabIndex(0)
    onOpen()
  }

  return (
    <>
      <Button onClick={handleOpenModel}>Nodig spelers uit</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Nodig teamleden uit</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InvitePlayers
              team={team}
              defaultIndex={defaultIndex}
              onClose={onClose}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Klaar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InvitePlayersModal
