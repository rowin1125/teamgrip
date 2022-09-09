import React from 'react'

import {
  Flex,
  Heading,
  Button,
  UseDisclosureProps,
  Text,
} from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import Card from 'src/components/Card/Card'
import PlayerIsStaffWrapper from 'src/components/ValidationWrappers/PlayerIsStaffWrapper/PlayerIsStaffWrapper'

import InvitePlayersModal from './components/InvitePlayersModal'

type TeamGeneralInformationProps = {
  team: FindTeamQuery['team']
  disclosure: UseDisclosureProps
  setCurrentTabIndex: (index: number) => void
  currentTabIndex: number
}

const TeamGeneralInformation = ({
  team,
  disclosure,
  currentTabIndex,
  setCurrentTabIndex,
}: TeamGeneralInformationProps) => {
  return (
    <Card>
      <Flex justifyContent="space-between">
        <Heading fontSize="6xl">{team?.name}</Heading>
      </Flex>
      <Flex>
        <Text fontWeight="bold" mr={2}>
          Beheerder:{' '}
        </Text>
        <Text>
          {team?.owner.userProfile.firstname} {team?.owner.userProfile.lastname}
        </Text>
        <Text></Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Active uitnoding: </Text>
        <Text ml={2}>{team?.invitationToken ? 'Ja' : 'Nee'}</Text>
      </Flex>
      <PlayerIsStaffWrapper>
        <Flex mt={8} flexDirection={{ base: 'column', xl: 'row' }}>
          <Button
            mr={{ base: 0, xl: 4 }}
            mb={{ base: 4, xl: 0 }}
            colorScheme="secondary"
            onClick={() => {
              setCurrentTabIndex(1)
              disclosure.onOpen()
            }}
          >
            Maak ghost spelers aan
          </Button>
          <InvitePlayersModal
            team={team}
            {...disclosure}
            defaultIndex={currentTabIndex}
            setCurrentTabIndex={setCurrentTabIndex}
          />
        </Flex>
      </PlayerIsStaffWrapper>
    </Card>
  )
}

export default TeamGeneralInformation
