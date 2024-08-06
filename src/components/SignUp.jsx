import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom"
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc } from "firebase/firestore";
import GoogleButton from "./GoogleButton";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [signUpData, setSignUPData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("");

  const handleSignUpData = (event) => {
    const { name, value } = event.target;
    setSignUPData(prevSignUpData => {
      return { ...prevSignUpData, [name]: value }
    })
  }

  const addUserData = async (user_id) => {
    try {
      await setDoc(doc(db, "Users", user_id), {
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email
      });
    } catch (error) {
      console.log("UNABLE TO ADD USER TO THE DB " + error);
    }

  }
  const submitSignUpData = async (event) => {
    event.preventDefault();
    try {
      const email = signUpData.email;
      const password = signUpData.password;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setSignUpSuccessMessage("Sign up success. Log in");
      setSignUPData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      })
      setSignUpErrorMessage("");
      //add remaining user data to DB
      addUserData(userCredential.user.uid);
      navigate("/#top")
    } catch (error) {
      if (error.message.includes("invalid-email")) {
        setSignUpErrorMessage("Invalid Email, please enter the correct email");
      }
      else if (error.message.includes("auth/network-request-failed")) {
        setSignUpErrorMessage("Network Error, please check your network")
      }
      else { setSignUpErrorMessage(error.message); }
    }
  }
  return (
    <div className="authContainer">
      <h1>Sign Up</h1>
      <form onSubmit={submitSignUpData} >
        <label htmlFor="name">First Name</label>
        <input type="text"
          name="firstName"
          onChange={handleSignUpData}
          value={signUpData.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input type="text"
          name="lastName"
          onChange={handleSignUpData}
          value={signUpData.lastName} />
        <label htmlFor="email">Email</label>
        <input type="text" name="email"
          onChange={handleSignUpData}
          value={signUpData.email}
        />
        <label htmlFor="password">Password</label>
        <input type="password"
          name="password"
          onChange={handleSignUpData}
          value={signUpData.password} />
        <div style={{ color: "red" }}>{signUpErrorMessage}</div>
        <div style={{ color: "green" }}>{signUpSuccessMessage}</div>
        <button>Register</button>
        <p>Already registered ? <Link to="/login">Login</Link></p>
      </form>
      <GoogleButton />
    </div>
  )
}

export default SignUp