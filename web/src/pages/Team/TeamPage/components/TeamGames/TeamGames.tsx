import React from 'react'

import { Flex, Heading, Button, Box } from '@chakra-ui/react'
import { format } from 'date-fns'

import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'
import TeamTable from 'src/components/TeamTable'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import { useDeleteGameById } from './hooks/useDeleteGameById'
import { useGetGamesByTeamId } from './hooks/useGetGamesByTeamId'

const TeamGames = () => {
  const { games, gamesLoading } = useGetGamesByTeamId()
  const { handleDeleteGameById } = useDeleteGameById()
  const { isTeamStaff } = useTeamPlayerAuth()

  const gameEntries = games?.map((game) => {
    const bestPlayerOfGame = game?.scores?.slice()?.sort((a, b) => {
      if (!a?.points || !b?.points) return 0

      if (a.points < b.points) return -1
      if (a.points > b.points) return 1
      return 0
    })?.[0]

    return {
      id: game?.id,
      datum: game?.date ? format(new Date(game.date), 'dd-MM-yyyy') : '',
      aantal: game?.scores.filter((score) => score?.type === 'GAME').length,
      'M-O-T-M': bestPlayerOfGame?.player?.displayName,
      season: game?.season?.name,
    }
  })

  return (
    <Card>
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <Heading>Recente wedstrijden</Heading>
        {isTeamStaff && (
          <Button
            colorScheme="secondary"
            as={RedwoodLink}
            to={routes.newGame()}
            mt={{ base: 4, xl: 0 }}
          >
            Registreer wedstrijd
          </Button>
        )}
      </Flex>
      <Box overflowX="auto">
        <TeamTable
          theme="light"
          size={isTeamStaff ? 'sm' : 'md'}
          entries={gameEntries}
          hiddenColumns={['id']}
          isLoading={gamesLoading}
          routes={{
            detail: routes.gameDetail,
            update: routes.updateGame,
          }}
          onDelete={handleDeleteGameById}
          showActions
        />
      </Box>
    </Card>
  )
}

export default TeamGames
