import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import Header from 'src/components/Header/Header'

const HomePage = () => {
  const { currentUser } = useAuth()
  console.log('currentUser', currentUser)
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Header />
      {currentUser?.email}
      Hello World!!
    </>
  )
}

export default HomePage
