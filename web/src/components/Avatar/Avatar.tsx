import { Box } from '@chakra-ui/react'
import AvatarComponent from 'avataaars'

import { useAuth } from '@redwoodjs/auth'

import { generateRandomAvatarOptions } from 'src/pages/ActivatePage/components/steps/Avatar/helpers/generateRandomAvatar'

type AvatarProps = {
  size?: string
}

const Avatar = ({ size = '60' }: AvatarProps) => {
  const { currentUser } = useAuth()
  if (!currentUser) return null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...avatarProperties } = currentUser.avatar

  return (
    <Box position="relative" maxW={size}>
      {currentUser?.avatar?.avatarStyle ? (
        <AvatarComponent
          style={{ width: size, height: size }}
          {...avatarProperties}
        />
      ) : (
        <AvatarComponent
          style={{ width: size, height: size }}
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
          w={`${+size / 2.4}px`}
          h={`${+size / 2.4}px`}
          fontSize={`${+size / 6}px`}
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
