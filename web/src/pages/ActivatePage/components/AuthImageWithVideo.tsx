import React from 'react'

import { Box, Center, Heading, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import footballNightMan from '../../SignupPage/login-bg.jpg'

type AuthImageWithVideoProps = {
  videoShown: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoRef: any
  showGetStartedTitle: boolean
  showWelcomeTitle: boolean
}

const variants = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
}

const textVariants = {
  hide: { opacity: 0, display: 'none' },
  show: { opacity: 1, display: 'block' },
}

const AuthImageWithVideo = ({
  showGetStartedTitle,
  videoRef,
  videoShown,
  showWelcomeTitle,
}: AuthImageWithVideoProps) => {
  return (
    <Box
      w={{ base: '100%', xl: '66.66%' }}
      position="relative"
      h={{ base: '40vh', xl: '100vh' }}
    >
      <Box
        h="100%"
        bg="primary.500"
        position={{ base: 'relative', xl: 'absolute' }}
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
          zIndex={0}
        />
        <motion.div
          animate={videoShown ? 'show' : 'hide'}
          variants={variants}
          initial="hide"
        >
          <Box
            ref={videoRef}
            objectFit="cover"
            objectPosition="right"
            position="absolute"
            inset={0}
            h="full"
            w="full"
            as="video"
            autoPlay
            muted
            zIndex={0}
            src="/deplay-teamstats.webm"
          />
        </motion.div>
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
          <motion.div
            animate={showWelcomeTitle ? 'show' : 'hide'}
            variants={textVariants}
            initial="hide"
          >
            <Center w="full" h="full">
              <Box>
                <Heading fontSize={{ base: '4xl', xl: '8xl' }}>
                  Jouw eigen team
                </Heading>
                <Text mt={4} fontSize={{ base: '2xl', xl: '4xl' }}>
                  Alle data binnen handbereik
                </Text>
              </Box>
            </Center>
          </motion.div>
          <motion.div
            animate={showGetStartedTitle ? 'show' : 'hide'}
            variants={textVariants}
            initial="hide"
          >
            <Center w="full" h="full">
              <Box>
                <Heading fontSize={{ base: '4xl', xl: '8xl' }}>
                  Sky is the limit 🏆️
                </Heading>
                <Text mt={4} fontSize={{ base: '2xl', xl: '4xl' }}>
                  Dus maak nu je eigen team aan en ga van start
                </Text>
              </Box>
            </Center>
          </motion.div>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthImageWithVideo
