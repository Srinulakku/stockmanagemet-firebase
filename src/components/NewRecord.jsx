import { addDoc} from "firebase/firestore";
import React, { useState } from "react";
import { dataRef} from "../firebase";
import { Box, Button, Heading, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import NavBar from "./NavBar";

const NewRecord = () => {

  const addToast = useToast()

  const [state, setState] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    notes: "",
  });

  
 

  function handelChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const addRecord = async () => {
    addToast({
      title:'Record added successfully',
      status:'success',
      duration:3000,
      position:'top-right'
    })
    try {
      await addDoc(dataRef, {
        productName: state.productName,
        description: state.description,
        category: state.category,
        price: state.price,
        quantity: state.quantity,
        notes: state.notes,
      });
      
      setState({
        productName: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        notes: "",
      });
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <Box>
        <NavBar />
        <Heading fontSize={'1.8rem'} fontWeight={300} textAlign={'center'} py={5} color={'blue.400'} >Here you can add a Record</Heading>
      <form onSubmit={addRecord}>
        <VStack>
          <Input
            p={3}
            w={"25%"}
            type="text"
            onChange={handelChange}
            placeholder="Enter Product name"
            name="productName"
            value={state.productName}
          />
          <Input
            p={3}
            w={"25%"}
            type="text"
            onChange={handelChange}
            placeholder="Enter Category"
            name="category"
            value={state.category}
          />
          <Textarea
            h={100}
            p={3}
            w={"25%"}
            type="text"
            onChange={handelChange}
            placeholder="Enter Description"
            name="description"
            value={state.description}
          />
          <Input
            p={3}
            w={"25%"}
            type="number"
            onChange={handelChange}
            placeholder="Enter Price"
            name="price"
            value={state.price}
          />
          <Input
            p={3}
            w={"25%"}
            type="number"
            onChange={handelChange}
            placeholder="Enter Quantity"
            name="quantity"
            value={state.quantity}
          />
          <Input
            p={3}
            w={"25%"}
            type="text"
            onChange={handelChange}
            placeholder="Enter Notes"
            name="notes"
            value={state.notes}
          />
          <Button colorScheme="purple" p={4} w={"25%"} type="submit">
            Add Record
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default NewRecord;
