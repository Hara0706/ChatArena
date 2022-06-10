import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { InputRightElement, VStack } from '@chakra-ui/react'
import {Input, Button} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const SignUp = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const handleClick = () => setShow(!show)

    const postDetails = (pics) => { 
        setLoading(true);
        if (pics === undefined) {
            toast({
                toast: "Please Select An Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chatarena");
            data.append("cloud_name", "dreosjljo");
            fetch("https://api.cloudinary.com/v1_1/dreosjljo/image/upload", {
                method: "post",
                body: data,

            }).then((res) => res.json()).then(data => {
                setPic(data.url.toString());
                setLoading(false);
            })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
            });
        }
        else {
            toast({
                toast: "Please Select An Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
            return;
        }
    }
    
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                toast: "Please Fill All The Fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                toast: "Passwords Do Not Match!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
            
            toast({
                toast: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch (error) {
            toast({
                toast: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
        }
    }


    return (
      
     <VStack spacing='5px'>
          <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                      placeholder='Enter Your Name' 
                      onChange={(e) =>setName(e.target.value)}
                  />
            </FormControl>
             <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                      placeholder='Enter Your Email' 
                      onChange={(e) =>setEmail(e.target.value)}
                  />
            </FormControl>
             <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                      type={show? 'text':'password'}
                      placeholder='Enter Your Password' 
                      onChange={(e) =>setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show? "Hide":"Show"}
                    </Button>
                </InputRightElement>
            </FormControl>
            <FormControl id='confirmpassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                      type={show? 'text':'password'}
                      placeholder='Confirm Your Password' 
                      onChange={(e) =>setConfirmpassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show? "Hide":"Show"}
                    </Button>
                </InputRightElement>
            </FormControl>
            <FormControl id='pic'>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button 
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >Sign Up</Button>
      </VStack>
  )
}

export default SignUp