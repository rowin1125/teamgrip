import { useBreakpoint } from '@chakra-ui/react';

export const useScreenSize = () => {
    const breakpoint = useBreakpoint({ ssr: false });

    const isSm = breakpoint === 'base' || breakpoint === 'sm';
    const isMd = breakpoint === 'md';
    const isLg = breakpoint === 'lg';
    const isXl = breakpoint === 'xl';
    const is2xl = breakpoint === '2xl';

    return {
        isSm,
        isMd,
        isLg,
        isXl,
        is2xl,
    };
};
