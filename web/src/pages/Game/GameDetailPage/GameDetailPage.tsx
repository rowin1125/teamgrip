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

import { useGetGameById } from '../UpdateGamePage/hooks/useGetGameById'

const GameDetailPage = () => {
  const { game, gameLoading } = useGetGameById()

  if (gameLoading) return null

  const topGameScores = game?.scores.filter(
    (score) => score.type === 'TOP_GAME'
  )
  const regularGameScores = game?.scores.filter(
    (score) => score.type === 'GAME'
  )

  return (
    <>
      <MetaTags
        title="Wedstrijd details"
        description="Alle details van de wedstrijd"
      />

      <Flex
        flexDir={{ base: 'column', xl: 'row' }}
        justifyContent="space-between"
      >
        <Heading as="h1" mb={2} color="white">
          {game?.team.name}
        </Heading>

        <Flex
          flexDir={{ base: 'column', xl: 'row' }}
          justifyContent="space-between"
          mb={10}
        >
          <PlayerIsStaffWrapper>
            {game && (
              <Button
                as={RedwoodLink}
                to={routes.updateGame({ id: game?.id })}
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
              Wedstrijdgegevens
            </Heading>
            <DataDisplay
              wrapperProps={{ mt: 4 }}
              entry={{
                Teamnaam: game.team.name,
                Datum: format(new Date(game?.date || ''), 'dd-MM-yyyy'),
                Seizoen: game?.season.name,
                'Aantal spelers': game?.players.length,
                'Aantal scores': game?.scores.length,
                'Laatst bijgewerkt': format(
                  new Date(game?.updatedAt || ''),
                  'dd-MM-yyyy'
                ),
              }}
            />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 12, xl: 8 }} rowSpan={1}>
          <Card w="100%" bg="primary.500" color="white" overflowX="auto">
            <Heading as="h2" size="lg" mb={10} color="white">
              Top 3 van de wedstrijd
            </Heading>
            <TeamTable
              size="lg"
              entries={topGameScores
                ?.sort((scoreA, scoreB) => scoreB.points - scoreA.points)
                .map((score, index) => ({
                  Rank: index + 1,
                  Naam: score.player.displayName,
                  Avatar: score.player?.user?.avatar,
                  Punten: score.points,
                }))}
            />
          </Card>
          <Card
            w="100%"
            bg="primary.500"
            color="white"
            overflowX="auto"
            mt={10}
          >
            <Heading as="h2" size="lg" mb={10} color="white">
              Resultaat van de training
            </Heading>
            <TeamTable
              size="lg"
              entries={regularGameScores
                .sort((scoreA, scoreB) => scoreB.points - scoreA.points)
                ?.map((score, index) => ({
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

export default GameDetailPage
