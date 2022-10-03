import React from 'react'

import { Flex, Heading, Button, UseDisclosureProps } from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import Card from 'src/components/Card/Card'
import DataDisplay from 'src/components/DataDisplay/DataDisplay'
import DefaultLoader from 'src/components/DefaultLoader/DefaultLoader'
import PlayerIsStaffWrapper from 'src/components/ValidationWrappers/PlayerIsStaffWrapper/PlayerIsStaffWrapper'

import InvitePlayersModal from './components/InvitePlayersModal'

type TeamGeneralInformationProps = {
  team: FindTeamQuery['team']
  disclosure: UseDisclosureProps
  setCurrentTabIndex: (index: number) => void
  currentTabIndex: number
  isLoading: boolean
}

const TeamGeneralInformation = ({
  team,
  disclosure,
  currentTabIndex,
  setCurrentTabIndex,
  isLoading,
}: TeamGeneralInformationProps) => {
  const activeSeason = team?.season?.find((s) => s?.active)

  return (
    <DefaultLoader isLoading={isLoading}>
      <Card>
        <Flex justifyContent="space-between">
          <Heading fontSize="6xl">{team?.name}</Heading>
        </Flex>
        <DataDisplay
          entry={{
            Beheerder: `${team?.owner?.userProfile.firstname} ${team?.owner?.userProfile.lastname}`,
            Club: team?.club?.name,
            'Actieve uitnodiging': team?.invitationToken ? 'Ja' : 'Nee',
            'Actief seizoen': activeSeason?.name || 'Geen',
            'Aantal spelers': team?.players.length,
          }}
        />

        <PlayerIsStaffWrapper>
          <Flex mt={8} flexDirection={{ base: 'column', xl: 'row' }}>
            <Button
              mr={{ base: 0, xl: 4 }}
              mb={{ base: 4, xl: 0 }}
              colorScheme="secondary"
              onClick={() => {
                setCurrentTabIndex(1)
                disclosure?.onOpen?.()
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
    </DefaultLoader>
  )
}

export default TeamGeneralInformation
