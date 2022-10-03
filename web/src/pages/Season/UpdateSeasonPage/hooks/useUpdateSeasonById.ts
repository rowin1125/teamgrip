/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UpdateSeasonByIdMutation,
  UpdateSeasonByIdMutationVariables,
  UpdateSeasonInput,
} from 'types/graphql'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { SEASON_FRAGMENT } from 'src/graphql/fragments/SeasonFragment'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

export const UPDATE_SEASON_BY_ID_MUTATION = gql`
  ${SEASON_FRAGMENT}
  mutation UpdateSeasonByIdMutation(
    $id: String!
    $input: UpdateSeasonInput!
    $teamId: String!
  ) {
    updateSeason(id: $id, input: $input, teamId: $teamId) {
      ...SeasonFragment
    }
  }
`

export const useUpdateSeasonById = () => {
  const { id } = useParams()
  const { team } = useGetTeamById()

  const [updateSeason, { loading, error }] = useMutation<
    UpdateSeasonByIdMutation,
    UpdateSeasonByIdMutationVariables
  >(UPDATE_SEASON_BY_ID_MUTATION)

  const handleUpdateSeason = async (values: UpdateSeasonInput) => {
    try {
      if (!team) {
        toast.error('No team found')
        return
      }

      const uniqueName = `${team?.club?.name}-${team?.name}-${values.name}`
      const season = await updateSeason({
        variables: {
          id: id || '',
          teamId: team?.id,
          input: {
            ...values,
            seasonTeamName: uniqueName,
          },
        },
      })

      toast.success(`Seizoen ${season?.data?.updateSeason.name} aangepast`)
      navigate(routes.teamSettings())
    } catch (error: any) {
      console.log(error)
      toast.error(error?.message)
    }
  }

  return {
    handleUpdateSeason,
    handleUpdateSeasonLoading: loading,
    handleUpdateSeasonError: error,
  }
}
