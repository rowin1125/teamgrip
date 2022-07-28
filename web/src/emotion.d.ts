// You are also able to use a 3rd party theme this way:
import { Theme as ChrakraTheme } from '@chakra-ui/react'

import '@emotion/react'

interface ChakraColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

interface G3MTheme extends ChrakraTheme {
  colors: ChrakraTheme['colors'] & {
    primary: ChakraColorPalette
  }
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends G3MTheme {}
}
