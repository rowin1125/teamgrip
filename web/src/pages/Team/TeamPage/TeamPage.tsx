import { Button, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import {
  FindTeamQuery,
  FindTeamQueryVariables,
  GetPlayersForTeamQuery,
  GetPlayersForTeamQueryVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags, useQuery } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import SortableTable from 'src/components/SortableTable'

import InvitePlayersModal from './components/InvitePlayersModal'
import TeamNotFoundMessage from './components/TeamNotFoundMessage'

const FIND_TEAM_QUERY = gql`
  query FindTeamQuery($id: String!) {
    team(id: $id) {
      id
      name
      invitationToken
      owner {
        id
        userProfile {
          firstname
          lastname
        }
      }
      club {
        name
      }
    }
  }
`

const GET_PLAYERS_FOR_TEAM_QUERY = gql`
  query GetPlayersForTeamQuery($teamId: String!) {
    playersForTeam(teamId: $teamId) {
      id
      user {
        id
        userProfile {
          firstname
          lastname
        }
        avatar {
          avatarStyle
          topType
          accessoriesType
          hatColor
          hairColor
          facialHairType
          facialHairColor
          clotheType
          clotheColor
          graphicType
          eyeType
          eyebrowType
          mouthType
          skinColor
        }
      }
    }
  }
`

const TeamPage = () => {
  const { currentUser } = useAuth()

  const { data, loading } = useQuery<FindTeamQuery, FindTeamQueryVariables>(
    FIND_TEAM_QUERY,
    {
      variables: { id: currentUser?.player?.teamId || '' },
    }
  )
  const { data: playersData } = useQuery<
    GetPlayersForTeamQuery,
    GetPlayersForTeamQueryVariables
  >(GET_PLAYERS_FOR_TEAM_QUERY, {
    variables: { teamId: currentUser?.player?.teamId || '' },
  })

  const isPartOfTeam = !!data?.team?.id

  return (
    <>
      <MetaTags title="Team" description="Team page" />

      {!loading && !isPartOfTeam ? (
        <TeamNotFoundMessage />
      ) : (
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(4, 1fr)"
          gap={10}
        >
          <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={1}>
            <Card>
              <Flex justifyContent="space-between">
                <Heading fontSize="6xl">{data?.team?.name}</Heading>
                <InvitePlayersModal team={data?.team} />
              </Flex>
              <Flex>
                <Text fontWeight="bold" mr={2}>
                  Beheerder:{' '}
                </Text>
                <Text>{data?.team?.owner.userProfile.firstname}</Text>
                <Text>{data?.team?.owner.userProfile.lastname}</Text>
              </Flex>
            </Card>
          </GridItem>
          <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={4}>
            <Card w="100%" bg="primary.500" color="white">
              <Heading>Punten in team: {data?.team?.name}</Heading>
              <SortableTable
                entries={playersData?.playersForTeam.map((player, index) => {
                  const topTree = {
                    1: '🏆️',
                    2: '🥈',
                    3: '🥉',
                  }
                  const medal = topTree[index + 1]
                  const position = medal
                    ? `${medal} ${index + 1}`
                    : ` ${index + 1}`
                  return {
                    positie: position,
                    avatar: player.user.avatar,
                    firstname: player.user.userProfile.firstname,
                    lastname: player.user.userProfile.lastname,
                    points: Math.floor(Math.random() * 100),
                  }
                })}
              />
            </Card>
          </GridItem>
          <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={1}>
            <Card>
              <Heading>Seizoen</Heading>
              <Button mt={4}>Start je seizoen</Button>
            </Card>
          </GridItem>
        </Grid>
      )}
    </>
  )
}

export default TeamPage
