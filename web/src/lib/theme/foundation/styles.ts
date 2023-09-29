import { mode, Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
    global: (props) => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('gray.100', 'gray.800')(props),
        },
    }),
};
