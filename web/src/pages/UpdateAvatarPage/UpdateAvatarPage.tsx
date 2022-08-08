import { Box, Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'

import Avatar from '../ActivatePage/components/steps/Avatar/components/Avatar'
import AvatarFormFields from '../ActivatePage/components/steps/Avatar/components/AvatarFormFields'
import { generateRandomAvatarOptions } from '../ActivatePage/components/steps/Avatar/helpers/generateRandomAvatar'

const UpdateAvatarPage = () => {
  const { currentUser } = useAuth()
  const onSubmit = async (data: Record<string, unknown>) => {
    console.log('data', data)
  }

  return (
    <>
      <MetaTags title="Update avatar" description="UpdateAvatar page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Update jouw avatar</Heading>
            <Formik
              initialValues={{ ...currentUser.avatar }}
              onSubmit={onSubmit}
            >
              {({ setValues }) => {
                const handleRandomValues = () => {
                  const randomValues = generateRandomAvatarOptions()
                  setValues({ avatarStyle: 'Circle', ...randomValues })
                }
                return (
                  <Box as={Form} w="full">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      mb={4}
                      flexDirection="column"
                    >
                      <Avatar />
                    </Flex>
                    <AvatarFormFields />
                    <Flex justifyContent="center" alignItems="center" mt={4}>
                      <Button
                        type="submit"
                        colorScheme="primary"
                        // isLoading={loading}
                      >
                        Update avatar
                      </Button>
                      <Button
                        ml={4}
                        onClick={handleRandomValues}
                        colorScheme="secondary"
                        // isLoading={loading}
                      >
                        Random
                      </Button>
                    </Flex>
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

export default UpdateAvatarPage
