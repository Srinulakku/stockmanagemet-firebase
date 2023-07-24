import { dataRef, db } from "../firebase";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import {
  Box,
  Button,
  HStack,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { currentUserData } from "../App";
import { DeleteIcon } from "@chakra-ui/icons";


var docId;

const Dashboard = () => {
  const deleteToast = useToast();
  let [currentStock, setCurrentStock] = useState([]);
  const [display,setDisplay] =useState(true)

  //setting the active user
  const activeUser = { ...currentUserData };

  function deletingDoc(id) {
    const docRef = doc(db, "data", id);
    deleteDoc(docRef).then(() => {
      deleteToast({
        title: "Record deleted successfully",
        position: "top",
        status: "warning",
        icon: <DeleteIcon />,
      });
      console.log("record deleted successfully");
      getData();
    });
  }

  async function getData() {
    try {
      const data = await getDocs(dataRef);
      const filteredData = [];
      data.docs.forEach((doc) => {
        filteredData.push({ ...doc.data(), id: doc.id });
      });
      setCurrentStock(filteredData);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  console.log(currentStock);

  
  //identifying the active user role,
 useEffect(()=>{
  if(activeUser.role ==='User'){
    setDisplay(false)
   }
 },[])

  return (
    <div>
      <NavBar />
      <Box mx={5} my={2}>
        <VStack alignItems={'flex-start'}>
          <Box fontSize={"20px"} color={"purple.400"}>
            Welcome , {activeUser.fullName}
            <p className="fs-4"><span style={{color:'red'}}>Role : </span> {activeUser.role}</p> 
          </Box> 
         
          {/* Hiding the controls for users */}
         {display?<HStack w={"full"}>
            <Button  colorScheme="blue">
              <Link to={"/addUser"}>Manage Users</Link>
            </Button>
            <Spacer />
          <Button colorScheme="green">
            <Link to="/addRecord">Add New Record</Link>
          </Button>
          </HStack>:""}
          
        </VStack>
        <Text
          textAlign={"center"}
          fontSize={"3xl"}
          fontWeight={"semibold"}
          color={"olivedrab"}
        >
          Current Stock Details
        </Text>
        <Table w={"100%"} colorScheme="purple" variant={"striped"}>
          <Thead>
            <Tr fontSize={20}>
              <Th>Product Name</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Notes</Th>
              {display?<Th>Edit / Delete</Th>:''}
            </Tr>
          </Thead>
          <Tbody>
            {currentStock.map((data, idx) => {
              const {
                productName,
                category,
                description,
                price,
                quantity,
                notes,
              } = data;
              return (
                <Tr key={idx}>
                  <Td>{productName}</Td>
                  <Td>{category}</Td>
                  <Td>{description}</Td>
                  <Td>{price}</Td>
                  <Td>{quantity}</Td>
                  <Td>{notes}</Td>
                 {display? <Td>
                    <HStack>
                      <Button
                        variant={"link"}
                        onClick={() => {
                          
                          docId=data.id
                        }}
                      >
                        <Link to="/editRecord">Edit</Link>
                      </Button>
                      <Button
                        variant={"link"}
                        onClick={() => {
                          deletingDoc(data.id);
                        }}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>:''}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};
export { docId };
export default Dashboard;
