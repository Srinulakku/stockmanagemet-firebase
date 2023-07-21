import React, { useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection,doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setName] =useState('')
  const [user,setUser] =useState('')
  
  const navigate = useNavigate()

  const handelSubmit =  (e) => {
    e.preventDefault();
    const res =createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user is created", cred.user.email);
        setUser(cred.user)
        alert("Account created successfully");
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });

      console.log(res);

      
  };

  
  return (
    <div>
      <h1 className="text-center mt-5">Welcome to Stock Management Application</h1>
      <h4 className="text-center">
        Let's create your Account
      </h4>
      <form className="signup" onSubmit={handelSubmit}>
        <input
          type="text"
          name="fullName"
          value={name}
          placeholder="Enter your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="Password"
          value={password}
          placeholder="Enter your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
        <h3 style={{fontSize:'12px',color:'gray'} } className='py-2'>
          Already have an account? <Link to={"/"} className="fs-6 text-decoration-none px-1">sign in</Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
