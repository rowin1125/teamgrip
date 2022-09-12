import { FieldArray } from 'formik'
import {
  CreateScoreInput,
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetGameByIdQuery,
  CreateGameInput,
} from 'types/graphql'

import SingleScoreField from './SingleScoreField'

export type ScoreFormValues = CreateGameInput & {
  scores: CreateScoreInput[]
  topGameScores: CreateScoreInput[]
}

type CreateScoreFieldArrayInputsProps = {
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players']
  team?: FindTeamQuery['team'] | GetGameByIdQuery['game']['team']
}

const CreateScoreFieldArrayInputs = ({
  players,
  team,
}: CreateScoreFieldArrayInputsProps) => {
  return (
    <FieldArray
      name="scores"
      render={({ push, remove }) => {
        return (
          <SingleScoreField
            push={push}
            remove={remove}
            players={players}
            team={team}
          />
        )
      }}
    />
  )
}

export default CreateScoreFieldArrayInputs
