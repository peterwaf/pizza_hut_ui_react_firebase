import React from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleButton from "./GoogleButton";
function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrorMessage, setLoginUserErrorMessage] = useState();
  const navigate = useNavigate();
  const handleLogin = (event) => {
    const { name, value } = event.target;
    setLoginData(prevLoginData => { return { ...prevLoginData, [name]: value } })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginEmail = loginData.email;
      const loginPassword = loginData.password;
      const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredentials.user;
      if (user) {
        console.log(user)
        navigate("/#top");
      }
    } catch (error) {
      if (error.message.includes("invalid-credential")) {
        setLoginUserErrorMessage("Invalid credentials, try again");
      }
      else if (error.message.includes("signInWithEmailAndPassword is not defined")) {
        setLoginUserErrorMessage("Invalid email/password")
      }
      else if (error.message.includes("auth/network-request-failed")) {
        setLoginUserErrorMessage("Network Error, please check your network")
      }
      else { setLoginUserErrorMessage(error.message); }
    }


  }
  return (
    <div className="authContainer">
      <h1>Login</h1>
      <GoogleButton />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text"
          name="email"
          onChange={handleLogin}
          value={loginData.email} />
        <label htmlFor="password">Password</label>
        <input type="password"
          name="password"
          onChange={handleLogin}
          value={loginData.password} />
        <button>Login</button>
        <span style={{ color: "red" }}>{loginErrorMessage}</span>
        <p>Not registered ? <Link to="/signup"> Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login