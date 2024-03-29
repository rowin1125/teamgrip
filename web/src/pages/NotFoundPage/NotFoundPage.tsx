import { Box, Button, Flex } from '@chakra-ui/react';

import AuthLayout from 'src/layouts/AuthLayout/AuthLayout';

import Cavemen from './components/CaveMen/Cavemen';

export default () => (
    <AuthLayout>
        <Box as="main" bg="primary.500" h="calc(100vh - 80px)" w="100vw">
            <Flex
                justifyContent="flex-end"
                alignItems="center"
                h="full"
                flexDir="column"
            >
                <Cavemen />
                <Button
                    colorScheme="secondary"
                    as={'a'}
                    href={process.env.REDWOOD_ENV_WEBSITE_URL || '/'}
                    mb={40}
                >
                    Terug naar home
                </Button>
            </Flex>
        </Box>
    </AuthLayout>
);
