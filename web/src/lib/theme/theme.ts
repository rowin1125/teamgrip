import { extendTheme } from '@chakra-ui/react'

import { Button } from './components/button'
import { Heading } from './components/headingOverrides'
import { colors } from './foundation/colors'
import { shadows } from './foundation/shadows'
import { styles } from './foundation/styles'

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
    Button,
  },
})

export type TeamStatsTheme = typeof theme
