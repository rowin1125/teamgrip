import { Box, Flex } from '@chakra-ui/react';

import { Toaster } from '@redwoodjs/web/dist/toast';

import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import Hero from 'src/components/Hero/Hero';

type GeneralLayoutProps = {
  children?: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <Box>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Hero size="full" type="football-night-man" />
      <Flex justifyContent="space-between" px={8} pt={8}>
        <Flex flexDir="column" w="full">
          <Header />
          <Box as="main" pl={8}>
            {children}
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export default GeneralLayout;
