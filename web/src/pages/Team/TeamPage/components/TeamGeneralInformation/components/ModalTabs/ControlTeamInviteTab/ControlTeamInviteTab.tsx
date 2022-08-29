import React from 'react'

import {
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Input,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { BsWhatsapp } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { TbCheck } from 'react-icons/tb'
import { FindTeamQuery } from 'types/graphql'

import TextAlert from 'src/components/TextAlert/TextAlert'

import DeleteTeamInvitationTokenDialog from '../../../../DeleteTeamInvitationTokenDialog'
import ValidateTeamInvitation from '../../ValidateTeamInvitation'

type ControlTeamInviteTabProps = {
  team?: FindTeamQuery['team']
}

const ControlTeamInviteTab = ({ team }: ControlTeamInviteTabProps) => {
  const inviteUrl = `${process.env.FRONTEND_URL}/app/team/join?invitationToken=${team?.invitationToken}`
  const { hasCopied, onCopy } = useClipboard(inviteUrl)
  return (
    <ValidateTeamInvitation team={team}>
      <TextAlert status="warning">
        <Text>
          Je hebt op dit moment een actieve uitnoding voor het team. Dit
          betekend dat iedereen met de volgende url het team kan joinen.
        </Text>
      </TextAlert>
      <Text fontStyle="italic" fontSize="md" mt={4}>
        Gebruik het vuilnisbak als je deze uitnoding ongedaan wilt maken.
      </Text>
      <Flex mb={2} w={{ base: 'full', xl: '66%' }}>
        <Input
          title={inviteUrl}
          value={inviteUrl}
          isReadOnly
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        />
        <Button onClick={onCopy} ml={2} color="white">
          {hasCopied ? (
            <Icon as={TbCheck} color="white" />
          ) : (
            <Icon as={MdContentCopy} color="white" />
          )}
        </Button>
        <DeleteTeamInvitationTokenDialog teamId={team.id} />
      </Flex>
      <ButtonGroup mt={4}>
        <Button
          as="a"
          target="_blank"
          href={`https://api.whatsapp.com/send?text=TeamStats:+Je+ben+uitgenodigd+om+een+team+te+joinen.+Bekijk+nu+je+uitnodiging:+${encodeURI(
            inviteUrl
          )}`}
          colorScheme="whatsapp"
        >
          Deel via WhatsApp <Icon as={BsWhatsapp} ml={4} />
        </Button>
      </ButtonGroup>
    </ValidateTeamInvitation>
  )
}

export default ControlTeamInviteTab
