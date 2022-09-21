import React from 'react'

import { Heading, Text } from '@chakra-ui/react'

import Card from 'src/components/Card/Card'
import TeamTable from 'src/components/TeamTable'
import { useGetPlayersAndScoresByTeamId } from 'src/pages/Team/TeamPage/hooks/useGetPlayersAndScoresByTeamId'

type TopTeamPlayersProps = {
  amount?: number
}

const TopTeamPlayers = ({ amount = 5 }: TopTeamPlayersProps) => {
  const { playersWithTotalScore, playersWithTotalScoreLoading } =
    useGetPlayersAndScoresByTeamId(amount)

  if (playersWithTotalScoreLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <Card w="100%" bg="primary.500" color="white" overflowX="auto">
      {playersWithTotalScore?.length > 0 ? (
        <>
          <Heading color="white">Top {amount} van het team </Heading>
          <TeamTable
            size="sm"
            entries={playersWithTotalScore?.map((player, index) => ({
              Rank: index + 1,
              Punten: player.totalScore,
              Naam: player.displayName,
              Avatar: player?.user?.avatar,
            }))}
          />
        </>
      ) : (
        <>
          <Heading color="white">Top {amount} van het team </Heading>
          <Text>Er zijn nog geen gegevens op te laten zien</Text>
        </>
      )}
    </Card>
  )
}

export default TopTeamPlayers
