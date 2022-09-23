import { Box, Flex, Icon } from '@chakra-ui/react'
import { BiQuestionMark } from 'react-icons/bi'

const GhostAvatar = ({ w, h, ...props }) => (
  <Box w={w} h={h} position="relative" {...props}>
    <svg
      style={{ width: w, height: h }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 264 280"
    >
      <defs>
        <circle cx="120" cy="120" r="120"></circle>
        <path d="M12 160c0 66.274 53.726 120 120 120s120-53.726 120-120h12V0H0v160h12z"></path>
        <path
          id="react-path-3"
          d="M124 144.611V163h4c39.765 0 72 32.235 72 72v9H0v-9c0-39.765 32.235-72 72-72h4v-18.389c-17.237-8.189-29.628-24.924-31.695-44.73C38.48 99.058 34 94.052 34 88V74c0-5.946 4.325-10.882 10-11.834V56c0-30.928 25.072-56 56-56s56 25.072 56 56v6.166c5.675.952 10 5.888 10 11.834v14c0 6.052-4.48 11.058-10.305 11.881-2.067 19.806-14.458 36.541-31.695 44.73z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-825 -1100) translate(825 1100)">
          <g fillRule="evenodd" strokeWidth="1" mask="url(#react-mask-5)">
            <g transform="translate(32 36)">
              <mask id="react-mask-6" fill="#fff">
                <use xlinkHref="#react-path-3"></use>
              </mask>
              <use fill="#D0C6AC" xlinkHref="#react-path-3"></use>
              <g fill="#000" mask="url(#react-mask-6)">
                <path d="M0 0H264V280H0z"></path>
              </g>
              <path
                fill="#000"
                fillOpacity="0.1"
                d="M156 79v23c0 30.928-25.072 56-56 56s-56-25.072-56-56V79v15c0 30.928 25.072 56 56 56s56-25.072 56-56V79z"
                mask="url(#react-mask-6)"
              ></path>
            </g>
            <g transform="translate(0 170)">
              <defs>
                <path
                  id="react-path-767"
                  d="M165.96 29.295c36.976 3.03 66.04 34 66.04 71.757V110H32v-8.948c0-38.1 29.592-69.287 67.045-71.832-.03.373-.045.75-.045 1.128 0 11.863 14.998 21.48 33.5 21.48 18.502 0 33.5-9.617 33.5-21.48 0-.353-.013-.704-.04-1.053z"
                ></path>
              </defs>
              <mask id="react-mask-768" fill="#fff">
                <use xlinkHref="#react-path-767"></use>
              </mask>
              <use
                fill="#E6E6E6"
                fillRule="evenodd"
                xlinkHref="#react-path-767"
              ></use>
              <g fill="#262E33" fillRule="evenodd" mask="url(#react-mask-768)">
                <path d="M0 0H264V110H0z"></path>
              </g>
              <g
                fill="#000"
                fillOpacity="0.16"
                fillRule="evenodd"
                strokeWidth="1"
                mask="url(#react-mask-768)"
                opacity="0.6"
              >
                <ellipse
                  cx="40.5"
                  cy="27.848"
                  rx="39.635"
                  ry="26.914"
                  transform="translate(92 4)"
                ></ellipse>
              </g>
            </g>
            <g fill="#000" transform="translate(76 82)">
              <g fillOpacity="0.7" transform="translate(2 52)">
                <path d="M40 15c0 7.732 6.268 14 14 14s14-6.268 14-14"></path>
              </g>
              <g fillOpacity="0.16" transform="translate(28 40)">
                <path d="M16 8c0 4.418 5.373 8 12 8s12-3.582 12-8"></path>
              </g>
              <g fillOpacity="0.6" transform="translate(0 8)">
                <circle cx="30" cy="22" r="6"></circle>
                <circle cx="82" cy="22" r="6"></circle>
              </g>
              <g fillOpacity="0.6">
                <g fillRule="nonzero" transform="translate(12 6)">
                  <path d="M3.63 11.159C7.545 5.649 18.278 2.56 27.523 4.83a2 2 0 00.954-3.884C17.74-1.69 5.312 1.887.37 8.84a2 2 0 003.26 2.318z"></path>
                  <path
                    d="M61.63 11.159c3.915-5.51 14.648-8.598 23.893-6.328a2 2 0 00.954-3.884C75.74-1.69 63.312 1.887 58.37 8.84a2 2 0 003.26 2.318z"
                    transform="matrix(-1 0 0 1 146 0)"
                  ></path>
                </g>
              </g>
            </g>
            <g fillRule="evenodd" strokeWidth="1">
              <defs>
                <path id="react-path-741" d="M0 0H264V280H0z"></path>
                <filter
                  width="101.5%"
                  height="108%"
                  x="-.8%"
                  y="-2%"
                  filterUnits="objectBoundingBox"
                >
                  <feOffset
                    dy="2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  ></feOffset>
                  <feColorMatrix
                    in="shadowOffsetOuter1"
                    result="shadowMatrixOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                  ></feColorMatrix>
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <mask fill="#fff">
                <use xlinkHref="#react-path-741"></use>
              </mask>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <Flex
      justifyContent="center"
      alignItems="center"
      position="absolute"
      inset={0}
    >
      <Icon fontSize="xl" as={BiQuestionMark} top="0" />
    </Flex>
  </Box>
)

export default GhostAvatar
