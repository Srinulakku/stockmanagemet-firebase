import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Link,n, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { currentUserData } from "../App";
import { HStack, useToast, Button, Box, Text, Flex } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContex";

const NavBar = () => {

  const navigator =useNavigate()
  const logoutToast = useToast();
  const [show,setShow]= useState();

  const {dispatch}=useContext(AuthContext);
  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        logoutToast({
          title: "Logged Out",
          description: `${activeUser.fullName} successfully Logged out`,
          position:'top-left',
          isClosable: true,
          status:'success',
          duration: 2000,
        });
        dispatch({type:'LOGOUT'})
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getting the data about the active user
  const activeUser = { ...currentUserData };

 
  useEffect(()=>{
    if(activeUser.role ==='User'){
      setShow(false)
     }
   },[])
  return (
      <HStack justifyContent={'space-between'} px={7} alignItems={'center'} py={1} bgColor={'blackAlpha.300'}>
        <Box>
          <Button variant={'link'} fontSize={20} fontWeight={'bold'} color={'black'}><Link to="/dashboard">Stock Inventory</Link></Button>
        </Box>
        <Flex alignItems={'center'} justifyContent={'space-between'} w={show?'30%':'20%'} >
          {show ?<Button variant={"link"}>
            <Link to={"/dashboard"}>Home</Link>
          </Button>:''}
          <Text fontSize={18} textAlign={'center'} fontWeight={'bold'} mt={5}>{activeUser.fullName} <br />
          <span className="fs-6 fw-normal">{activeUser.email}</span>
          </Text>
          <Button
            colorScheme="red"
            onClick={handelLogout} >
            Log out
          </Button>
        </Flex>
      </HStack>
  );
};

export default NavBar;
