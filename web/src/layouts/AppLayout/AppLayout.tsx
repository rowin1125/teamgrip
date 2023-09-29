import { Box, Flex } from '@chakra-ui/react';

import { Toaster } from '@redwoodjs/web/dist/toast';

import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';
import Header from 'src/components/Header/Header';
import Hero from 'src/components/Hero/Hero';
import NoSeasonAlert from 'src/components/NoSeasonAlert/NoSeasonAlert';
import Sidebar from 'src/components/Sidebar/Sidebar';

type AppLayoutProps = {
    children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => (
    <Box>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <Hero type="football-night-man" />
        <Flex
            justifyContent="space-between"
            mx={{ base: 4, xl: 0 }}
            pr={{ base: 0, xl: 4 }}
        >
            <Box position="relative">
                <Sidebar />
            </Box>
            <Flex flexDir="column" w="full" pt={8}>
                <Header />
                <NoSeasonAlert />
                <Box as="main" pl={{ xl: 8 }} px={{ xl: 8 }} pr={{ xl: 0 }}>
                    {children}
                </Box>
            </Flex>
        </Flex>
        <Footer />
        <FooterMenu />
    </Box>
);

export default AppLayout;
