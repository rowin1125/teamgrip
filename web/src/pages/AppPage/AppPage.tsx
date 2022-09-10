import { Flex } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import PlayerCard from 'src/components/PlayerCard/PlayerCard'

const AppPage = () => {
  return (
    <>
      <MetaTags title="App" description="App page" />

      <Flex justifyContent="center">
        <PlayerCard />
      </Flex>
    </>
  )
}

export default AppPage
