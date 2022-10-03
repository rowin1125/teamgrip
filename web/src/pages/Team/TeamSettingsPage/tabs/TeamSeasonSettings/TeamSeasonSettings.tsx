import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { routes } from '@redwoodjs/router'

import RedwoodLink from 'src/components/RedwoodLink'
import TeamTable from 'src/components/TeamTable'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import { useDeleteSeasonById } from './hooks/useDeleteSeasonById'
import { useGetSeasonsByTeamId } from './hooks/useGetSeasonsByTeamId'

const TeamSeasonSettings = () => {
  const { seasons, loading } = useGetSeasonsByTeamId()
  const { team } = useGetTeamById()
  const { handleDeleteSeason } = useDeleteSeasonById()

  if (loading) return null

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <Heading as="h2" size="lg" mt={8}>
          Beheer jouw seizoenen
        </Heading>
        {team && (
          <Button
            colorScheme="secondary"
            as={RedwoodLink}
            to={routes.newSeason({
              id: team?.id,
            })}
            mt={{ base: 4, xl: 0 }}
          >
            Nieuwe seizoen
          </Button>
        )}
      </Flex>

      <Box overflowX="auto">
        <TeamTable
          theme="light"
          size="sm"
          entries={seasons?.map((season) => {
            const seasonScoresAmount = season?.scores?.length

            return {
              id: season?.id,
              Seizoensnaam: season?.name,
              Actief: season?.active ? 'Ja' : 'Nee',
              'Aantal trainingen': season?.trainings.length,
              'Aantal wedstrijden': season?.games.length,
              'Aantal scores': seasonScoresAmount,
            }
          })}
          hiddenColumns={['id']}
          routes={{
            update: routes.updateSeason,
          }}
          onDelete={handleDeleteSeason}
          showActions
        />
      </Box>
    </Box>
  )
}

export default TeamSeasonSettings
