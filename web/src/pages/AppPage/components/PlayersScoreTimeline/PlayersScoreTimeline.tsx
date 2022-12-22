import React from 'react';

import { Box, GridItem, Heading } from '@chakra-ui/react';

import Card from 'src/components/Card/Card';
import SpinnerLoader from 'src/components/Loaders/SpinnerLoader/SpinnerLoader';
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper';

import ScoreTimeline from './components/ScoreTimeline';
import { useGetAllGamesAndTrainingsByTeamId } from './hooks/useGetAllGamesAndTrainingsByTeamId';

const PlayersScoreTimeline = () => {
  const { allGamesAndTrainings, loading } =
    useGetAllGamesAndTrainingsByTeamId();

  return (
    <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
      <Card bg="primary.500" color="white" h="full">
        <SpinnerLoader isLoading={loading}>
          <Heading color="white">Scoreverloop</Heading>
          <Box mt={8}>
            <SeasonLockWrapper>
              <ScoreTimeline
                allGamesAndTrainings={allGamesAndTrainings}
                isLoading={loading}
              />
            </SeasonLockWrapper>
          </Box>
        </SpinnerLoader>
      </Card>
    </GridItem>
  );
};

export default PlayersScoreTimeline;
