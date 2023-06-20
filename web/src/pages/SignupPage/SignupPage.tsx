/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { useAuth } from 'src/auth';
import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import SignUpForm from './components/SignUpForm';
import SignupWithImage from './components/SignupWithImage';

export const RESEND_ACTIVATE_USER = gql`
  mutation ResendActivateUserMutation($input: ResendActivateUserInput!) {
    resendActivateUser(input: $input) {
      id
      verifiedToken
    }
  }
`;

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      toast.error('Je bent al ingelogd 🤔');
      navigate(routes.app());
    }
  }, [isAuthenticated]);

  const onSubmit = async (data: any, actions: any) => {
    setLoading(true);
    const response = await signUp({ ...data });

    if (response.message) {
      toast.success(response.message, { duration: 10000 });
      actions.resetForm();
      navigate(routes.login());
    } else if (response.error) {
      toast.error(response.error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title="Signup" />

      <Flex
        w="100vw"
        h={{ base: '100%', xl: 'calc(100vh - 80px)' }}
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <SignupWithImage />
        <Flex
          flexDir="column"
          w={{ base: '100%', xl: '33.33%' }}
          bg="primary.500"
          color="white"
          justifyContent="center"
          alignItems="center"
          minH="calc(100vh - 300px - 80px)"
        >
          <Box maxW="400px" w="full" p={{ base: 4, xl: 0 }}>
            <Heading as="h1" size="xl" color="white">
              Aanmelden
            </Heading>
            <SignUpForm
              loading={loading}
              onSubmit={onSubmit}
              initialValues={{
                username: '',
                password: '',
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default SignupPage;
