import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FindTeamQuery } from 'types/graphql';

import ConnectGhostToUserInvite from './ModalTabs/ConnectGhostToUserInvite';
import ControlTeamInviteTab from './ModalTabs/ControlTeamInviteTab';
import InviteGhostTab from './ModalTabs/InviteGhostTab';

type InvitePlayersProps = {
  team?: FindTeamQuery['team'];
  defaultIndex?: number;
  onClose: () => void;
};

const InvitePlayers = ({ team, defaultIndex, onClose }: InvitePlayersProps) => {
  const [tabIndex, setTabIndex] = useState(defaultIndex || 0);
  const handleTabChange = (index: number) => setTabIndex(index);

  return (
    <Tabs
      size="lg"
      defaultIndex={tabIndex}
      index={tabIndex}
      onChange={handleTabChange}
    >
      <TabList>
        <Tab fontWeight="bold">Team via een link</Tab>
        <Tab fontWeight="bold">Ghost spelers aanmaken</Tab>
        <Tab fontWeight="bold">Koppel ghosts aan spelers</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ControlTeamInviteTab team={team} />
        </TabPanel>
        <TabPanel>
          <InviteGhostTab team={team} onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <ConnectGhostToUserInvite
            team={team}
            onClose={onClose}
            handleTabChange={handleTabChange}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default InvitePlayers;
