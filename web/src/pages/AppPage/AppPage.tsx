import { MetaTags } from '@redwoodjs/web'

import PlayerCard from 'src/components/PlayerCard/PlayerCard'

const AppPage = () => {
  return (
    <>
      <MetaTags title="App" description="App page" />

      <PlayerCard />
    </>
  )
}

export default AppPage
