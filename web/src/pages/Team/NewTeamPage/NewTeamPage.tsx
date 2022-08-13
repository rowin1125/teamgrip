import { Grid, GridItem, Heading, Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import ControlledInput from 'src/components/forms/components/ControlledInput'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

import { handleTeamNameTransformation } from './helpers/handleTeamnameTransformation/handleTeamnameTransformation'

const validationSchema = Yup.object().shape({
  club: Yup.string().required('Club is verplicht'),
  name: Yup.string().min(4).required('Naam is verplicht'),
})

const NewTeamPage = () => {
  return (
    <>
      <MetaTags title="Nieuwe team" description="NewTeam page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Maak nu je eigen team aan 👏</Heading>
            <Formik
              onSubmit={(data) => console.log(data)}
              initialValues={{
                name: '',
                club: '',
              }}
              validationSchema={validationSchema}
            >
              {({ values }) => {
                const { name, club } = values
                const customTeamName =
                  club &&
                  name &&
                  `${capitalizeText(club)} ${capitalizeText(name)}`
                return (
                  <Box as={Form} w="full" maxW="500px">
                    <ControlledSelect
                      id="club"
                      label="Club"
                      options={['zob'].map((option) => ({
                        label: capitalizeText(option),
                        value: option,
                      }))}
                      placeholder="Selecteer"
                      reactSelectProps={{ isClearable: true }}
                    />
                    <ControlledInput
                      id="name"
                      label="Teamnaam"
                      placeholder="Zob Zaterdag 1"
                      transformValue={handleTeamNameTransformation}
                      helperText="Letop: De teamnaam mag alleen bestaan uit nummers, letters en dashes: Zaterdag-1, Zatedag-JO-17-2"
                    />
                    <Button
                      colorScheme="secondary"
                      type="submit"
                      // isLoading={loading}
                    >
                      Maak {customTeamName ? customTeamName : 'team'} aan
                    </Button>
                  </Box>
                )
              }}
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default NewTeamPage
