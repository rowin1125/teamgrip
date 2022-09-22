import { Button, Text } from '@chakra-ui/react'

import { routes } from '@redwoodjs/router'

import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import RedwoodLink from '../RedwoodLink'
import TextAlert from '../TextAlert/TextAlert'

const NoSeasonAlert = () => {
  const { team, loading } = useGetTeamById()
  if (loading) return null

  if (!team?.id) return null

  const someSeasonActive = team?.season.some((season) => season.active)
  if (someSeasonActive) return null

  return (
    <TextAlert status="error" m={10} mb={10}>
      <Text>
        Er is op dit moment nog geen actief seizoen.{' '}
        <Button
          as={RedwoodLink}
          to={routes.teamSettings()}
          variant="link"
          textDecor="underline"
        >
          Activeer
        </Button>{' '}
        een seizoen om data zichtbaar te maken
      </Text>
    </TextAlert>
  )
}

export default NoSeasonAlert
