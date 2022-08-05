import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const { currentUser } = useAuth()

  console.log(
    'process.env.REDWOOD_ENV_VERCEL_URL',
    process.env.REDWOOD_ENV_VERCEL_URL
  )
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {currentUser?.email}
      Hello World!!
    </>
  )
}

export default HomePage
