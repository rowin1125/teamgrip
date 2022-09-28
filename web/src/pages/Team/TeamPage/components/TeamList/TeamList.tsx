import React from 'react'

import {
  Heading,
  Flex,
  Button,
  Icon,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { BiUserPlus } from 'react-icons/bi'
import { FindTeamQuery } from 'types/graphql'

import Card from 'src/components/Card/Card'
import TeamTable from 'src/components/TeamTable'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

import { useGetPlayersAndScoresByTeamId } from '../../hooks/useGetPlayersAndScoresByTeamId'

type TeamListProps = {
  team: FindTeamQuery['team']
  setCurrentTabIndex: (index: number) => void
  disclosure: UseDisclosureProps
}

const TeamList = ({ team, setCurrentTabIndex, disclosure }: TeamListProps) => {
  const { playersWithTotalScore, playersWithTotalScoreLoading } =
    useGetPlayersAndScoresByTeamId()

  return (
    <Card w="100%" bg="primary.500" color="white" overflowX="auto">
      {!playersWithTotalScoreLoading && playersWithTotalScore?.length === 0 && (
        <>
          <Heading color="white">Je hebt nog geen teamleden</Heading>
          <Text my={4}>
            Begin met het samenstellen van je team doormiddel van spelers uit te
            nodigen
          </Text>
          <Flex my={10} justifyContent="center">
            <Button
              onClick={() => {
                setCurrentTabIndex(1)
                disclosure.onOpen()
              }}
              variant="ghost"
              h="400px"
              w="400px"
              borderColor="secondary.500"
              borderStyle="dashed"
              borderWidth="1px"
              justifyContent="center"
              alignItems="center"
              transition="all 0.3s ease"
              _hover={{
                bg: 'primary.600',
              }}
              _active={{
                bg: 'primary.800',
              }}
            >
              <Icon as={BiUserPlus} fontSize="150px" color="secondary.500" />
            </Button>
          </Flex>
        </>
      )}

      <>
        <Heading color="white">Punten in team: {team?.name}</Heading>
        <TeamTable
          size="sm"
          entries={playersWithTotalScore?.map((player, index) => ({
            Rank: index + 1,
            Punten: player.totalScore,
            Naam: `${capitalizeText(player.displayName)}`,
            Avatar: player?.user?.avatar,
          }))}
          isLoading={playersWithTotalScoreLoading}
        />
      </>
    </Card>
  )
}

export default TeamList
