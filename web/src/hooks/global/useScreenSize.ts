import { useMediaQuery } from '@chakra-ui/react';

export const useScreenSize = () => {
  const [isSmallerThanSm] = useMediaQuery('(max-width: 30em)');
  const [isSm] = useMediaQuery('(min-width: 30em)');
  const [isMd] = useMediaQuery('(min-width: 48em)');
  const [isLg] = useMediaQuery('(min-width: 62em)');
  const [isXl] = useMediaQuery('(min-width: 80em)');
  const [is2xl] = useMediaQuery('(min-width: 96em)');

  return {
    isSmallerThanSm,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
  };
};
