/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { routes } from '@redwoodjs/router';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import RedwoodLink from 'src/components/RedwoodLink';

type SignUpFormProps = {
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>, actions: FormikHelpers<any>) => void;
  loading: boolean;
};

const SignUpForm = ({ initialValues, onSubmit, loading }: SignUpFormProps) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .email('Email moet wel een email zijn...')
      .required('Veld is verplicht')
      .min(4),
    password: Yup.string().min(
      6,
      'Wachtwoord moet minimaal 6 karakters lang zijn...'
    ),
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
          <ControlledInput
            id="password"
            label="Wachtwoord"
            type="password"
            placeholder="Geef een veilig wachtwoord op!"
          />

          <Flex alignItems="center" justifyContent="space-between" mt={4}>
            <Button colorScheme="secondary" type="submit" isLoading={loading}>
              Meld aan
            </Button>
            <Box>
              Heb je a een account?{' '}
              <Link as={RedwoodLink} to={routes.login()} textDecor="underline">
                Login
              </Link>
            </Box>
          </Flex>
        </Box>
      )}
    </Formik>
  );
};

export default SignUpForm;
