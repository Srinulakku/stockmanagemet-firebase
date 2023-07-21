import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './pages/Dashboard'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContex'
import NewDoc from './components/NewDoc'

const App = () => {

  const {currentUser} = useContext(AuthContext)
  

  const RequireAuth = ({children})=>{
    return currentUser?children:<Navigate to='/'/>
  }
  console.log(currentUser);
  return (
    <>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/addDoc' element={<NewDoc/>}/>
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
      </Routes>
    </>
  )
}

export default App