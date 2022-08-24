import {
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

type InvitePlayersProps = { teamId: string }

const InvitePlayers = ({ teamId }: InvitePlayersProps) => {
  const inviteUrl = `${process.env.FRONTEND_URL}/app/team/${teamId}/join`
  const { hasCopied, onCopy } = useClipboard(inviteUrl)

  return (
    <Tabs size="lg">
      <TabList>
        <Tab fontWeight="bold">Via een link</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Text mb={4}>Deel deze link met de teamleden</Text>
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default InvitePlayers
