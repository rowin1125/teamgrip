import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const { currentUser } = useAuth()
  console.log('currentUser', currentUser)
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      Hello World
    </>
  )
}

export default HomePage
