import React from "react"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Menu from "./pages/Menu"
import Contact from "./pages/Contact"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import AddMenu from "./components/AddMenu"
import { useState, useEffect } from "react"
import CheckOut from "./components/CheckOut"
import './App.css'
import Orders from "./components/Orders"

function App() {
  const [cartList, setCartList] = useState(
    (localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []));
  const [howMany, setHowMany] = useState(0);
  const [totalAmnt, setTotalAmnt] = useState(0);
  let allTotals = 0
  let allQtys = 0

  //save cartList to localStorage

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartList));
  }, [cartList]);

  const updateCartItem = (id, newQty) => {
    setCartList(prevCartItems =>
      prevCartItems.map(item => {
        if (item.key === id) {
          const updatedQty = newQty;
          const updatedTotal = parseInt(item.amount) * updatedQty;
          return { ...item, Qty: updatedQty, total: updatedTotal };

        }
        return item;
      })
    )
  };

  const addToCart = (cartItem) => {
    let isDuplicate = cartList.some(itm => itm.key === cartItem.key); // true/false
    if (isDuplicate) {
      alert("Already in cart");
    } else {
      const cartItemTotal = parseInt(cartItem.amount) * cartItem.Qty;
      setCartList(prevCartItems => [...prevCartItems, { ...cartItem, total: cartItemTotal }]);
    }
  };

  const deleteItem = (cartId) => {
    setCartList(prevCartItems => prevCartItems.filter(item => item.key !== cartId));
  }


  const loadAllTotals = () => {
    cartList.forEach(item => {
      allTotals += parseInt(item.total);
      allQtys += parseInt(item.Qty);
    });
    setHowMany(allQtys);
    setTotalAmnt(allTotals);
  }

  useEffect(() => {
    if (cartList.length === 0) {
      setHowMany(0);
      setTotalAmnt(0);
    }

  }, [howMany, totalAmnt, cartList])


  useEffect(() => {
    if (cartList && cartList.length > 0) {
      loadAllTotals();
    }
  }, [cartList]);

  const resetCart = () => {
    setCartList([]);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar cartList={cartList}
          updateCartItem={updateCartItem}
          loadAllTotals={loadAllTotals}
          howMany={howMany}
          totalAmnt={totalAmnt}
          deleteItem={deleteItem} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<CheckOut resetCart={resetCart} howMany={howMany} totalAmnt={totalAmnt} allTotals={allTotals} cartList={cartList} />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </div>
  )
}

export default App
