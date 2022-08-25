import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { BsWhatsapp } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { TbCheck } from 'react-icons/tb'
import { FindTeamQuery } from 'types/graphql'

import { useCreateInvitationToken } from '../hooks/useCreateInvitationToken'

import DeleteTeamInvitationTokenDialog from './DeleteTeamInvitationTokenDialog'

type InvitePlayersProps = { team?: FindTeamQuery['team'] }

const InvitePlayers = ({ team }: InvitePlayersProps) => {
  const inviteUrl = `${process.env.FRONTEND_URL}/app/team/join?invitationToken=${team?.invitationToken}`
  const { hasCopied, onCopy } = useClipboard(inviteUrl)

  const { handleCreateInvitation, loading } = useCreateInvitationToken(team.id)

  return (
    <Tabs size="lg">
      <TabList>
        <Tab fontWeight="bold">Via een link</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {team.invitationToken ? (
            <>
              <Text mb={4}>
                Je hebt op dit moment een actieve uitnoding voor het team. Dit
                betekend dat iedereen met de volgende url het team kan joinen.
              </Text>
              <Text fontStyle="italic" fontSize="md">
                Gebruik het vuilnisbak als je deze uitnoding ongedaan wilt
                maken.
              </Text>
              <Flex mb={2} w={{ base: 'full', xl: '66%' }}>
                <Input
                  title={inviteUrl}
                  value={inviteUrl}
                  isReadOnly
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                />
                <Button onClick={onCopy} ml={2} color="white">
                  {hasCopied ? (
                    <Icon as={TbCheck} color="white" />
                  ) : (
                    <Icon as={MdContentCopy} color="white" />
                  )}
                </Button>
                <DeleteTeamInvitationTokenDialog teamId={team.id} />
              </Flex>
              <ButtonGroup mt={4}>
                <Button
                  as="a"
                  target="_blank"
                  href={`https://api.whatsapp.com/send?text=TeamStats:+Je+ben+uitgenodigd+om+een+team+te+joinen.+Bekijk+nu+je+uitnodiging:+${encodeURI(
                    inviteUrl
                  )}`}
                  colorScheme="whatsapp"
                >
                  Deel via WhatsApp <Icon as={BsWhatsapp} ml={4} />
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <Box mt={4}>
              <Text>Maak eerst een uitnodiging aan! 📫️</Text>
              <Button
                isLoading={loading}
                mt={8}
                onClick={handleCreateInvitation}
              >
                Uitnoding genereren
              </Button>
            </Box>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default InvitePlayers
