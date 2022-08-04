/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormProgress from 'src/components/forms/components/FormProgress'

import { waitFor } from '../../helpers/waitFor/waitFor'

import AuthImageWithVideo from './components/AuthImageWithVideo'
import ActivateForm from './components/steps/ActivateForm'
import CreateAvatar from './components/steps/Avatar/CreateAvatar'
import UpdateUserInfoForm from './components/steps/UpdateUserInfoForm'

const ActivatePage = () => {
  const [activateStep, setActivateStep] = useState(0)
  const [videoShown, setVideoShown] = useState(false)
  const [showWelcomeTitle, setShowWelcomeTitle] = useState(true)
  const [showGetStartedTitle, setShowGetStartedTitle] = useState(false)

  const FormPages = [ActivateForm, UpdateUserInfoForm, CreateAvatar]
  const Component = FormPages[activateStep] ?? 'div'

  const handlePlayVideo = async () => {
    setVideoShown(true)
    videoRef.current.play()
    setShowWelcomeTitle(false)

    await waitFor(6000)

    setVideoShown(false)
    setShowGetStartedTitle(true)

    await waitFor(4000)

    navigate(routes.home())
    toast.success('Welcome en ga direct aan de slag!')
  }

  const videoRef = useRef<any>()

  return (
    <>
      <MetaTags title="Activate" description="Activate page" />

      <Flex w="100vw" h="100vh">
        <AuthImageWithVideo
          videoShown={videoShown}
          videoRef={videoRef}
          showGetStartedTitle={showGetStartedTitle}
          showWelcomeTitle={showWelcomeTitle}
        />
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
          <Box maxW="500px" w="full">
            <Component
              setActivateStep={setActivateStep}
              handlePlayVideo={handlePlayVideo}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default ActivatePage
