import { Flex, Icon, Text } from '@chakra-ui/react';
import { HiOutlineDocumentSearch } from 'react-icons/hi';

type NoEntriesProps = {
    theme?: 'dark' | 'light';
};

const NoEntries = ({ theme }: NoEntriesProps) => {
    return (
        <Flex justifyContent="center" alignItems="center" h={40}>
            <Text
                fontSize="xl"
                color={theme === 'dark' ? 'white' : 'primary.900'}
            >
                Geen gegevens gevonden
            </Text>{' '}
            <Icon as={HiOutlineDocumentSearch} fontSize="5xl" ml={4} />
        </Flex>
    );
};

export default NoEntries;
