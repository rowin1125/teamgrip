import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

import { MetaTags } from '@redwoodjs/web';

import Card from 'src/components/Card/Card';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import { useGetPlayersForTeam } from 'src/pages/Team/TeamPage/hooks/useGetPlayersForTeam';

import GameForm from '../form/GameForm';

import { useCreateGame } from './hooks/useCreateGame';

const NewGamePage = () => {
  const { team, loading } = useGetTeamById();
  const { playersData, playersLoading } = useGetPlayersForTeam();
  const [showTop, setShowTop] = React.useState(true);

  const {
    defaultTeamSeasonId,
    initialScoresInputValues,
    initialTopGameScores,
    createGameLoading,
    handleCreateGame,
  } = useCreateGame({ team, playersData, showTop });

  if (loading || playersLoading) return null;

  return (
    <>
      <MetaTags
        title="Nieuw wedstrijd"
        description="Maak een nieuwe webstrijd aan"
      />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, md: 3, '2xl': 2 }}>
          <Card position="relative">
            <Heading>Nieuwe wedstrijd aanmaken ⚽️🏃</Heading>

            <GameForm
              initialValues={{
                date: format(new Date(), 'yyyy-MM-dd'),
                seasonId: defaultTeamSeasonId,
                teamId: team?.id,
                scores: initialScoresInputValues,
                topGameScores: initialTopGameScores,
              }}
              type="new"
              onSubmit={handleCreateGame}
              loading={createGameLoading}
              team={team}
              players={playersData?.playersForTeam}
              setShowTop={setShowTop}
              showTop={showTop}
            />
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default NewGamePage;
