import { Box, Container, Flex } from '@chakra-ui/react'

import { Toaster } from '@redwoodjs/web/dist/toast'

import Footer from 'src/components/Footer/Footer'
import PagesHeader from 'src/components/PagesHeader/PagesHeader'

type PageLayoutProps = {
  children?: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Box bg="primary.900">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Flex justifyContent="space-between">
        <Flex flexDir="column" w="full">
          <Container maxW="8xl">
            <PagesHeader />
          </Container>
          <Box as="main">{children}</Box>
        </Flex>
      </Flex>
      <Footer inverse />
    </Box>
  )
}

export default PageLayout
