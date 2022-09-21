import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react'
import { randNumber } from '@ngneat/falso'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { MdOutlineSearchOff } from 'react-icons/md'

import RedwoodLink from 'src/components/RedwoodLink'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => randNumber({ min: -1000, max: 1000 })),
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: labels.map(() => randNumber({ min: -1000, max: 1000 })),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' as const,
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => randNumber({ min: -1000, max: 1000 })),
    },
  ],
}

type ChartHasDataWrapperProps = {
  children: JSX.Element
  entries: any[]
  isLoading: boolean
  to: string
  buttonText: string
  title: string
}

const ChartHasDataWrapper = ({
  children,
  entries,
  isLoading,
  buttonText,
  title,
  to,
}: ChartHasDataWrapperProps) => {
  const { isTeamStaff } = useTeamPlayerAuth()
  if (!entries) return null

  if (entries.length > 0) return children

  const showLock = !isLoading && entries?.length === 0

  return (
    <Box position="relative">
      {showLock && (
        <Box inset={0} position="absolute" zIndex={1}>
          <Flex
            bg="primary.500"
            inset={0}
            position="absolute"
            rounded="2xl"
            opacity={0.8}
            filter="blur(3px)"
          ></Flex>
          <Flex
            inset={0}
            position="absolute"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Flex alignItems="center">
              <Icon
                as={MdOutlineSearchOff}
                color="white"
                fontSize="4xl"
                position="relative"
                top={1.5}
                mr={4}
              />
              <Heading mt={4} color="white" textAlign="center">
                {title}
              </Heading>
            </Flex>
            {isTeamStaff && (
              <Button as={RedwoodLink} to={to} mt={4} colorScheme="secondary">
                {buttonText}
              </Button>
            )}
          </Flex>
        </Box>
      )}
      <Box filter={showLock ? 'blur(3px)' : ''}>
        <Chart type="bar" data={data} />
      </Box>
    </Box>
  )
}

export default ChartHasDataWrapper
