import React from 'react'

import { Box, Heading, Image, Text } from '@chakra-ui/react'

import footballNightMan from '../login-bg.jpg'

const SignupWithImage = () => {
  return (
    <Box w="66.66%" position="relative">
      <Box
        h="100%"
        bg="primary.500"
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex="-1"
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
          <Box mt="25vh">
            <Heading size="4xl">Jouw eigen team</Heading>
            <Text mt={4} fontSize="3xl">
              Alle data binnen handbereik
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SignupWithImage
