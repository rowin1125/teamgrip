import { useEffect } from 'react';

import { Box, Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import Card from 'src/components/Card/Card';
import ControlledSelect from 'src/components/forms/components/ControlledSelect';
import ControlledSwitch from 'src/components/forms/components/ControlledSwitch/ControlledSwitch';
import TextAlert from 'src/components/TextAlert/TextAlert';
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import { useCreateSeason } from './hooks/useCreateSeason';
import { seasonList } from '../UpdateSeasonPage/UpdateSeasonPage';

const NewSeasonPage = () => {
  const { currentUser, isTeamStaff } = useTeamPlayerAuth();
  const { team } = useGetTeamById();
  const { handleCreateSeason, seasonLoading } = useCreateSeason(team);

  useEffect(() => {
    if (isTeamStaff) return;

    toast.error('Je hebt geen toegang voor deze pagina');
    navigate(routes.team());
  }, [currentUser, isTeamStaff]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4).required('Naam is verplicht'),
    active: Yup.boolean().required('Actief is verplicht'),
  });

  const activeSeason = team?.season.find((season) => season?.active);

  return (
    <>
      <MetaTags title="Nieuw seizoen" description="Start een nieuw seizoen" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Start een nieuw seizoen 🗓️</Heading>
            <TextAlert my={8} status="info">
              <Text>
                Alle gegeven worden opgeslagen aan de hand van een{' '}
                <strong>seizoen</strong>. Let dus goed op dat je maar 1 seizoen
                actief hebt staan.
              </Text>
            </TextAlert>
            <Formik
              onSubmit={handleCreateSeason}
              initialValues={{
                name: '',
                seasonTeamName: '',
                active: false,
              }}
              validationSchema={validationSchema}
            >
              {({ values }) => (
                <Box as={Form} w="full" maxW="500px">
                  <ControlledSelect
                    id="name"
                    label="Seizoen"
                    options={seasonList.map((season) => ({
                      label: capitalizeText(season),
                      value: season,
                    }))}
                    placeholder="Selecteer"
                    reactSelectProps={{ isClearable: true }}
                  />

                  <ControlledSwitch
                    id="active"
                    label="Status"
                    helperText="Alleen actieve seizoen kun je gebruiken voor het aanmaken van wedstrijden en trainingen"
                  >
                    Seizoen is actief?
                  </ControlledSwitch>

                  {values.active && activeSeason && (
                    <TextAlert my={8} status="warning">
                      <Text>
                        Er is al een actief seizoen:{' '}
                        <strong>{activeSeason?.name}</strong>. Als je een nieuw
                        seizoen start, wordt het huidige seizoen automatisch
                        gedeactiveerd.
                      </Text>
                    </TextAlert>
                  )}

                  <Button
                    mt={4}
                    colorScheme="secondary"
                    type="submit"
                    isLoading={seasonLoading}
                  >
                    Start seizoen
                  </Button>
                </Box>
              )}
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default NewSeasonPage;
