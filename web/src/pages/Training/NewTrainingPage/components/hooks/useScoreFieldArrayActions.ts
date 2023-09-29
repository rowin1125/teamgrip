/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { useFormikContext } from 'formik';
import {
    FindTeamQuery,
    GetPlayersForTeamQuery,
    GetTrainingByIdQuery,
} from 'types/graphql';

import { toast } from '@redwoodjs/web/dist/toast';

import { scoreBlueprint } from '../../hooks/useCreateTraining';
import { ScoreFormValues } from '../CreateScoreFieldArrayInputs';

import { useGetInitialBenchPlayers } from './useGetInitialBenchPlayers';

type UseScoreFieldArrayActionsType = {
    players:
        | GetPlayersForTeamQuery['playersForTeam']
        | GetTrainingByIdQuery['training']['players'];
    push: (obj: any) => void;
    remove: <T>(index: number) => T | undefined;
    team?: FindTeamQuery['team'];
};

export const useScoreFieldArrayActions = ({
    players,
    team,
    push,
    remove,
}: UseScoreFieldArrayActionsType) => {
    const { values, setFieldValue } = useFormikContext<ScoreFormValues>();
    const { initialBenchPlayers } = useGetInitialBenchPlayers(players, team);

    const [benchPlayers, setBenchPlayers] = useState(initialBenchPlayers);

    const seasonMatchesThisYear = team?.season?.filter(
        (season) => season?.active
    )?.[0]?.id;

    const defaultSeasonId = seasonMatchesThisYear ?? team?.season[0]?.id;

    const handleRemove = (
        currentPlayer: Record<string, unknown>,
        index: number
    ) => {
        setBenchPlayers((prevBenchPlayers: any) => [
            ...prevBenchPlayers,
            currentPlayer,
        ]);

        const topPlayer = values.topTrainingScores.find(
            (score) => currentPlayer.id === score.playerId
        );

        if (topPlayer?.playerId) {
            const filteredTopTraining = values.topTrainingScores.filter(
                (score) => score.playerId !== currentPlayer.id
            );
            const playerPresentInTopTraining = values.topTrainingScores.filter(
                (score) => score.playerId === currentPlayer.id
            );
            const playerPresentAmount = playerPresentInTopTraining?.length ?? 0;

            const newTopTrainingScores = [
                ...filteredTopTraining,
                ...Array(playerPresentAmount)
                    .fill(null)
                    .map(() => ({
                        ...scoreBlueprint,
                        playerId: '',
                        type: 'TOP_TRAINING',
                        seasonId: values.seasonId || defaultSeasonId || '',
                        teamId: values.teamId || team?.id || '',
                    })),
            ];
            setFieldValue('topTrainingScores', newTopTrainingScores);
        }

        toast.success('Speler naar op afwezig', {
            duration: 2000,
        });
        remove(index);
    };

    const handlePush = (playerId: string) => {
        const filteredPlayers = benchPlayers?.filter(
            (benchPlayer) => benchPlayer.id !== playerId
        );
        if (!filteredPlayers) return;

        setBenchPlayers([...filteredPlayers]);
        toast.success('Speler neemt deel aan de training', {
            duration: 2000,
        });

        push({
            ...scoreBlueprint,
            playerId,
            teamId: team?.id,
            seasonId: values.seasonId || defaultSeasonId || '',
        });
    };

    const playersScoreArray = values?.scores?.sort((a, b) => {
        if (!a?.playerId || !b?.playerId) return 0;

        const playerA = players?.find(
            (player) => player?.id === a.playerId
        ) as GetPlayersForTeamQuery['playersForTeam'][0];
        const playerB = players?.find(
            (player) => player?.id === b.playerId
        ) as GetPlayersForTeamQuery['playersForTeam'][0];

        if (!playerA?.displayName || !playerB?.displayName) return 0;

        return playerA?.displayName?.localeCompare(playerB?.displayName || '');
    });

    return {
        handleRemove,
        handlePush,
        playersScoreArray,
        benchPlayers,
    };
};
