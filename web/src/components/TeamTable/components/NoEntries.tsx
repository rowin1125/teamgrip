import { Flex, Icon, Text } from '@chakra-ui/react'
import { HiOutlineDocumentSearch } from 'react-icons/hi'

const NoEntries = () => {
  return (
    <Flex justifyContent="center" alignItems="center" h={40}>
      <Text fontSize="xl">Geen gegeven gevonden</Text>{' '}
      <Icon as={HiOutlineDocumentSearch} fontSize="5xl" ml={4} />
    </Flex>
  )
}

export default NoEntries
