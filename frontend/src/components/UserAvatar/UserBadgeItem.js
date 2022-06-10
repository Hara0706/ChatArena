import React from 'react'
import {Box} from '@chakra-ui/react'

const UserBadgeItem = ({user, handleFunction}) => {
  return (
      <Box
          px={2}
          py={1}
          borderRadius='lg'
          m={1}
          mb={2}
          variant='solid'
          fontSize={12}
          backgroundColor='purple'
          color='white'
          cursor='pointer'
          onClick={handleFunction}
      >
          {user.name} {" "}
          <i class="fas fa-times-circle"></i>
      </Box>
  )
}

export default UserBadgeItem