import React from 'react';

import {
    Box,
    Button,
    Heading,
    Image,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import imageByNight from 'src/images/footbal-night-man.jpg';

import NewClubForm from './component/NewClubForm';

type NewClubModalProps = {
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void;
};

const NewClubModal = ({ setFieldValue }: NewClubModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} my={4}>
                Club toevoegen
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <Box
                        position="relative"
                        h={{ base: '150px', xl: '200px' }}
                        w="100%"
                    >
                        <Image
                            src={imageByNight}
                            position="absolute"
                            inset={0}
                            w="full"
                            objectFit="cover"
                            h="full"
                        />
                        <Box
                            bg="blackAlpha.600"
                            position="absolute"
                            inset={0}
                        />
                        <Box
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            top={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            textAlign="center"
                        >
                            <Heading color="white">Club toevoegen</Heading>
                        </Box>
                    </Box>
                    <ModalCloseButton />

                    <NewClubForm
                        onClose={onClose}
                        setFieldValue={setFieldValue}
                    />
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewClubModal;
