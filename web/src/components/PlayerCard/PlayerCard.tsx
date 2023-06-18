import { Box, Fade, Flex, Spinner } from '@chakra-ui/react';

import { useAuth } from 'src/auth';

import Avatar from '../Avatar/Avatar';

import dutchFlag from './dutch-flag.png';
import playerCard from './fifa-player-card.png';
import { useGetPlayerScoresByTeamId } from './hooks/useGetPlayerScoresByTeamId';

import './PLayerCard.scss';

const PlayerCard = () => {
  const { currentUser } = useAuth();
  const { playerWithTotalScore, playerWithTotalScoreLoading } =
    useGetPlayerScoresByTeamId();

  return (
    <Box>
      <Box
        bgImage={playerCard}
        className="fut-player-card"
        position="relative"
        w={{ base: '300px', xl: '320px' }}
        minH="507px"
      >
        <Fade
          in={playerWithTotalScoreLoading}
          style={{
            height: '100%',
            position: 'absolute',
            inset: 0,
            width: '100%',
          }}
        >
          <Flex justifyContent="center" alignItems="center" h="full">
            <Spinner size="xl" color="secondary.500" />
          </Flex>
        </Fade>
        <Fade in={!playerWithTotalScoreLoading}>
          {playerWithTotalScore && (
            <>
              <Box className="player-card-top">
                <div className="player-master-info">
                  <div className="player-rating">
                    <span>97</span>
                  </div>
                  {/* Implement when playerStats are added */}
                  {/* <div className="player-position">
                      <span>RW</span>
                    </div> */}
                  <div className="player-nation">
                    <img src={dutchFlag} alt="Argentina" draggable="false" />
                  </div>
                  <div className="player-club">
                    <img
                      src="https://website.storage/Data/Zob/Layout/Images/Logo/full/default3_logo.png?637092497617279194"
                      alt="Barcelona"
                      draggable="false"
                    />
                  </div>
                </div>
                <Flex
                  justifyContent="center"
                  className="player-picture"
                  w="full"
                >
                  <Avatar
                    size="200"
                    disableInitials
                    additionalAvatarProps={{ avatarStyle: 'blank' }}
                  />
                </Flex>
              </Box>
              <div className="player-card-bottom">
                <div className="player-info">
                  <div className="player-name">
                    <span>{currentUser?.userProfile?.firstname}</span>
                  </div>
                  <div className="player-features">
                    <div className="player-features-col">
                      <span>
                        <div className="player-feature-value">
                          {playerWithTotalScore?.totalScore?.toFixed(0)}
                        </div>
                        <div className="player-feature-title">
                          Punten totaal
                        </div>
                      </span>
                      <span>
                        <div className="player-feature-value">
                          {playerWithTotalScore?.avgScore?.toFixed(2)}
                        </div>
                        <div className="player-feature-title">Gemiddeld</div>
                      </span>
                      <span>
                        <div className="player-feature-value">
                          {playerWithTotalScore?.scores?.[0]?.points?.toFixed(
                            0
                          ) || 0}
                        </div>
                        <div className="player-feature-title">
                          Laatste score
                        </div>
                      </span>
                      <span>
                        <div className="player-feature-title">
                          {playerWithTotalScore?.activeSeason?.name}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Fade>
      </Box>
    </Box>
  );
};

export default PlayerCard;
