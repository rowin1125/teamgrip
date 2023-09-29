import React from 'react';

import { Collapse, VStack, StackDivider, Button, Text } from '@chakra-ui/react';
import { SearchClubByTermQuery } from 'types/graphql';

import TextAlert from 'src/components/TextAlert/TextAlert';

type ClubExistsProps = {
    data: SearchClubByTermQuery | undefined;
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void;
    onClose: () => void;
    setUserValidationOverride: (value: boolean) => void;
};

const ClubExists = ({
    data,
    onClose,
    setFieldValue,
    setUserValidationOverride,
}: ClubExistsProps) => {
    return (
        <Collapse in={!!data?.clubSearch.length}>
            <TextAlert status="info">
                We hebben een match gevonden die erg op de nieuwe clubnaam
                lijkt, bedoel je toevallig een van de volgende club(s)?
            </TextAlert>
            <VStack
                my={6}
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
            >
                {data?.clubSearch.map((club) => (
                    <Button
                        key={club.id}
                        variant="outline"
                        colorScheme="secondary"
                        onClick={() => {
                            setFieldValue('clubId', club.id);

                            onClose();
                        }}
                    >
                        {club.name}
                    </Button>
                ))}
            </VStack>
            <Text fontSize="sm">
                Kloppen deze gegevens niet? Klik dan
                <Button
                    variant="link"
                    fontSize="sm"
                    textDecor="underline"
                    mx={0}
                    onClick={() => setUserValidationOverride(true)}
                >
                    hier
                </Button>{' '}
                om toch een nieuwe club aan te maken. <strong>Let op</strong>:
                dit kan alleen als we geen match kunnen vinden in onze database!
            </Text>
        </Collapse>
    );
};

export default ClubExists;
