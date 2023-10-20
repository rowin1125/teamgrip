import { Box, Flex, Spinner } from '@chakra-ui/react';
import AvatarComponent from 'avataaars';
import { Avatar as AdditionalAvatarProps, AvatarFragment } from 'types/graphql';

import { useAuth } from 'src/auth';
import { generateRandomAvatarOptions } from 'src/pages/ActivatePage/components/steps/Avatar/helpers/generateRandomAvatar';

import TeamGripAvatar from './components/TeamGripAvatar';

type AvatarProps = {
    size?: string;
    disableInitials?: boolean;
    additionalAvatarProps?: Partial<AdditionalAvatarProps>;
    avatar?: AvatarFragment['avatar'];
};

const Avatar = ({
    size = '60',
    disableInitials,
    additionalAvatarProps,
    avatar,
}: AvatarProps) => {
    const { currentUser, loading } = useAuth();

    const avatarData = avatar || currentUser?.avatar;

    return (
        <Box position="relative" m={2}>
            {loading && (
                <Flex
                    position="relative"
                    w="full"
                    h="full"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box filter="blur(2px)">
                        <AvatarComponent
                            avatarStyle="Circle"
                            {...generateRandomAvatarOptions()}
                            style={{ width: size, height: size }}
                        />
                    </Box>
                    <Spinner
                        size="lg"
                        position="absolute"
                        color="secondary.500"
                    />
                </Flex>
            )}
            {!loading && avatarData?.avatarStyle && (
                <TeamGripAvatar
                    avatar={avatarData}
                    size={size}
                    {...additionalAvatarProps}
                />
            )}
            {!disableInitials && currentUser?.userProfile?.firstname && (
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
                    <Box mr="1px">
                        {currentUser?.userProfile?.firstname
                            ?.slice(0, 1)
                            .toUpperCase()}
                    </Box>
                    {currentUser?.userProfile?.lastname
                        ?.slice(0, 1)
                        .toUpperCase()}
                </Box>
            )}
        </Box>
    );
};

export default Avatar;
