import React from 'react'

import {
  CreateScoreInput,
  GetGameByIdQuery,
  GetPlayersForTeamQuery,
} from 'types/graphql'

import ControlledInput from 'src/components/forms/components/ControlledInput'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

type SingleTopGameScoresProps = {
  index: number
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players']
  playersScoreArray: CreateScoreInput[]
}

const SingleTopGameScores = ({
  index,
  playersScoreArray,
  players,
}: SingleTopGameScoresProps) => (
  <>
    <ControlledSelect
      mb={2}
      id={`topGameScores.${index}.playerId`}
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
      id={`topGameScores.${index}.points`}
      type="number"
      mt={2}
    />
  </>
)

export default SingleTopGameScores
