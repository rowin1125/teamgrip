import { useEffect } from 'react';

import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

import { MetaTags } from '@redwoodjs/web';

import Card from 'src/components/Card/Card';
import DefaultLoader from 'src/components/Loaders/DefaultLoader/DefaultLoader';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

import TrainingForm from '../form/TrainingForm';

import { useGetTrainingById } from './hooks/useGetTrainingById';
import { useUpdateTrainingById } from './hooks/useUpdateTrainingById';

const UpdateTrainingPage = () => {
    const { training, trainingLoading } = useGetTrainingById();
    const { team, loading } = useGetTeamById();
    const [showTop, setShowTop] = React.useState(true);

    const { handleUpdateTraining, updateTrainingLoading } =
        useUpdateTrainingById(training?.id || '', showTop);

    const regularScores = training?.scores.filter(
        (score) => score?.type === 'TRAINING'
    );
    const topTrainingScores = training?.scores.filter(
        (score) => score?.type === 'TOP_TRAINING'
    );
    const hasTopTrainingScores =
        !!topTrainingScores && topTrainingScores?.length > 0;

    useEffect(() => {
        if (!training) return;

        setShowTop(hasTopTrainingScores);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training]);

    const topTrainingScoresArray = hasTopTrainingScores
        ? topTrainingScores.map((score) => ({
              playerId: score?.player.id,
              seasonId: training?.season?.id,
              points: score?.points,
              teamId: team?.id,
              trainingId: training?.id,
              type: 'TOP_TRAINING',
          }))
        : [1, 2, 3].map(() => ({
              playerId: '',
              seasonId: training?.season?.id,
              points: 0,
              teamId: team?.id,
              trainingId: training?.id,
              type: 'TOP_TRAINING',
          }));

    return (
        <>
            <MetaTags
                title="Update training"
                description="Wijzig de gegevens van een training"
            />

            <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
                <GridItem colSpan={{ base: 3, md: 3, '2xl': 2 }}>
                    <Card position="relative">
                        <Heading>Update training ⚽️🏃</Heading>
                        <DefaultLoader
                            isLoading={trainingLoading || loading}
                            minH="400px"
                        >
                            {training && team && (
                                <TrainingForm
                                    initialValues={{
                                        date: format(
                                            new Date(training?.date || ''),
                                            'yyyy-MM-dd'
                                        ),
                                        seasonId: training?.season?.id,
                                        teamId: training?.teamId,
                                        scores: regularScores?.map((score) => ({
                                            playerId: score?.player?.id,
                                            seasonId: training?.season?.id,
                                            points: score?.points,
                                            teamId: team?.id,
                                            trainingId: training?.id,
                                            type: 'TRAINING',
                                        })),
                                        topTrainingScores:
                                            topTrainingScoresArray,
                                    }}
                                    type="new"
                                    onSubmit={handleUpdateTraining}
                                    loading={
                                        trainingLoading || updateTrainingLoading
                                    }
                                    team={team}
                                    players={team?.players.filter(
                                        (player) => player?.isActivePlayer
                                    )}
                                    setShowTop={setShowTop}
                                    showTop={showTop}
                                />
                            )}
                        </DefaultLoader>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default UpdateTrainingPage;
