import { Skeleton } from '@chakra-ui/react'

type PlayerCardLoaderProps = {
  children?: React.ReactNode
  isLoading: boolean
}

const PlayerCardLoader = ({ children, isLoading }: PlayerCardLoaderProps) => (
  <Skeleton
    rounded="2xl"
    isLoaded={!isLoading}
    opacity={1}
    h="full"
    startColor="primary.200"
    speed={1.3}
    endColor="primary.900"
  >
    {children}
  </Skeleton>
)

export default PlayerCardLoader
