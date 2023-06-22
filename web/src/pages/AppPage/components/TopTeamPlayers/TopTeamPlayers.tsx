import React from 'react';

import { Heading, Text } from '@chakra-ui/react';

import Card from 'src/components/Card/Card';
import SpinnerLoader from 'src/components/Loaders/SpinnerLoader/SpinnerLoader';
import TeamTable from 'src/components/TeamTable';
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper';
import { useGetPlayersAndScoresByTeamId } from 'src/pages/Team/TeamPage/hooks/useGetPlayersAndScoresByTeamId';
import {
  allWordsCapitalized,
  capitalizeText,
} from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

type TopTeamPlayersProps = {
  amount?: number;
};

const TopTeamPlayers = ({ amount = 5 }: TopTeamPlayersProps) => {
  const { playersWithTotalScore, playersWithTotalScoreLoading } =
    useGetPlayersAndScoresByTeamId(amount);

  return (
    <Card
      w="100%"
      bg="primary.500"
      color="white"
      overflowX="auto"
      h="full"
      minH="200px"
    >
      <SpinnerLoader isLoading={playersWithTotalScoreLoading}>
        <SeasonLockWrapper>
          {playersWithTotalScore?.length === 0 ? (
            <>
              <Heading color="white">Top {amount} van het team </Heading>
              <Text>Er zijn nog geen gegevens op te laten zien</Text>
            </>
          ) : (
            <Heading color="white">Top {amount} van het team </Heading>
          )}

          <>
            <TeamTable
              size="sm"
              entries={playersWithTotalScore?.map((player, index) => ({
                Rank: index + 1,
                Punten: player?.totalScore,
                Naam: allWordsCapitalized(player?.displayName || 'Onbekend'),
                Avatar: player?.user?.avatar,
              }))}
              isLoading={playersWithTotalScoreLoading}
            />
          </>
        </SeasonLockWrapper>
      </SpinnerLoader>
    </Card>
  );
};

export default TopTeamPlayers;
