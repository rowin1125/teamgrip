import React from 'react'

import { Box } from '@chakra-ui/react'

import './Cavemen.scss'

const Cavemen = () => {
  return (
    <Box overflow="hidden">
      <Box
        className="text"
        color="primary.900"
        fontSize={{ base: '15rem', md: '30rem' }}
      >
        <p>404</p>
      </Box>
      <Box
        className="container"
        transform={{
          base: 'translate(-50%, -50%) scale(0.5)',
          md: 'translate(-50%, -50%) scale(0.8)',
          lg: 'translate(-50%, -50%)',
        }}
      >
        {/* caveman left */}
        <Box className="caveman">
          <Box className="leg">
            <Box className="foot">
              <Box className="fingers" />
            </Box>
          </Box>
          <Box className="leg">
            <Box className="foot">
              <Box className="fingers" />
            </Box>
          </Box>
          <Box className="shape">
            <Box className="circle" />
            <Box className="circle" />
          </Box>
          <Box className="head">
            <Box className="eye">
              <Box className="nose" />
            </Box>
            <Box className="mouth" />
          </Box>
          <Box className="arm-right">
            <Box className="club" />
          </Box>
        </Box>
        {/* caveman right */}
        <Box className="caveman">
          <Box className="leg">
            <Box className="foot">
              <Box className="fingers" />
            </Box>
          </Box>
          <Box className="leg">
            <Box className="foot">
              <Box className="fingers" />
            </Box>
          </Box>
          <Box className="shape">
            <Box className="circle" />
            <Box className="circle" />
          </Box>
          <Box className="head">
            <Box className="eye">
              <Box className="nose" />
            </Box>
            <Box className="mouth" />
          </Box>
          <Box className="arm-right">
            <Box className="club" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Cavemen
