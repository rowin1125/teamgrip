import { Button, Flex, Grid, GridItem, Heading, Icon } from '@chakra-ui/react'
import { format } from 'date-fns'
import { AiOutlineEdit } from 'react-icons/ai'

import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import DataDisplay from 'src/components/DataDisplay/DataDisplay'
import RedwoodLink from 'src/components/RedwoodLink'
import TeamTable from 'src/components/TeamTable'
import PlayerIsStaffWrapper from 'src/components/ValidationWrappers/PlayerIsStaffWrapper/PlayerIsStaffWrapper'

import { useGetTrainingById } from '../UpdateTrainingPage/hooks/useGetTrainingById'

const TrainingDetailPage = () => {
  const { training, trainingLoading } = useGetTrainingById()

  if (trainingLoading) return null

  const topTrainingScores = training?.scores.filter(
    (score) => score.type === 'TOP_TRAINING'
  )
  const regularTrainingScores = training?.scores.filter(
    (score) => score.type === 'TRAINING'
  )
  const hasTopTrainings = topTrainingScores?.length > 0

  return (
    <>
      <MetaTags
        title="Training Detail"
        description="Alle details van de training"
      />

      <Flex
        flexDir={{ base: 'column', xl: 'row' }}
        justifyContent="space-between"
      >
        <Heading as="h1" size="2xl" mb={2} color="white">
          {training?.team.name}
        </Heading>

        <Flex
          flexDir={{ base: 'column', xl: 'row' }}
          justifyContent="space-between"
          mb={10}
        >
          <PlayerIsStaffWrapper>
            {training && (
              <Button
                as={RedwoodLink}
                to={routes.updateTraining({ id: training?.id })}
                colorScheme="orange"
                mr={{ base: 0, xl: 4 }}
              >
                <Icon as={AiOutlineEdit} />
              </Button>
            )}
          </PlayerIsStaffWrapper>
          <Button as={RedwoodLink} to={routes.team()} colorScheme="secondary">
            Terug naar team
          </Button>
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="auto"
        gap={10}
        position="relative"
      >
        <GridItem colSpan={{ base: 12, xl: 4 }} rowSpan={1}>
          <Card position="sticky" top={10}>
            <Heading as="h2" size="md" mb={4}>
              Traininggegevens
            </Heading>
            <DataDisplay
              wrapperProps={{ mt: 4 }}
              entry={{
                Teamnaam: training.team.name,
                Datum: format(new Date(training?.date || ''), 'dd-MM-yyyy'),
                Seizoen: training?.season.name,
                'Aantal spelers': training?.players.length,
                'Aantal scores': training?.scores.length,
                'Laatst bijgewerkt': format(
                  new Date(training?.updatedAt || ''),
                  'dd-MM-yyyy'
                ),
              }}
            />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 12, xl: 8 }} rowSpan={1}>
          {hasTopTrainings && (
            <Card w="100%" bg="primary.500" color="white" overflowX="auto">
              <Heading as="h2" size="lg" mb={10} color="white">
                Top 3 van de training
              </Heading>
              <TeamTable
                size="lg"
                theme="light"
                entries={topTrainingScores
                  ?.sort((scoreA, scoreB) => scoreB.points - scoreA.points)
                  .map((score, index) => ({
                    Rank: index + 1,
                    Naam: score.player.displayName,
                    Avatar: score.player?.user?.avatar,
                    Punten: score.points,
                  }))}
              />
            </Card>
          )}

          <Card
            w="100%"
            bg="primary.500"
            color="white"
            overflowX="auto"
            mt={hasTopTrainings ? 10 : 0}
          >
            <Heading as="h2" size="lg" mb={10}>
              Trainingresultaat
            </Heading>
            <TeamTable
              size="lg"
              entries={regularTrainingScores
                ?.sort((scoreA, scoreB) => scoreB.points - scoreA.points)
                .map((score, index) => ({
                  Rank: index + 1,
                  Naam: score.player.displayName,
                  Avatar: score.player?.user?.avatar,
                  Punten: score.points,
                }))}
            />
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default TrainingDetailPage
