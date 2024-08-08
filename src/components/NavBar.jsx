import React from 'react'
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../assets/pizzahut-desktop-logo.svg"
import "../styles/navBar.css"
import { Link } from "react-router-dom"
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { AiFillDelete } from "react-icons/ai";


function NavBar(props) {
  const [openLinks, setOpenLinks] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHideCart, setShowHideCart] = useState(false);
  const [isGUser, setIsGUser] = useState(false);
  const [googUsrInf, setGoogUsrInf] = useState({});
  const toggleMenu = () => {
    setOpenLinks(!openLinks)
  }

  useEffect(() => {
    const loadUsrInfo = () => {
      //I can also use onAuthStateChanged(auth,callback)
      auth.onAuthStateChanged((user) => {

        //login form users

        if (user) {
          setIsLoggedIn(true);
          const docRef = doc(db, "Users", user.uid)
          getDoc(docRef).then(userData => setUserInfo(userData.data())).catch(
            error => console.log(error)
          )
          if (user.displayName) {
            setIsGUser(true);
            setGoogUsrInf(user)
          }
        }



      })
    }
    loadUsrInfo();
  }, [])

  const signOutUser = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  }

  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} width="150" height="37" alt="logo image" />
        <button id="navBtn" onClick={toggleMenu}><MdMenu /></button>
      </div>

      <div className="right" id={openLinks ? "open" : "close"}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {isLoggedIn ? <Link><FaUser /></Link> : <Link to="/login"><FaUser /></Link>}
        <Link to="#" onClick={() => {
          setShowHideCart(!showHideCart);
        }}><FaCartArrowDown /> <sup id="count">{props.howMany}</sup></Link>

        {/*login form users view*/}

        {(isLoggedIn && !isGUser) && <span className="header-top">
          Hi {userInfo.firstName} <button onClick={signOutUser}>logOut</button>
        </span>}

        {/*googleAuth users view*/}

        {(isLoggedIn && isGUser) && <span className="header-top">
          Hi {googUsrInf.displayName.split(" ")[0]} <button onClick={signOutUser}>logOut</button>
        </span>}
        <Link to="/#top"><span>&nbsp;</span></Link>

      </div>

      <div className={`cartItems ${showHideCart ? "" : "hideCart"}`}>

        {
          props.cartList.map(cartItm =>
            <div className="cartItem" key={cartItm.key}>
              <div>{cartItm.pizzaName}</div>
              <div><img src={cartItm.file} width="20" height="auto" /></div>
              <div> Price : Ksh.{cartItm.amount}</div>
              <div> Total : Ksh.{cartItm.total}</div>
              <div>
                How many?
                <input type="number" name="Qty" placeholder="1" value={cartItm.Qty} onChange={(e) => {
                  if (e.target.value < 1) {
                    e.target.value = 1
                  }
                  props.updateCartItem(cartItm.key, e.target.value);
                }}></input>
              </div>
              <div>
              <AiFillDelete onClick={() => { props.deleteItem(cartItm.key) }} />
              </div>
            </div>

          )
        }
        <div className="cartItms">All Items: {props.howMany}</div>
        <div className="totalAmnt">Total Amount :  {props.totalAmnt}</div>
        <div><button id="checkOut">Check Out</button></div>
        <div><button id="checkOutClose" onClick={() => { setShowHideCart(!showHideCart) }}>Close</button></div>

      </div>

    </div>
  )
}

export default NavBar