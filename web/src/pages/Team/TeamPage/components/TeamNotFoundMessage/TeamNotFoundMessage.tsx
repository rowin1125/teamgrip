import React from 'react'

import {
  Grid,
  GridItem,
  Flex,
  Box,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react'
import Avatar from 'avataaars'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'

type TeamNotFoundMessageProps = {
  title: string
  type?: 'team' | 'club'
}

const TeamNotFoundMessage = ({
  title,
  type = 'team',
}: TeamNotFoundMessageProps) => {
  const { currentUser } = useAuth()
  const invitationToken = currentUser?.player?.teamInvitation

  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap={4}>
      <GridItem colSpan={8}>
        <Card>
          <Flex justifyContent="space-between">
            <Box>
              <Heading mb={4}>{title}</Heading>

              <Text>
                Je maakt nog geen onderdeel uit van een <strong>{type}</strong>.{' '}
              </Text>

              <Text mt={4}>
                Om onderdeel van een <strong>{type}</strong> te worden moet je
                of een uitnodiging accepteren of je eigen team bij een club
                starten
              </Text>

              {invitationToken && (
                <Text my={4} color="secondary.500" fontStyle="italic">
                  Je hebt op dit moment 1 open uitnodiging staan voor een team.
                </Text>
              )}
              <Flex mt={4}>
                {invitationToken && (
                  <Button
                    colorScheme="secondary"
                    onClick={() =>
                      navigate(routes.joinTeam({ invitationToken }))
                    }
                  >
                    Bekijk uitnodiging
                  </Button>
                )}
                <Button
                  as={RedwoodLink}
                  ml={invitationToken ? 4 : 0}
                  to={routes.newTeam()}
                >
                  Maak een eigen team
                </Button>
              </Flex>
            </Box>

            <Avatar
              style={{ width: '200px', height: '200px' }}
              avatarStyle="Transparent"
              accessoriesType="Blank"
              topType="ShortHairShortWaved"
              hairColor="Brown"
              facialHairType="BrownDark"
              clotheType="Hoodie"
              clotheColor="Black"
              eyeType="Cry"
              eyebrowType="SadConcerned"
              mouthType="Sad"
              skinColor="Tanned"
            />
          </Flex>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default TeamNotFoundMessage
