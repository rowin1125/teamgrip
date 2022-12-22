import { Skeleton } from '@chakra-ui/react';

type DefaultLoaderProps = {
  children?: React.ReactNode;
  isLoading: boolean;
  theme?: 'dark' | 'light';
};

const DefaultLoader = ({ children, isLoading, theme }: DefaultLoaderProps) => {
  const isDarkTheme = theme === 'dark';

  return (
    <Skeleton
      rounded="2xl"
      isLoaded={!isLoading}
      opacity={1}
      startColor={isDarkTheme ? 'primary.200' : 'gray.50'}
      speed={1.3}
      endColor={isDarkTheme ? 'primary.900' : 'gray.300'}
    >
      {children}
    </Skeleton>
  );
};

export default DefaultLoader;
