import React from 'react'

import { Box, GridItem, Heading } from '@chakra-ui/react'

import Card from 'src/components/Card/Card'
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper'

import ScoreTimeline from './components/ScoreTimeline'
import { useGetAllGamesAndTrainingsByTeamId } from './hooks/useGetAllGamesAndTrainingsByTeamId'

const PlayersScoreTimeline = () => {
  const { allGamesAndTrainings, loading } = useGetAllGamesAndTrainingsByTeamId()

  if (loading) return null

  return (
    <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
      <Card bg="primary.500" color="white">
        <Heading color="white">Scoreverloop</Heading>
        <Box mt={8}>
          <SeasonLockWrapper>
            <ScoreTimeline
              allGamesAndTrainings={allGamesAndTrainings}
              isLoading={loading}
            />
          </SeasonLockWrapper>
        </Box>
      </Card>
    </GridItem>
  )
}

export default PlayersScoreTimeline
