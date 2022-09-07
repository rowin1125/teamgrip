import React from 'react'

import {
  CreateScoreInput,
  GetPlayersForTeamQuery,
  GetTrainingByIdQuery,
} from 'types/graphql'

import ControlledInput from 'src/components/forms/components/ControlledInput'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

type SingleTopTrainingScoresProps = {
  index: number
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetTrainingByIdQuery['training']['players']
  playersScoreArray: CreateScoreInput[]
}

const SingleTopTrainingScores = ({
  index,
  playersScoreArray,
  players,
}: SingleTopTrainingScoresProps) => {
  return (
    <>
      <ControlledSelect
        mb={2}
        id={`topTrainingScores.${index}.playerId`}
        label="Selecteer een speler"
        options={playersScoreArray.map((option) => {
          const player = players.find((player) => player.id === option.playerId)

          return {
            label: capitalizeText(player.displayName),
            value: option?.playerId,
          }
        })}
        placeholder="Selecteer"
        reactSelectProps={{ isClearable: true }}
      />
      <ControlledInput
        label="Extra punten"
        labelProps={{ m: 0, fontWeight: 'normal' }}
        id={`topTrainingScores.${index}.points`}
        type="number"
        mt={2}
      />
    </>
  )
}

export default SingleTopTrainingScores
