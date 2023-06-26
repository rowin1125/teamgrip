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
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import { useGetSeasonById } from './hooks/useGetSeasonById';
import { useUpdateSeasonById } from './hooks/useUpdateSeasonById';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

export const seasonList = ['2021-2022', '2022-2023', '2023-2024', '2024-2025'];

const UpdateSeasonPage = () => {
  const { currentUser, isTeamStaff } = useTeamPlayerAuth();
  const { season, seasonLoading } = useGetSeasonById();
  const { handleUpdateSeason, handleUpdateSeasonLoading } =
    useUpdateSeasonById();
  const { team } = useGetTeamById();

  useEffect(() => {
    if (isTeamStaff) return;

    toast.error('Je hebt geen toegang voor deze pagina');
    navigate(routes.team());
  }, [currentUser, isTeamStaff]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4).required('Naam is verplicht'),
  });

  if (!season || seasonLoading) return null;

  const seasonList = ['2021-2022', '2022-2023', '2023-2024', '2024-2025'];
  const activeSeason = team?.season.find((season) => season?.active);

  return (
    <>
      <MetaTags title="Update jouw seizoen" description="UpdateSeason page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Update het seizoen: {season?.name} 🗓️</Heading>
            <TextAlert my={8} status="warning">
              <Text>
                Alle score / trainingen / wedstrijd die aan dit seizoen zullen
                overgezet worden naar het nieuwe seizoen. Let dus goed op!
              </Text>
            </TextAlert>
            <Formik
              onSubmit={handleUpdateSeason}
              initialValues={{
                name: season.name,
                seasonTeamName: season.name,
                active: season.active,
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
                    isLoading={handleUpdateSeasonLoading}
                  >
                    Update seizoen
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

export default UpdateSeasonPage;
