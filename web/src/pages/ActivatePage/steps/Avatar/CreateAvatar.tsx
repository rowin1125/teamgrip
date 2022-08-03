import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import Avatar from './components/Avatar'
import AvatarFormFields from './components/AvatarFormFields'
import { avatarOptions } from './helpers/generateRandomAvatar'

type CreateAvatarProps = {
  setActivateStep: (step: number) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateAvatar = ({ setActivateStep }: CreateAvatarProps) => {
  const onSubmit = async (data: Record<string, unknown>) => {
    console.log(data)
  }

  const generatedInitialValues = {
    avatarStyle: 'Circle',
    topType: avatarOptions.topType[24],
    accessoriesType: avatarOptions.accessoriesType[0],
    hatColor: avatarOptions.hatColor[0],
    hairColor: avatarOptions.hairColor[0],
    facialHairType: avatarOptions.facialHairType[0],
    facialHairColor: avatarOptions.facialHairColor[0],
    clotheType: avatarOptions.clotheType[3],
    clotheColor: avatarOptions.clotheColor[0],
    graphicType: avatarOptions.graphicType[0],
    eyeType: avatarOptions.eyeType[5],
    eyebrowType: avatarOptions.eyebrowType[2],
    mouthType: avatarOptions.mouthType[8],
    skinColor: avatarOptions.skinColor[0],
  }

  return (
    <Formik initialValues={generatedInitialValues} onSubmit={onSubmit}>
      <Box as={Form} w="full">
        <Flex
          justifyContent="center"
          alignItems="center"
          mb={4}
          flexDirection="column"
        >
          <Heading mb={4}>Maak jouw avatar 🖌️</Heading>
          <Avatar />
        </Flex>
        <AvatarFormFields />
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={4}
          flexDirection="column"
        >
          <Button type="submit" colorScheme="secondary">
            Maak avatar
          </Button>
        </Flex>
      </Box>
    </Formik>
  )
}

export default CreateAvatar
