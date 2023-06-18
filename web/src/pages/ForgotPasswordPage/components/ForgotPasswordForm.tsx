/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import RedwoodLink from 'src/components/RedwoodLink/RedwoodLink';

type ForgotPasswordFormProps = {
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>, actions: FormikHelpers<any>) => void;
  loading: boolean;
};

const ForgotPasswordForm = ({
  initialValues,
  loading,
  onSubmit,
}: ForgotPasswordFormProps) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .email('Email moet wel een email zijn...')
      .required('Veld is verplicht')
      .min(4),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Box as={Form} w="full">
          <ControlledInput
            id="username"
            label="Email"
            placeholder="ronald@mesi.com"
          />

          <Flex
            alignItems="center"
            mt={4}
            flexDir={{ base: 'column', xl: 'row' }}
          >
            <Button
              as={RedwoodLink}
              to={'/login'}
              colorScheme="secondary"
              variant="outline"
              isLoading={loading}
              mr={{ lg: 4 }}
              mb={{ base: 4, xl: 0 }}
            >
              Terug naar login
            </Button>
            <Button colorScheme="secondary" type="submit" isLoading={loading}>
              Herstel je wachtwoord
            </Button>
          </Flex>
        </Box>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
