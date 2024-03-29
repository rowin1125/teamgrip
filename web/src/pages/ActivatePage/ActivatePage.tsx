/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { navigate, routes, useParams } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import FormProgress from 'src/components/forms/components/FormProgress';

import { waitFor } from '../../helpers/waitFor/waitFor';

import AuthImageWithVideo from './components/AuthImageWithVideo';
import ActivateForm from './components/steps/ActivateForm';
import CreateAvatar from './components/steps/Avatar/CreateAvatar';
import UpdateUserInfoForm from './components/steps/UpdateUserInfoForm';

const ActivatePage = () => {
    const { ghostInvitation } = useParams();
    const { currentUser } = useAuth();
    const [activateStep, setActivateStep] = useState(0);
    const [videoShown, setVideoShown] = useState(false);
    const [showWelcomeTitle, setShowWelcomeTitle] = useState(true);
    const [showGetStartedTitle, setShowGetStartedTitle] = useState(false);

    const FormPages = [ActivateForm, UpdateUserInfoForm, CreateAvatar];
    const Component = FormPages[activateStep] ?? 'div';

    const invitationToken = currentUser?.player?.teamInvitation;

    const handlePlayVideo = async () => {
        setVideoShown(true);
        videoRef.current.play();
        setShowWelcomeTitle(false);

        await waitFor(6000);

        setVideoShown(false);
        setShowGetStartedTitle(true);

        await waitFor(4000);

        invitationToken
            ? navigate(routes.joinTeam({ invitationToken, ghostInvitation }))
            : navigate(routes.app());
        toast.success('Welcome en ga direct aan de slag!');
    };

    const videoRef = useRef<any>();

    return (
        <>
            <MetaTags title="Activeer je account" description="Activate page" />

            <Flex
                w="100vw"
                h={{ base: '100%', xl: 'calc(100vh - 80px)' }}
                flexDirection={{ base: 'column', xl: 'row' }}
            >
                <AuthImageWithVideo
                    videoShown={videoShown}
                    videoRef={videoRef}
                    showGetStartedTitle={showGetStartedTitle}
                    showWelcomeTitle={showWelcomeTitle}
                />
                <Flex
                    flexDir="column"
                    w={{ base: '100%', xl: '33.33%' }}
                    bg="primary.500"
                    color="white"
                    justifyContent="center"
                    alignItems="center"
                    minH="calc(100vh - 300px - 80px)"
                >
                    <FormProgress
                        activePage={activateStep}
                        amountOfPages={FormPages.length}
                        mb={10}
                        mt={{ base: 4, xl: 0 }}
                        pl={4}
                        stepsProps={{
                            responsive: false,
                            activeStep: activateStep,
                        }}
                    />
                    <Box maxW="700px" w="full" p={4}>
                        <Component
                            setActivateStep={setActivateStep}
                            handlePlayVideo={handlePlayVideo}
                        />
                    </Box>
                </Flex>
            </Flex>
        </>
    );
};

export default ActivatePage;
