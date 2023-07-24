import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './pages/Dashboard'
import { useContext,useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContex'
import NewRecord from './components/NewRecord'
import EditRecord from './components/EditRecord'
import AddUser from './components/AddUser.jsx'
import {doc,onSnapshot} from 'firebase/firestore'
import { db } from './firebase'


let currentUserData ;

const App = () => {

  // const [activeUser, setActiveUser] =useState(null)
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children})=>{
    return currentUser?children:<Navigate to='/'/>
  }
  

  async function getUser(){
    if(currentUser!==null){
      const docRef = doc(db,'users',currentUser.uid);
      onSnapshot(docRef,(doc)=>{
      currentUserData= {...doc.data()};
      })
    }
  }

  useEffect(()=>{
    getUser();
  },[currentUser])
 
  
  return (
    <>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/editRecord' element={<RequireAuth><EditRecord/></RequireAuth>}/>
        <Route path='/addRecord' element={<RequireAuth><NewRecord/></RequireAuth>}/>
        <Route path='/addUser' element={<RequireAuth><AddUser/></RequireAuth>}/>
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
      </Routes>
    </>
  )
}
export {currentUserData}
export default App