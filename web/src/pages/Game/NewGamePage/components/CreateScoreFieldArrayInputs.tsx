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
  team?: FindTeamQuery['team']
  showTop: boolean
  setShowTop: (value: boolean) => void
}

const CreateScoreFieldArrayInputs = ({
  players,
  team,
  ...props
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
            {...props}
          />
        )
      }}
    />
  )
}

export default CreateScoreFieldArrayInputs
