import { Grid } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import AvatarSettings from './components/AvatarSettings'
import GlobalSettings from './components/GlobalSettings'
import ProfileSettings from './components/ProfileSettings'
import SettingsIntro from './components/SettingsIntro'

const SettingsPage = () => {
  return (
    <>
      <MetaTags
        title="Instellingen"
        description="Regel jouw instellingen voor TeamGrip"
      />
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={{ base: 0, xl: 10 }}
        px={{ base: 4, xl: 0 }}
      >
        <SettingsIntro />
        <GlobalSettings />
        <ProfileSettings />
        <AvatarSettings />
      </Grid>
    </>
  )
}

export default SettingsPage
