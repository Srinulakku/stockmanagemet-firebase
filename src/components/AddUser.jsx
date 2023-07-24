import {
  Input,
  VStack,
  Button,
  Select,
  useToast,
  Heading,
  Box,
  Text,
  HStack,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import NavBar from "./NavBar";

const AddUser = () => {
  const adminToast = useToast();
  const [users, setUsers] = useState([]);
  const createAccountToast = useToast();
  const [state, setState] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  function handelChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  async function createAccount(e) {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        await setDoc(doc(db, "users", cred.user.uid), {
          ...state,
        });
        createAccountToast({
          title: `Account created for ${state.role}`,
          description: `Successfully Account created for ${state.fullName} with email : ${state.email} for Role:${state.role}`,
          duration: 3000,
          isClosable: true,
          status: "success",
        });
        console.log("Data stored to firebase");
        setState({
          fullName: "",
          role: "",
          email: "",
          password: "",
          confirmPassword: "",
          contact: "",
        });
      } catch (err) {
        console.log(err.message);
        alert(err.message);
      }
    } else {
      alert("Password Mismatch please enter a same password");
    }
  }

  async function getData() {
    const userRef = collection(db, "users");
    try {
      onSnapshot(userRef, (snapshot) => {
        const filteredData = [];
        snapshot.docs.forEach((doc) => {
          const dataRole = { ...doc.data() };
          if (dataRole.role === "User") {
            filteredData.push({ ...doc.data(), id: doc.id });
            setUsers(filteredData);
          }
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function makeAdmin(id, name) {
    console.log("clicked id is ", id);
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { role: "admin" })
      .then(() => {
        adminToast({
          title: `${name} is now a Admin`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });


      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <Box>
      <NavBar />
      <HStack justifyContent={"space-around"}>
        <form onSubmit={createAccount}>
          <Heading textAlign={"center"} fontSize={20} mt={4}>
            Here you can create accounts for{" "}
            <Text color="blue"> new Users or Admins</Text>
          </Heading>
          <VStack>
            <Input
              p={3}
              w={"100%"}
              type="text"
              onChange={handelChange}
              placeholder="Enter full name"
              name="fullName"
              value={state.fullName}
            />
            <Select
              placeholder="Select The role"
              w={"100%"}
              onChange={handelChange}
              name="role"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Select>

            <Input
              p={3}
              w={"100%"}
              type="text"
              onChange={handelChange}
              placeholder="Enter Email"
              name="email"
              value={state.email}
            />
            <Input
              p={3}
              w={"100%"}
              type="password"
              onChange={handelChange}
              placeholder="Enter password"
              name="password"
              value={state.password}
            />
            <Input
              p={3}
              w={"100%"}
              type="text"
              onChange={handelChange}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={state.confirmPassword}
            />
            <Input
              p={3}
              w={"100%"}
              type="number"
              onChange={handelChange}
              placeholder="Enter contact number"
              name="contact"
              value={state.contact}
            />

            <Button colorScheme="purple" p={4} w={"100%"} type="submit">
              Create Account
            </Button>
          </VStack>
        </form>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>Sl.No</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Click to Make as Admin</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((data, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{idx + 1}</Td>
                      <Td>{data.fullName}</Td>
                      <Td>{data.email}</Td>
                      <Td>
                        <Button
                          colorScheme="green"
                          variant={"ghost"}
                          onClick={() => {
                            makeAdmin(data.id,data.fullName);
                          }}
                        >
                          Make as Admin
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Box>
      </HStack>
    </Box>
  );
};

export default AddUser;
