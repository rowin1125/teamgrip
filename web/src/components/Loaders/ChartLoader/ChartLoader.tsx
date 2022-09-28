import { Skeleton } from '@chakra-ui/react'

type ChartLoaderProps = {
  children?: React.ReactNode
  isLoading: boolean
}

const ChartLoader = ({ children, isLoading }: ChartLoaderProps) => (
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

export default ChartLoader
