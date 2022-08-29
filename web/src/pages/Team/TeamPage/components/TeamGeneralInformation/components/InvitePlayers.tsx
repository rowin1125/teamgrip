import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import TextAlert from 'src/components/TextAlert/TextAlert'

import ControlTeamInviteTab from './ModalTabs/ControlTeamInviteTab'
import InviteGhostTab from './ModalTabs/InviteGhostTab'
import ValidateTeamInvitation from './ValidateTeamInvitation'

type InvitePlayersProps = {
  team?: FindTeamQuery['team']
  defaultIndex?: number
  onClose: () => void
}

const InvitePlayers = ({ team, defaultIndex, onClose }: InvitePlayersProps) => {
  return (
    <Tabs size="lg" defaultIndex={defaultIndex}>
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
          <ValidateTeamInvitation team={team}>
            <TextAlert status="info">
              <Text>
                <strong>Ghost spelers</strong> kunnen gekoppeld worden aan echte
                spelers van je team. De unieke uitnodiging zorgt ervoor dat alle
                punten en statistieken worden overgenomen bij het aanmelden van
                het account.
              </Text>
            </TextAlert>
          </ValidateTeamInvitation>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default InvitePlayers
