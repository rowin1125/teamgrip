import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

import { Button } from './components/button';
import { Heading } from './components/headingOverrides';
import { Text } from './components/textOverrides';
import { colors } from './foundation/colors';
import { shadows } from './foundation/shadows';
import { styles } from './foundation/styles';

export const theme = extendTheme({
  styles,
  colors,
  shadows,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter',  sans-serif`,
  },
  components: {
    Heading,
    Steps,
    Button,
    Text,
  },
});

export type TeamGripTheme = typeof theme;
