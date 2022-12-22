import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';

type SpinnerOverlayType = {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
};

const SpinnerOverlay = ({ children, theme }: SpinnerOverlayType) => {
  const isDarkTheme = theme === 'dark';

  return (
    <Box position="relative" h="full">
      <Box inset={0} position="absolute" zIndex={1}>
        <Flex
          bg={isDarkTheme ? 'primary.500' : 'white'}
          inset={0}
          position="absolute"
          rounded="2xl"
          opacity={0.8}
          filter="blur(3px)"
        ></Flex>
        <Flex
          inset={0}
          position="absolute"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex alignItems="center">
            <Spinner size="xl" />
            <Heading
              ml={8}
              color={isDarkTheme ? 'white' : 'primary.900'}
              textAlign="center"
            >
              Loading...
            </Heading>
          </Flex>
        </Flex>
      </Box>
      <Box filter="blur(3px)" h="full">
        {children}
      </Box>
    </Box>
  );
};

export default SpinnerOverlay;
