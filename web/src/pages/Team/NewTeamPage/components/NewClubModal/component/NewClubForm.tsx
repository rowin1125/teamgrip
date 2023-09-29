import React from 'react';

import { Box, Button, Flex, ModalBody } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import ControlledInput from 'src/components/forms/components/ControlledInput';

import { useNewClubForm } from '../hooks/useNewClubForm';

import ClubExists from './ClubExists';

type NewClubFormProps = {
    onClose: () => void;
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void;
};

const NewClubForm = ({ onClose, setFieldValue }: NewClubFormProps) => {
    const {
        data,
        clubExists,
        handleCreateClub,
        isAbleToSubmit,
        loading,
        setSearchTerm,
        validationSchema,
        setUserValidationOverride,
    } = useNewClubForm({ onClose, setFieldValue });

    return (
        <>
            <ModalBody mb={4}>
                <Formik
                    onSubmit={handleCreateClub}
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={validationSchema}
                >
                    {({ values }) => {
                        const { name } = values;

                        return (
                            <Box as={Form} w="full" maxW="500px">
                                <ControlledInput
                                    id="name"
                                    label="Clubnaam"
                                    placeholder="Purmersteijn"
                                    callback={(value) => setSearchTerm(value)}
                                />
                                {clubExists && (
                                    <ClubExists
                                        data={data}
                                        onClose={onClose}
                                        setFieldValue={setFieldValue}
                                        setUserValidationOverride={
                                            setUserValidationOverride
                                        }
                                    />
                                )}

                                <Flex mt={8} justifyContent="flex-end">
                                    <Button
                                        mr={3}
                                        onClick={onClose}
                                        variant="outline"
                                    >
                                        Annuleren
                                    </Button>
                                    <Button
                                        colorScheme="secondary"
                                        type="submit"
                                        isDisabled={!isAbleToSubmit}
                                        isLoading={loading}
                                    >
                                        Maak {name} aan
                                    </Button>
                                </Flex>
                            </Box>
                        );
                    }}
                </Formik>
            </ModalBody>
        </>
    );
};

export default NewClubForm;
