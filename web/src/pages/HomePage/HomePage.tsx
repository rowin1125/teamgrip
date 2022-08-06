import { Box, Flex, Heading } from '@chakra-ui/react'

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
      <Box h="calc(100vh - 32px - 96px - 80px)">
        <Flex h="full" w="full" justifyContent="center" alignItems="center">
          <Heading color="white">Coming soon ⏳️</Heading>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage
