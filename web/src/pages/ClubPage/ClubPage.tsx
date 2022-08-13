import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import PlayerCard from 'src/components/PlayerCard/PlayerCard'

const ClubPage = () => {
  return (
    <>
      <MetaTags title="Club" description="Club page" />

      <PlayerCard />
    </>
  )
}

export default ClubPage
