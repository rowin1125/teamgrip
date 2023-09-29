import { Center, Spinner } from '@chakra-ui/react';

type DefaultLoaderProps = {
    children?: React.ReactNode;
    isLoading: boolean;
    theme?: 'dark' | 'light';
    minH?: string;
};

const DefaultLoader = ({
    children,
    isLoading,
    theme,
    minH = '400px',
}: DefaultLoaderProps) => {
    const isDarkTheme = theme === 'dark';

    if (!isLoading) return children;

    return (
        <Center
            minH={minH}
            w="full"
            backdropFilter="blur(5px)"
            bg={isDarkTheme ? 'gray.800' : 'white'}
            rounded="2xl"
        >
            <Spinner size="xl" thickness="6px" />
        </Center>
    );
};

export default DefaultLoader;
