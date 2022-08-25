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

import { useDeleteInvitationToken } from '../hooks/useDeleteInvitationToken'

type DeleteTeamInvitationTokenDialogProps = { teamId: string }

const DeleteTeamInvitationTokenDialog = ({
  teamId,
}: DeleteTeamInvitationTokenDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const { handleDeleteInvitationToken, loading } =
    useDeleteInvitationToken(teamId)

  return (
    <>
      <Button ml={4} colorScheme="red" onClick={onOpen}>
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
              <Text mb={2}>
                De huidige uitnodiging is na het intrekken niet meer te
                gebruiken.
              </Text>
              <Text>Weet je zeker dat je deze uitnodiging wilt intrekken?</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteInvitationToken}
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

export default DeleteTeamInvitationTokenDialog
