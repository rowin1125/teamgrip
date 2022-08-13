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

import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'

const TeamPage = () => {
  return (
    <>
      <MetaTags title="Team" description="Team page" />

      <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap={4}>
        <GridItem colSpan={8}>
          <Card>
            <Flex justifyContent="space-between">
              <Box>
                <Heading mb={4}>Mijn Team</Heading>

                <Text fontSize="xl">
                  Je maakt nog geen onderdeel uit van een <strong>team</strong>.{' '}
                </Text>
                <Text fontSize="xl" mt={4}>
                  Om onderdeel van een <strong>team</strong> te worden moet je
                  of een uitnodiging accepteren of je eigen team bij een club
                  starten
                </Text>
                <Flex>
                  <Button
                    as={RedwoodLink}
                    mt={4}
                    colorScheme="secondary"
                    mr={4}
                    to={routes.newTeam()}
                  >
                    Maak een team
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
    </>
  )
}

export default TeamPage
