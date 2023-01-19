import React from 'react';

import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

import { routes } from '@redwoodjs/router';

import Card from 'src/components/Card/Card';
import RedwoodLink from 'src/components/RedwoodLink';
import TeamTable from 'src/components/TeamTable';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import Pagination from 'src/components/Pagination/Pagination';
import { useDeleteTrainingById } from './hooks/useDeleteTrainingById';
import { useGetTrainingsByTeam } from './hooks/useGetTrainingsByTeam';
import { getBestTrainingPlayer } from './helpers/getBestTrainingPlayer';
import { Training } from 'types/graphql';

const TeamTrainings = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { trainings, total, trainingsLoading, limit } =
    useGetTrainingsByTeam(currentPage);
  const { handleDeleteTrainingById } = useDeleteTrainingById();
  const { isTeamStaff } = useTeamPlayerAuth();

  const trainingEntries = trainings?.map((training) => {
    const bestPlayer = getBestTrainingPlayer(training as Training);

    return {
      id: training?.id,
      datum: training?.date
        ? format(new Date(training.date), 'dd-MM-yyyy')
        : '',
      aantal: training?.scores.filter((score) => score?.type === 'TRAINING')
        .length,
      MVP: bestPlayer?.displayName,
      season: training?.season?.name,
    };
  });

  return (
    <Card>
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <Heading>Recente trainingen</Heading>
        {isTeamStaff && (
          <Button
            colorScheme="secondary"
            as={RedwoodLink}
            to={routes.newTraining()}
            mt={{ base: 4, xl: 0 }}
          >
            Registreer training
          </Button>
        )}
      </Flex>
      <Box overflowX="auto">
        <TeamTable
          theme="light"
          size={isTeamStaff ? 'sm' : 'md'}
          entries={trainingEntries}
          hiddenColumns={['id']}
          isLoading={trainingsLoading}
          routes={{
            detail: routes.trainingDetail,
            update: routes.updateTraining,
          }}
          onDelete={handleDeleteTrainingById}
          showActions
        />
      </Box>
      <Pagination
        total={total}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Card>
  );
};

export default TeamTrainings;
