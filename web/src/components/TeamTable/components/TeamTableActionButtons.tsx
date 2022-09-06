import React from 'react'

import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { AiOutlineEdit } from 'react-icons/ai'

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog'
import RedwoodLink from 'src/components/RedwoodLink'
import TextAlert from 'src/components/TextAlert/TextAlert'

type TeamTableActionButtonsProps = {
  theme?: 'dark' | 'light'
  routes?: {
    detail: (params?: any) => string
    update: (params?: any) => string
  }
  id: string
  onDelete?: (id: string) => Promise<void>
}

const TeamTableActionButtons = ({
  routes,
  id,
  onDelete,
}: TeamTableActionButtonsProps) => {
  return (
    <Flex>
      <Button
        as={RedwoodLink}
        to={routes.update({ id })}
        variant="ghost"
        colorScheme="secondary"
      >
        <Icon as={AiOutlineEdit} />
      </Button>
      <DeleteDialog
        onDelete={onDelete}
        id={id}
        title="Training verwijderen"
        buttonVariant="ghost"
      >
        <TextAlert status="warning">
          <i>Weet je zeker dat je dit wilt verwijderen?</i>
        </TextAlert>
        <Text mt={4}>
          Bij het drukken op <strong>delete</strong> zal dit item met alle
          bijbehorende gegevens worden verwijderd!
        </Text>
      </DeleteDialog>
      <Button variant="ghost" colorScheme="red"></Button>
    </Flex>
  )
}

export default TeamTableActionButtons
