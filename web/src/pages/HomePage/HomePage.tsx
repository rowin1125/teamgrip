import { MetaTags } from '@redwoodjs/web'
import ClubTeamsCell from 'src/components/ClubTeamsCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ClubTeamsCell />
    </>
  )
}

export default HomePage
