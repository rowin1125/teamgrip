import { useFormikContext } from 'formik';
import {
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetTrainingByIdQuery,
} from 'types/graphql';

import { ScoreFormValues } from '../CreateScoreFieldArrayInputs';

export const useGetInitialBenchPlayers = (
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetTrainingByIdQuery['training']['players'],
  team?: FindTeamQuery['team']
) => {
  const { values } = useFormikContext<ScoreFormValues>();

  const playersWithoutScores = players
    ?.filter((player) => {
      const playerScore = values.scores.find(
        (score) => score.playerId === player?.id
      );
      // eslint-disable-next-line no-prototype-builtins
      return !playerScore?.hasOwnProperty('playerId');
    })
    .map((player) => ({
      __typename: player?.__typename,
      displayName: player?.displayName,
      id: player?.id,
    }));

  const teamPlayerAreNotInPlayersArray = team?.players.filter((teamPlayer) => {
    if (!teamPlayer?.isActivePlayer) return false;

    const playerIsNotInPlayersArray = players?.find(
      (player) => player?.id === teamPlayer?.id
    );

    return !playerIsNotInPlayersArray?.id;
  });

  const missingPlayers =
    teamPlayerAreNotInPlayersArray?.map((player) => ({
      __typename: player?.__typename,
      displayName: player?.displayName,
      id: player?.id,
    })) || [];

  const initialBenchPlayers = [
    ...(playersWithoutScores || []),
    ...missingPlayers,
  ];

  return { initialBenchPlayers };
};
