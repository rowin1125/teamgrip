import { useEffect } from 'react'

import {
  CreateGameMutation,
  CreateGameMutationVariables,
  CreateScoreInput,
  FindTeamQuery,
  GetPlayersForTeamQuery,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { GAME_FRAGMENT } from 'src/graphql/fragments/GameFragment'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

type UseCreateGameType = {
  team: FindTeamQuery['team']
  playersData?: GetPlayersForTeamQuery
  showTop?: boolean
}

export const CREATE_GAME_MUTATION = gql`
  ${GAME_FRAGMENT}
  mutation CreateGameMutation(
    $input: CreateGameInput!
    $scores: [CreateScoreInput]!
  ) {
    createGame(input: $input, scores: $scores) {
      ...GameFragment
    }
  }
`

export const scoreBlueprint: CreateScoreInput = {
  playerId: '',
  points: 0,
  seasonId: '',
  gameId: '',
  type: 'GAME',
  teamId: '',
}

export const useCreateGame = ({
  team,
  playersData,
  showTop,
}: UseCreateGameType) => {
  const { currentUser, isTeamStaff } = useTeamPlayerAuth()

  const [createGame, { loading: createGameLoading }] = useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CREATE_GAME_MUTATION)

  const handleCreateGame = async (values) => {
    const { scores, topGameScores, ...input } = values
    const allScores = [...scores, ...(showTop ? topGameScores : [])]

    try {
      const game = await createGame({
        variables: {
          input: {
            ...input,
            date: new Date(input.date),
          },
          scores: allScores,
        },
      })
      toast.success(`Wedstrijd aangemaakt`)
      navigate(routes.gameDetail({ id: game?.data?.createGame.id }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const seasonMatchesThisYear = team?.season?.filter((season) =>
    season?.name?.includes(new Date().getFullYear().toString())
  )?.[0]?.id

  const defaultSeasonId = seasonMatchesThisYear ?? team?.season[0].id

  useEffect(() => {
    if (team && team.season?.length === 0) {
      toast.error(
        'Je moet eerst een seizoen aanmaken voor je een wedstrijd kan aanmaken'
      )
      navigate(routes.team())
    }
  }, [team])

  useEffect(() => {
    if (isTeamStaff) return

    toast.error('Je hebt geen toegang voor deze pagina')
    navigate(routes.team())
  }, [currentUser, isTeamStaff])

  const initialScoresInputValues: CreateScoreInput[] =
    playersData?.playersForTeam.map((player) => ({
      ...scoreBlueprint,
      seasonId: defaultSeasonId,
      playerId: player.id,
      teamId: currentUser?.player?.teamId,
    })) || []

  const initialTopGameScores: CreateScoreInput[] = [
    {
      ...scoreBlueprint,
      playerId: '',
      type: 'TOP_GAME',
      points: 50,
      seasonId: defaultSeasonId,
      teamId: team?.id,
      gameId: '',
    },
    {
      ...scoreBlueprint,
      playerId: '',
      type: 'TOP_GAME',
      points: 50,
      seasonId: defaultSeasonId,
      teamId: team?.id,
      gameId: '',
    },
    {
      ...scoreBlueprint,
      playerId: '',
      type: 'TOP_GAME',
      points: 50,
      seasonId: defaultSeasonId,
      teamId: team?.id,
      gameId: '',
    },
  ]

  return {
    defaultTeamSeasonId: defaultSeasonId,
    initialScoresInputValues,
    initialTopGameScores,
    handleCreateGame,
    createGameLoading,
  }
}
