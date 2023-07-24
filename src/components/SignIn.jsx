import React, { useContext, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { Button, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const loginToast = useToast();

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  function handelSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged In ", cred.user);
        const user = cred.user;
        dispatch({ type: "LOGIN", payload: user});
        loginToast({
          title: "Logged In",
          description: `${cred.user.email} is logged in successfully `,
          isClosable: true,
          duration: 2000,
          position: "top",
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        setErr(true);
        console.log(err.message);
      });
  }
  return (
    <div>
      <Heading textAlign={'center'} fontWeight={'semibold'} p={3} color={'blackAlpha.900'}>
        Welcome To Stock Managing Application
      </Heading>

      <form onSubmit={handelSubmit} className="login">
        <VStack>
          <Input
            p={3}
            mb={2}
            w={"25%"}
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErr(false);
            }}
            value={email}
            placeholder="email"
          />
          <Input
            p={3}
            mb={2}
            w={"25%"}
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Password"
          />

          <Button colorScheme="purple" p={3} mb={2} w={"25%"} type="submit">Sign In</Button>

          <Text fontSize={'15px'} fontWeight={400} color={'gray.500'} textAlign={'center'} >
            New User ?   <Button variant={'link'}><Link to={"/signup"}> sign Up</Link></Button>
          </Text>
          {err && <Text color={'red.500'} fontSize={'12px'}>Wrong email or Password</Text>}
        </VStack>
      </form>
    </div>
  );
};

export default SignUp;
