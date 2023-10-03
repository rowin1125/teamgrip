import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import { AuthProvider, useAuth } from './auth';
import { useBrevo } from './hooks/global/useBrevo';
import { theme } from './lib/theme/theme';

import './scaffold.scss';
import './index.scss';

const App = () => {
    useBrevo();

    return (
        <FatalErrorBoundary page={FatalErrorPage}>
            <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
                <AuthProvider>
                    <ColorModeScript />
                    <ChakraProvider resetCSS theme={theme}>
                        <RedwoodApolloProvider useAuth={useAuth}>
                            <Routes />
                        </RedwoodApolloProvider>
                    </ChakraProvider>
                </AuthProvider>
            </RedwoodProvider>
        </FatalErrorBoundary>
    );
};

export default App;
