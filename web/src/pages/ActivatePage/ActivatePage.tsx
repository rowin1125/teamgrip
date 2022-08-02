import { useEffect, useState } from 'react'

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import FormProgress from 'src/components/forms/components/FormProgress'

import footballNightMan from '../SignupPage/login-bg.jpg'

import ActivateForm from './ActivateForm'
import UpdateUserInfoForm from './UpdateUserInfoForm'

const ActivatePage = () => {
  const [activateStep, setActivateStep] = useState(0)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser?.verified) navigate(routes.home())
  }, [currentUser])

  const FormPages = [ActivateForm, UpdateUserInfoForm]
  const Component = FormPages[activateStep] ?? 'div'

  return (
    <>
      <MetaTags title="Activate" description="Activate page" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Flex w="100vw" h="100vh">
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
        <Flex
          flexDir="column"
          w="33.33%"
          bg="primary.500"
          color="white"
          justifyContent="center"
          alignItems="center"
        >
          <FormProgress
            activePage={activateStep}
            amountOfPages={FormPages.length}
            mb={10}
            px={10}
          />
          <Box maxW="400px" w="full">
            <Component setActivateStep={setActivateStep} />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default ActivatePage
