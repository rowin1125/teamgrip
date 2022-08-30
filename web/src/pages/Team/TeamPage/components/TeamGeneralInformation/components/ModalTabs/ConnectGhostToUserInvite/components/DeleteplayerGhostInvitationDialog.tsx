import React from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'
import { GetGhostPlayersForTeamQuery } from 'types/graphql'

import TextAlert from 'src/components/TextAlert/TextAlert'

import { useDeleteGhostPlayerInvitation } from '../hooks/useDeleteGhostPlayerInvitation'

type DeleteGhostPlayerInvitationDialogProps = {
  ghost: GetGhostPlayersForTeamQuery['getGhostPlayersByTeamId'][0]
}

const DeleteGhostPlayerInvitationDialog = ({
  ghost,
}: DeleteGhostPlayerInvitationDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const { handleCreateInvitation, loading } = useDeleteGhostPlayerInvitation()

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        <Icon as={BsTrash} />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Heading>Uitnodiging intrekken</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              <TextAlert status="warning" mb={4}>
                De huidige uitnodiging is na het intrekken niet meer te
                gebruiken.
              </TextAlert>
              <Text>Weet je zeker dat je deze uitnodiging wilt intrekken?</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleCreateInvitation(ghost.id)}
                ml={3}
                isLoading={loading}
              >
                Weg ermee
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteGhostPlayerInvitationDialog
