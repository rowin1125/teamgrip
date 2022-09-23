import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { format } from 'date-fns'

import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import GameForm from '../form/GameForm'

import { useGetGameById } from './hooks/useGetGameById'
import { useUpdateGameById } from './hooks/useUpdateGameById'

const UpdateGamePage = () => {
  const { game, gameLoading } = useGetGameById()
  const { team, loading } = useGetTeamById()
  const { handleUpdateGame, handleUpdateGameLoading } = useUpdateGameById(
    game?.id
  )

  if (handleUpdateGameLoading || loading || !game) return null

  const regularScores = game?.scores.filter((score) => score.type === 'GAME')
  const topGameScores = game?.scores.filter(
    (score) => score.type === 'TOP_GAME'
  )

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
                gameDate: format(new Date(game.gameDate), 'yyyy-MM-dd'),
                seasonId: game?.season.id,
                teamId: game?.teamId,
                scores: regularScores.map((score) => ({
                  playerId: score.player.id,
                  seasonId: game.season.id,
                  points: score.points,
                  teamId: team?.id,
                  gameId: '',
                  type: 'GAME',
                })),
                topGameScores: topGameScores.map((score) => ({
                  playerId: score.player.id,
                  seasonId: game.season.id,
                  points: score.points,
                  teamId: team?.id,
                  gameId: '',
                  type: 'TOP_GAME',
                })),
              }}
              type="new"
              onSubmit={handleUpdateGame}
              loading={gameLoading || handleUpdateGameLoading}
              team={team}
              players={team?.players.filter((player) => player.isActivePlayer)}
            />
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default UpdateGamePage
