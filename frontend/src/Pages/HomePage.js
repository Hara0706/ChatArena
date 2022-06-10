import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import {useHistory} from 'react-router-dom'

const HomePage = () => {
    
    const history = useHistory();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))
        if (user) {
            history.push('/chats')
        }
    }, [history])

    return (
        <Container maxW='xl' centerContent>
            <Box bg='white' d="flex" p={3} w='100%' justifyContent="center" borderRadius='lg' m='40px 0 15px 0' borderWidth='1px'>
                <Text fontSize='4xl' fontFamily='sans-serif'>ChatArena</Text>
            </Box>
            <Box bg='white' d="flex" p={4} w='100%' borderRadius='lg' borderWidth='1px'>
                <Tabs isFitted variant='soft-rounded' colorScheme='green'>
                    <TabList mb='1em'>
                        <Tab >Login</Tab>
                        <Tab >SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel><Login/></TabPanel>
                        <TabPanel><SignUp/></TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Container>
    )
}

export default HomePage