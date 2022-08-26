import React from 'react'

import { Box, Center, Heading, Image, Text } from '@chakra-ui/react'

import footballNightMan from '../../../components/Hero/images/footbal-night-man.jpg'

const LoginWithImage = () => (
  <Box
    w={{ base: '100%', xl: '66.66%' }}
    position="relative"
    h={{ base: '300px', xl: '100vh' }}
  >
    <Box
      h="100%"
      bg="primary.500"
      position={{ base: 'relative', lg: 'absolute' }}
      top={0}
      left={0}
      right={0}
      zIndex="0"
    >
      <Image
        filter="auto"
        blur="1px"
        brightness="0.8"
        src={footballNightMan}
        objectFit="cover"
        w="full"
        h="full"
      />
      <Box
        bg="primary.500"
        opacity={0.7}
        bgGradient="linear(to-tl, primary.500, gray.900)"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
      />
      <Box
        position="absolute"
        inset={0}
        display="flex"
        pl={8}
        justifyContent="center"
        textAlign="center"
        w="full"
        h="full"
        zIndex={1}
        color="white"
      >
        <Center w="full" h="full">
          <Box>
            <Heading fontSize={{ base: '4xl', lg: '8xl' }} color="white">
              Jouw team data
            </Heading>
            <Text mt={4} fontSize={{ base: '2xl', lg: '4xl' }} color="white">
              Direct inzicht in alle informatie
            </Text>
          </Box>
        </Center>
      </Box>
    </Box>
  </Box>
)

export default LoginWithImage
