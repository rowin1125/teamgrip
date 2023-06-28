import { Grid } from '@chakra-ui/react';

import { MetaTags } from '@redwoodjs/web';

import AvatarSettings from './components/AvatarSettings';
import GlobalSettings from './components/GlobalSettings';
import ProfileSettings from './components/ProfileSettings';
import SettingsIntro from './components/SettingsIntro';
import LeaveTeamSettings from './components/LeaveTeamSettings';
import { useAuth } from 'src/auth';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const { team } = useGetTeamById();

  const isOwner = team?.owner?.id === currentUser?.id;
  const showDeletePlayerVisible = !isOwner && currentUser?.player?.teamId;

  return (
    <>
      <MetaTags
        title="Instellingen"
        description="Regel jouw instellingen voor TeamGrip"
      />
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={{ base: 0, xl: 10 }}
        px={{ base: 4, xl: 0 }}
      >
        <SettingsIntro />
        <GlobalSettings />
        <ProfileSettings />
        <AvatarSettings />
        {showDeletePlayerVisible && <LeaveTeamSettings />}
      </Grid>
    </>
  );
};

export default SettingsPage;
