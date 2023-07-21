
import React, { useContext, useState } from 'react'
import '../styles/signin.css'

import {
    signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate  } from 'react-router-dom'
import { AuthContext } from '../context/AuthContex'


const SignUp = () => {

    const [email,setEmail]= useState('')
    const[password,setPassword] =useState('')
    const[err,setErr]=useState(false)

    const navigate = useNavigate()
    const {dispatch} = useContext(AuthContext)

    function handelSubmit(e){
        e.preventDefault()
        
        signInWithEmailAndPassword(auth,email,password).then(cred =>{
            console.log("user created",cred.user);
            const user = cred.user
            dispatch({type:'LOGIN',payload:user})
            navigate('/dashboard')
        }).catch(err=>{
          setErr(true)
          console.log(err.message);
        })
    }
  return (
    <div>
        <h1 className='text-center mt-5'> Welcome To Stock Managing Application</h1>

        <form onSubmit={handelSubmit} className='login'>
            <input 
                type="email" 
                name='email'
                onChange={(e)=>{setEmail(e.target.value); setErr(false)}} 
                value={email}
                placeholder='email'
            />           
            <input type='password' 
            name='password'
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            placeholder='Password'
            />

            <button type="submit">Sign In</button>
            <p>New User ? <Link to={'/signUp'}>Sign Up</Link></p>
            {err&&<span>Wrong email or Password</span>}
        </form>
       
    </div>
  )
}

export default SignUp