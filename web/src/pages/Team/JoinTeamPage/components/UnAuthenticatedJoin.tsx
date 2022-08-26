import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import LoginForm from 'src/pages/LoginPage/LoginForm'
import SignUpForm from 'src/pages/SignupPage/components/SignUpForm'

import { useUnAuthenticated } from '../hooks/useUnAuthenticated'

const UnAuthenticatedJoin = () => {
  const { handleSignIn, handleSignUp, loading } = useUnAuthenticated()

  return (
    <Tabs size="lg" align="center" isFitted>
      <TabList>
        <Tab fontWeight="bold">
          <Text color="white">Login</Text>
        </Tab>
        <Tab fontWeight="bold">
          <Text color="white">Aanmelden</Text>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Heading color="white">Je bent nog niet ingelogd 👮‍♂️</Heading>
          <Text my={4} color="white">
            Log eerst in zodat we weten wie er het team gaat joinen.
          </Text>
          <LoginForm
            onSubmit={handleSignIn}
            loading={loading}
            initialValues={{ username: '', password: '' }}
            showSignUp={false}
          />
        </TabPanel>
        <TabPanel>
          <Heading color="white">Join de TeamStats fam </Heading>
          <Text mt={4}>En sluit daarna direct aan bij je nieuwe team</Text>
          <SignUpForm
            onSubmit={handleSignUp}
            loading={loading}
            initialValues={{
              username: '',
              password: '',
            }}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default UnAuthenticatedJoin
