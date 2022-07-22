import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import ClubTeamsCell from 'src/components/ClubTeamsCell'

const HomePage = () => {
  const { currentUser } = useAuth()
  console.log('currentUser', currentUser)
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ClubTeamsCell />
    </>
  )
}

export default HomePage
