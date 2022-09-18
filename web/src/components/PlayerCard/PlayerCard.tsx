import { Box, Flex } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'

import Avatar from '../Avatar/Avatar'

import dutchFlag from './dutch-flag.png'
import { useGetPlayerScoresByTeamId } from './hooks/useGetPlayerScoresByTeamId'

import './PLayerCard.scss'

const PlayerCard = () => {
  const { currentUser } = useAuth()
  const { playerWithTotalScore, playerWithTotalScoreLoading } =
    useGetPlayerScoresByTeamId()

  if (playerWithTotalScoreLoading) return null
  if (!playerWithTotalScore) return null

  return (
    <Box transform={{ base: 'scale(0.7)', xl: 'none' }}>
      {/* *** fut-player-card ****/}
      <div className="fut-player-card">
        {/* Player Card Top*/}
        <div className="player-card-top">
          <div className="player-master-info">
            <div className="player-rating">
              <span>97</span>
            </div>
            <div className="player-position">
              <span>RW</span>
            </div>
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
          <Flex justifyContent="center" className="player-picture" w="full">
            <Avatar
              size="200"
              disableInitials
              additionalAvatarProps={{ avatarStyle: 'blank' }}
            />
          </Flex>
        </div>
        {/* Player Card Bottom*/}
        <div className="player-card-bottom">
          <div className="player-info">
            <div className="player-name">
              <span>{currentUser?.userProfile?.firstname}</span>
            </div>
            <div className="player-features">
              <div className="player-features-col">
                <span>
                  <div className="player-feature-value">
                    {playerWithTotalScore.totalScore}
                  </div>
                  <div className="player-feature-title">Punten totaal</div>
                </span>
                <span>
                  <div className="player-feature-value">
                    {playerWithTotalScore.avgScore}
                  </div>
                  <div className="player-feature-title">Gemiddeld</div>
                </span>
                <span>
                  <div className="player-feature-value">
                    {playerWithTotalScore.scores?.[0].points || 0}
                  </div>
                  <div className="player-feature-title">Laatste score</div>
                </span>
                <span>
                  <div className="player-feature-title">
                    {playerWithTotalScore.activeSeason.name}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default PlayerCard
