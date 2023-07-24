import { Button, Heading, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import NavBar from "./NavBar";
import { docId } from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";

const EditRecord = () => {

  const navigate = useNavigate()
  const updateRecordToast = useToast()
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

  async function getData() {
    const docRef = doc(db, "data", docId);
    const details = await getDoc(docRef);
    const getDetails = { ...details.data(), id: details.id };
    setState(getDetails);
  }

  useEffect(() => {
    getData();
  }, []);

  
  async function handelEdit(e) {
    e.preventDefault(); 
    try {
      const docRef = doc(db, "data", docId);
      await setDoc(docRef, {
        productName: state.productName,
        description: state.description,
        category: state.category,
        price: state.price,
        quantity: state.quantity,
        notes: state.notes,
      });
      updateRecordToast({
        title:'Record updated successfully',
        status:"success",
        position:'top',
        isClosable:true,
      })
      setTimeout(()=>{navigate('/dashboard')},2000)

    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <NavBar />
      <Heading>Hey lets edit the record</Heading>
      <form onSubmit={handelEdit}>
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
    </div>
  );
};

export default EditRecord;
