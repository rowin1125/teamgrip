import { Box, Fade, Flex, Spinner, Text } from '@chakra-ui/react';

type SpinnerLoaderType = {
    isLoading: boolean;
    children: React.ReactNode;
};

const SpinnerLoader = ({ isLoading, children }: SpinnerLoaderType) => {
    return (
        <Box w="full" h="full" position="relative">
            <Fade
                in={isLoading}
                style={{
                    height: '100%',
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                }}
            >
                {isLoading && (
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        h="full"
                        flexDir="column"
                    >
                        <Spinner size="xl" />
                        <Text color="white" mt={4}>
                            Loading
                        </Text>
                    </Flex>
                )}
            </Fade>
            <Fade in={!isLoading}>{!isLoading && children}</Fade>
        </Box>
    );
};

export default SpinnerLoader;
