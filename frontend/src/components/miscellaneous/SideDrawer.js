import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {Badge, Spinner, Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from '@chakra-ui/react'
import { useToast, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input } from '@chakra-ui/react'
import {BellIcon} from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import UserListItem from "../UserAvatar/UserListItem"
import {getSender} from '../../config/ChatLogics'
import ProfileModal from './ProfileModal'
import ChatLoading from "../ChatLoading"
import axios from 'axios'
import '../styles.css'

//import NotificationBadge from "./react-notification-badge/lib/index";
//import { Effect } from "react-notification-badge";

const SideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const [count, setCount] = useState(0);

    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
    const history = useHistory()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast();

    
    const logoutHandler = () => {
        localStorage.removeItem("userInfo")
        history.push('/')
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter Something In Search",
                status: "warning",
                durartion: 5000,
                isClosable: true,
                position: "top-left",
            })
            return;
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const {data} = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed To Load The Search Results",
                status: "error",
                durartion: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            return;
        }
    }


    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const { data } = await axios.post('/api/chat', { userId }, config)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data)
            setLoadingChat(false)
            onClose()

            
        } catch (error) {

             toast({
                title: "Error Fetching The Chat",
                description: error.message,
                status: "error",
                durartion: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            
        }
    }

  return (
      <div>
          <Box
              d='flex'
              justifyContent='space-between'
              alignItems='center'
              bg='white'
              width='100%'
              p='5px 10px 5px 10px'
              borderWidth='5px'
          >
              <Tooltip 
                  label="Search Users To Chat"
                  hasArrow
                  placement='bottom-end'
              >
                  <Button variant='ghost' onClick={onOpen}>
                      <i class='fas fa-search'></i>
                      <Text
                          d={{base:'none', md:'flex'}}
                          px='4'
                      >Search User</Text>
                  </Button>
              </Tooltip>

              <Text fontSize='2xl' fontFamily='sans-serif'>ChatArena</Text>
              <div>
                  <Menu>
                      <MenuButton p={1}>
                          {<span className='notify' count={notification.length} >{notification.length++}</span>}
                          {/*<Badge pill variant="danger" count={notification.length}>{notification.length}</Badge>*/}
                          {/*<NotificationBadge 
                          count={notification.length}
                          //effect={Effect.SCALE}
  />*/}
                          {console.log(notification.length)}
                          {/*<i class="fas fa-bell"></i>*/}
                          <BellIcon fontSize='2xl' m={1}/>
                      </MenuButton>
                      <MenuList pl={3}>
                        {!notification.length && "No New Messages"}  
                          {notification.map(notif => (
                              <MenuItem key={notif._id} onClick={() =>{
                                  setSelectedChat(notif.chat);
                                  setNotification(notification.filter((n) => n !== notif));
                              }}>
                                  {notif.chat.isGroupChat?`New Message in ${notif.chat.chatName}`:`New Message from ${getSender(user, notif.chat.users)}`}
                              </MenuItem>
                          )
                            
                       )}
                      </MenuList>
                  </Menu>

                  <Menu>
                      <MenuButton as={Button} rightIcon={<i class="fas fa-chevron-circle-down"></i>}>
                          <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
                      </MenuButton>

                      <MenuList>
                          <ProfileModal user={user}>
                              <MenuItem>My Profile</MenuItem>
                          </ProfileModal>
                      <MenuDivider/>
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </MenuList>
                  </Menu>
              </div>
          </Box>

          <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerHeader borderBottomwidth='1px'>Search Users</DrawerHeader>
                  
                  <DrawerBody>
                  <Box d='flex' pb={2}>
                      <Input
                       placeholder="Search By Name Or Email"
                       mr={2}
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button onClick={handleSearch}>Go</Button>
                      </Box>
                      
                      {loading ? (<ChatLoading />) :
                          (
                              searchResult?.map(user =>(
                                  <UserListItem
                                      key={user._id}
                                      user={user}
                                      handleFunction={()=>accessChat(user._id)}
                                  />
                              ))
                          )}
                       {loadingChat && <Spinner ml="auto" d="flex" />}
              </DrawerBody>
              </DrawerContent>
              
          </Drawer>

      </div>
  )
}

export default SideDrawer