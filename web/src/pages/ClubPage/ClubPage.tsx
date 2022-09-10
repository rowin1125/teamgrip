import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'
import Avatar from 'avataaars'

import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'

const ClubPage = () => {
  return (
    <>
      <MetaTags title="Mijn Club" description="Club page" />

      {/* <PlayerCard /> */}
      <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap={4}>
        <GridItem colSpan={{ base: 12, xl: 8 }}>
          <Card>
            <Flex
              justifyContent="space-between"
              flexDir={{ base: 'column', xl: 'row' }}
            >
              <Box order={{ base: 2, xl: 0 }}>
                <Heading display={{ base: 'none', xl: 'block' }} mb={4}>
                  Mijn Club
                </Heading>

                <Text fontSize="xl">
                  Je maakt nog geen onderdeel uit van een club.{' '}
                </Text>
                <Text fontSize="xl" mt={4}>
                  Om onderdeel van een <strong>club</strong> te worden moet je
                  deel uitmaken van een <strong>team</strong>. Zorg dat je een
                  uitnodiging krijgt van een team of start je eigen team bij een
                  club.
                </Text>
                <Flex
                  flexDirection={{ base: 'column', xl: 'row' }}
                  mt={{ base: 4, xl: 0 }}
                >
                  <Button
                    to={routes.newTeam()}
                    as={RedwoodLink}
                    mt={{ base: 0, xl: 4 }}
                    colorScheme="secondary"
                    mr={{ base: 0, xl: 4 }}
                  >
                    Maak een team
                  </Button>
                  <Button mt={4}>Check je uitnodigingen</Button>
                </Flex>
              </Box>

              <Box order={{ base: 0, xl: 2 }}>
                <Heading display={{ base: 'block', xl: 'none' }} mb={4}>
                  Mijn Club
                </Heading>

                <Flex justifyContent="center" mb={4}>
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
              </Box>
            </Flex>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default ClubPage
