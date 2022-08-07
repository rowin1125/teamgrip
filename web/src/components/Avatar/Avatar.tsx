import { Box } from '@chakra-ui/react'
import AvatarComponent from 'avataaars'

import { useAuth } from '@redwoodjs/auth'

import { generateRandomAvatarOptions } from 'src/pages/ActivatePage/components/steps/Avatar/helpers/generateRandomAvatar'

const Avatar = () => {
  const { currentUser } = useAuth()
  return (
    <Box position="relative">
      {currentUser?.avatar?.avatarStyle ? (
        <AvatarComponent
          style={{ width: '60px', height: '60px' }}
          {...currentUser?.avatar}
        />
      ) : (
        <AvatarComponent
          style={{ width: '60px', height: '60px' }}
          avatarStyle="Circle"
          {...generateRandomAvatarOptions()}
        />
      )}
      {currentUser?.userProfile?.firstname && (
        <Box
          position="absolute"
          bottom={-1}
          right={-1}
          bg="secondary.500"
          color="white"
          w="25px"
          h="25px"
          fontSize="10px"
          fontWeight="bold"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={9999}
          boxShadow="0px 0px 15px rgba(0, 0, 0, 0.85)"
        >
          <Box mr="1px">{currentUser?.userProfile?.firstname?.slice(0, 1)}</Box>
          {currentUser?.userProfile?.lastname?.slice(0, 1)}
        </Box>
      )}
    </Box>
  )
}

export default Avatar
