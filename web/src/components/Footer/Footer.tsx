import React from 'react'

import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { CgCopyright } from 'react-icons/cg'

const Footer = () => {
  return (
    <Flex
      as="footer"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      h="80px"
      justifyContent="space-between"
      alignItems="center"
      px={16}
    >
      <Flex alignItems="center" justifyContent="center" w="full">
        <Icon as={CgCopyright} fontSize="24px" mr={1} />
        <Text display="flex">
          {new Date().getFullYear()}, Made by{' '}
          <Box
            as="a"
            fontWeight="bold"
            color="primary.500"
            px={1}
            target="_blank"
            href="https://derow.nl"
            rel="noreferrer"
          >
            Derow
          </Box>
        </Text>
      </Flex>
    </Flex>
  )
}

export default Footer
