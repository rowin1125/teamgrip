/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { BsCheckCircleFill } from 'react-icons/bs';

import { useAuth } from 'src/auth';
import { navigate, routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/toast';

import { waitFor } from 'src/helpers/waitFor/waitFor';

import Avatar from './components/Avatar';
import AvatarFormFields from './components/AvatarFormFields';
import {
  avatarOptions,
  generateRandomAvatarOptions,
} from './helpers/generateRandomAvatar';

type CreateAvatarProps = {
  setActivateStep: (step: number) => void;
  handlePlayVideo: () => void;
};

const CREATE_AVATAR_MUTATION = gql`
  mutation CreateAvatar($input: CreateAvatarInput!) {
    createAvatar(input: $input) {
      id
    }
  }
`;

const CreateAvatar = ({ handlePlayVideo }: CreateAvatarProps) => {
  const { currentUser, reauthenticate } = useAuth();
  const [createAvatar, { loading }] = useMutation(CREATE_AVATAR_MUTATION, {
    onCompleted: reauthenticate,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      if (!currentUser) throw new Error('Je bent niet ingelogd');
      if (currentUser?.avatar?.accessoriesType) {
        toast.error('Je hebt al een avatar, je wordt naar home geredirect 👋');
        await waitFor(3000);
        navigate(routes.app());
        return;
      }
      await createAvatar({
        variables: { input: { ...data, userId: currentUser?.id } },
      });
      setShowSuccess(true);
      toast.success(
        'GOOOAAAAAAAAAAAAAL ⚽️\nAvatar is succesvol aangemaakt \n Je wordt geredirect naar de homepage '
      );
      await handlePlayVideo();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  const generatedInitialValues = {
    avatarStyle: 'Circle',
    topType: 'NoHair',
    accessoriesType: 'Blank',
    hatColor: 'Black',
    hairColor: 'Black',
    facialHairType: 'BeardMagestic',
    facialHairColor: 'Black',
    clotheType: 'CollarSweater',
    clotheColor: 'PastelBlue',
    graphicType: 'Bear',
    eyeType: 'Default',
    eyebrowType: 'Default',
    mouthType: 'Default',
    skinColor: 'DarkBrown',
  };

  return (
    <>
      <AnimatePresence>
        {!showSuccess && (
          <motion.div exit={{ opacity: 0, visibility: 'hidden', height: 0 }}>
            <Formik initialValues={generatedInitialValues} onSubmit={onSubmit}>
              {({ setValues }) => {
                const handleRandomValues = () => {
                  const randomValues = generateRandomAvatarOptions();
                  setValues({ avatarStyle: 'Circle', ...randomValues });
                };
                return (
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
                    <Flex justifyContent="center" alignItems="center" mt={4}>
                      <Button
                        type="submit"
                        colorScheme="secondary"
                        isLoading={loading}
                      >
                        Maak avatar
                      </Button>
                      <Button
                        ml={4}
                        onClick={handleRandomValues}
                        colorScheme="secondary"
                        variant="outline"
                        isLoading={loading}
                      >
                        Random
                      </Button>
                    </Flex>
                  </Box>
                );
              }}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div exit={{ opacity: 0, visibility: 'hidden', height: 0 }}>
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Heading color="white">Profiel compleet 🥳</Heading>
              <Icon
                as={BsCheckCircleFill}
                fontSize="8xl"
                mt={10}
                color="green.500"
              />
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateAvatar;
