import {
  CreateSeasonInput,
  CreateSeasonMutation,
  CreateSeasonMutationVariables,
  FindTeamQuery,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { SEASON_FRAGMENT } from 'src/graphql/fragments/SeasonFragment'

export const CREATE_SEASON_MUTATION = gql`
  ${SEASON_FRAGMENT}
  mutation CreateSeasonMutation($input: CreateSeasonInput!, $teamId: String!) {
    createSeason(input: $input, teamId: $teamId) {
      ...SeasonFragment
    }
  }
`
export const useCreateSeason = (team: FindTeamQuery['team']) => {
  const [createSeason, { loading: seasonLoading }] = useMutation<
    CreateSeasonMutation,
    CreateSeasonMutationVariables
  >(CREATE_SEASON_MUTATION)

  const handleCreateSeason = async (values: CreateSeasonInput) => {
    try {
      const season = await createSeason({
        variables: {
          teamId: team?.id,
          input: {
            ...values,
            seasonTeamName: `${team?.club.name}-${team?.name}-${values.name}`,
          },
        },
      })
      toast.success(`Seizoen ${season.data.createSeason.name} aangemaakt`)
      navigate(routes.team())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return {
    handleCreateSeason,
    seasonLoading,
  }
}
