import React, { useId, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  Button,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Select,
  
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const signupToast = useToast();

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (userData.password === userData.confirmPassword) {
        try {
          const cred = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          )

          await setDoc(doc(db,"users",cred.user.uid),{
            ...userData
          })
          console.log("Data stored to firebase");
          signupToast({
            title: `${cred.user.email} is registered successfully`,
            description: `Account is created successfully with email :${cred.user.email}`,
              
          });
         
        } catch (error) {
          console.log(error.message);
        }
        navigate('/')        
    }
    else{
      alert('Password ans confirm password should be same')
    }
  };

  function handelChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  console.log(userData);
  return (
    <div>
      <Heading color={"blue.700"} my={10} textAlign={"center"}>
        Welcome to Stock Management Application
      </Heading>
      <Heading fontSize={20} textAlign={"center"} my={5} fontWeight={400}>
        Let's create your Account
      </Heading>
      <form className="signup" onSubmit={handelSubmit}>
        <VStack>
          <Input
            p={3}
            mb={2}
            w={"25%"}
            type="text"
            name="fullName"
            value={userData.fullName}
            placeholder="Enter your Name"
            onChange={handelChange}
          />
          <Input
            p={3}
            mb={2}
            w={"25%"}
            type="email"
            name="email"
            value={userData.email}
            placeholder="Enter your Email"
            onChange={handelChange}
          />
          <Select
            placeholder="Select The role"
            w={"25%"}
            onChange={handelChange}
            name="role"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Select>
          <Input
            p={3}
            mb={2}
            w={"25%"}
            type="password"
            name="password"
            value={userData.password}
            placeholder="Enter your Password"
            onChange={handelChange}
          />
          <Input
            p={3}
            w={"25%"}
            type="text"
            onChange={handelChange}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
          />
          <Button colorScheme="purple" p={3} mb={2} w={"25%"} type="submit">
            Sign Up
          </Button>
          <Text fontSize={"15px"} fontWeight={400} textAlign={"center"}>
            Already have an account?
            <Button variant={"link"} pl={2}>
              <Link to={"/"}> sign in</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </div>
  );
};

export default SignUp;
