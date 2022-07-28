import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {currentUser?.email}
      Hello World!!
    </>
  )
}

export default HomePage
