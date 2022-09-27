import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { format } from 'date-fns'

import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'
import { useGetPlayersForTeam } from 'src/pages/Team/TeamPage/hooks/useGetPlayersForTeam'

import TrainingForm from '../form/TrainingForm'

import { useCreateTraining } from './hooks/useCreateTraining'

const NewTrainingPage = () => {
  const { playersData, playersLoading } = useGetPlayersForTeam()
  const { team, loading } = useGetTeamById()

  const {
    handleCreateTraining,
    createTrainingLoading,
    initialScoresInputValues,
    defaultTeamSeasonId,
    initialTopTrainingScores,
  } = useCreateTraining({
    playersData,
    team,
  })

  if (loading || playersLoading) return null

  return (
    <>
      <MetaTags title="Nieuwe training" description="NewTraining page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, md: 3, '2xl': 2 }}>
          <Card position="relative">
            <Heading>Nieuwe training aanmaken ⚽️🏃</Heading>

            <TrainingForm
              initialValues={{
                date: format(new Date(), 'yyyy-MM-dd'),
                seasonId: defaultTeamSeasonId,
                teamId: team.id,
                scores: initialScoresInputValues,
                topTrainingScores: initialTopTrainingScores,
              }}
              type="new"
              onSubmit={handleCreateTraining}
              loading={createTrainingLoading}
              team={team}
              players={playersData?.playersForTeam}
            />
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default NewTrainingPage
