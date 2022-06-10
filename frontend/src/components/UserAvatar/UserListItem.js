import React from 'react'
import {Box, Text, Avatar} from '@chakra-ui/react'
import {ChatState} from '../../Context/ChatProvider'

const UserListItem = ({user, handleFunction }) => {
   
  return (
      <Box
          onClick={handleFunction}
          cursor='pointer'
          bg='#E8E8E8'
          _hover={{
              background: "#38B2AC",
              color:'white',
          }}
          width='100%'
          d='flex'
          alignItems='center'
          color='black'
          px={3}
          py={2}
          mb={2}
          borderRadius='lg'
      >

          <Avatar
              mr={2}
              size='sm'
              cursor='pointer'
              name={user.name}
              src={user.pic}
          />

          <Box>
              <Text>{user.name}</Text>
              <Text fonSize='xs'>
                  <b>Email: {user.email}</b>
              </Text>
          </Box>
          
      </Box>
          
  )
}

export default UserListItem