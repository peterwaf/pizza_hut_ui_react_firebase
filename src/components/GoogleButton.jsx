import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
function GoogleButton() {
  const signWithGoogle = async () => {
    try {
      const gCredResult = await signInWithPopup(auth, provider);
      console.log("USER ID FROM GOOGLE", gCredResult.uid);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="logGoogle"><button onClick={signWithGoogle} id="google">Or Login/SignUp with <span><FcGoogle /> </span> </button></div>
  )
}

export default GoogleButton