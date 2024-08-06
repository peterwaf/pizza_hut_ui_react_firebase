import React from 'react'
import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { getDocs, collection } from "firebase/firestore"
import MenuCard from "../components/MenuCard"
function Menu(props) {
  const [Menulist, setMenuList] = useState([]);
  useEffect(() => {
    const loadPizzas = async () => {
      try {

        const pRef = collection(db, "/Pizzas");
        const refPSnap = await getDocs(pRef);
        const pizzaLists = refPSnap.docs.map(pItem => {
          return {
            key: pItem.id,
            pizzaName: pItem.data().pizzaName,
            file: pItem.data().file,
            amount: pItem.data().amount,
            Qty: 1
          }
        });
        setMenuList(pizzaLists);

      } catch (error) {
        console.log(error.message);
      }
    };
    loadPizzas();
  }, [])


  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {Menulist.map(menuItem =>
          <MenuCard key={menuItem.key} addToCart={props.addToCart} menuItem={menuItem} id={menuItem.key} name={menuItem.pizzaName}
            image={menuItem.file}
            price={menuItem.amount} />)}
      </div>
    </div>
  )
}

export default Menu