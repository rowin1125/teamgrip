import {
  TrainingByTeamIdQuery,
  TrainingByTeamIdQueryVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

import { TRAINING_FRAGMENT } from 'src/graphql/fragments/TrainingFragment'

export const GET_TRAININGS_BY_TEAM_QUERY = gql`
  ${TRAINING_FRAGMENT}
  query TrainingByTeamIdQuery($id: String!) {
    trainingByTeamId(id: $id) {
      ...TrainingFragment
    }
  }
`

export const useGetTrainingsByTeam = () => {
  const { currentUser } = useAuth()

  const { data: trainings, loading } = useQuery<
    TrainingByTeamIdQuery,
    TrainingByTeamIdQueryVariables
  >(GET_TRAININGS_BY_TEAM_QUERY, {
    variables: { id: currentUser?.player?.teamId || '' },
  })

  return { trainings: trainings?.trainingByTeamId, trainingsLoading: loading }
}
