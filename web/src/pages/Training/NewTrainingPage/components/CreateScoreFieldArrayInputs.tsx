import { FieldArray } from 'formik';
import {
    CreateScoreInput,
    CreateTrainingInput,
    FindTeamQuery,
    GetPlayersForTeamQuery,
    GetTrainingByIdQuery,
} from 'types/graphql';

import SingleScoreField from './SingleScoreField';

export type ScoreFormValues = CreateTrainingInput & {
    scores: CreateScoreInput[];
    topTrainingScores: CreateScoreInput[];
};

type CreateScoreFieldArrayInputsProps = {
    players?:
        | GetPlayersForTeamQuery['playersForTeam']
        | GetTrainingByIdQuery['training']['players'];
    team?: FindTeamQuery['team'];
    showTop: boolean;
    setShowTop: (value: boolean) => void;
};

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
                );
            }}
        />
    );
};

export default CreateScoreFieldArrayInputs;
