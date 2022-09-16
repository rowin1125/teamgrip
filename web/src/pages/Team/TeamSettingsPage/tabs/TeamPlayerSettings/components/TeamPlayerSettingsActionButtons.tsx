import React from 'react'

import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog'
import TextAlert from 'src/components/TextAlert/TextAlert'

import TeamPlayerSettingsEditPlayerType from './TeamPlayerSettingsEditPlayerType'

type TeamPlayerSettingsActionButtonsProps = {
  row: Record<string, any>
  onDelete?: (id: string) => Promise<void>
  entries?: Record<string, any>[]
}

const TeamPlayerSettingsActionButtons = ({
  row,
  onDelete,
  entries,
}: TeamPlayerSettingsActionButtonsProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  return (
    <Flex>
      <TeamPlayerSettingsEditPlayerType
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        entries={entries}
        row={row}
      />
      <DeleteDialog
        buttonVariant={'outline'}
        onDelete={onDelete}
        id={row.id}
        title="Training verwijderen"
      >
        <TextAlert status="warning">
          <i>Weet je zeker dat je deze speler wilt verwijderen uit je team?</i>
        </TextAlert>
        <Text mt={4}>
          Bij het drukken op <strong>delete</strong> zal de speler worden
          verwijderd en alle bijbehorende gegevens die gekoppeld zijn aan dit
          team verloren gaan.
        </Text>
      </DeleteDialog>
      <Button variant="ghost" colorScheme="red"></Button>
    </Flex>
  )
}

export default TeamPlayerSettingsActionButtons
