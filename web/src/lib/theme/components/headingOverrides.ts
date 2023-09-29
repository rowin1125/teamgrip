import { ComponentStyleConfig } from '@chakra-ui/react';

export const Heading: ComponentStyleConfig = {
    sizes: {
        h1: { fontSize: { base: '32px', sm: '42px', md: '52px', lg: '62px' } },
        h2: { fontSize: { base: '22px', sm: '32px', md: '42px', lg: '52px' } },
        h3: { fontSize: { base: '20px', sm: '22px', md: '32px', lg: '42px' } },
        h4: { fontSize: { base: '20px', sm: '22px', md: '32px', lg: '42px' } },
        lg: { fontSize: '30px' },
        md: { fontSize: '20px' },
        sm: { fontSize: '16px' },
        xs: { fontSize: '14px' },
    },
    baseStyle: {
        color: 'primary.500',
    },
    defaultProps: { size: 'lg' },
};
