import { useEffect } from 'react';

import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

import { MetaTags } from '@redwoodjs/web';

import Card from 'src/components/Card/Card';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

import GameForm from '../form/GameForm';

import { useGetGameById } from './hooks/useGetGameById';
import { useUpdateGameById } from './hooks/useUpdateGameById';

const UpdateGamePage = () => {
  const { game, gameLoading } = useGetGameById();
  const { team, loading } = useGetTeamById();
  const [showTop, setShowTop] = React.useState(true);

  const { handleUpdateGame, handleUpdateGameLoading } = useUpdateGameById(
    game?.id || '',
    showTop
  );

  const regularScores = game?.scores.filter((score) => score?.type === 'GAME');
  const topGameScores = game?.scores.filter(
    (score) => score?.type === 'TOP_GAME'
  );

  const hasTopGamesScores = !!topGameScores && topGameScores?.length > 0;

  useEffect(() => {
    if (!game) return;

    setShowTop(hasTopGamesScores);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  if (handleUpdateGameLoading || loading || !game) return null;

  const topGamesScoresArray = hasTopGamesScores
    ? topGameScores.map((score) => ({
        playerId: score?.player.id,
        seasonId: game?.season?.id,
        points: score?.points,
        teamId: team?.id,
        gameId: game?.id,
        type: 'TOP_GAME',
      }))
    : [1, 2, 3].map(() => ({
        playerId: '',
        seasonId: game?.season?.id,
        points: 0,
        teamId: team?.id,
        gameId: game?.id,
        type: 'TOP_GAME',
      }));

  return (
    <>
      <MetaTags
        title="Update de wedstrijd"
        description="Update jouw wedstrijd"
      />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, md: 3, '2xl': 2 }}>
          <Card position="relative">
            <Heading>Update Wedstrijd ⚽️🏃</Heading>

            <GameForm
              initialValues={{
                date: format(new Date(game.date), 'yyyy-MM-dd'),
                seasonId: game?.season?.id,
                teamId: game?.teamId,
                scores: regularScores?.map((score) => ({
                  playerId: score?.player?.id,
                  seasonId: game?.season?.id,
                  points: score?.points,
                  teamId: team?.id,
                  gameId: '',
                  type: 'GAME',
                })),
                topGameScores: topGamesScoresArray,
              }}
              type="new"
              onSubmit={handleUpdateGame}
              loading={gameLoading || handleUpdateGameLoading}
              team={team}
              players={team?.players.filter((player) => player?.isActivePlayer)}
              setShowTop={setShowTop}
              showTop={showTop}
            />
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default UpdateGamePage;
