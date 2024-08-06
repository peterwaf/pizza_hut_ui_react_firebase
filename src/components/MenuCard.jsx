import React from 'react'
import { useState,useEffect } from "react"
function MenuCard(props) {
    return (
        <div className="menuItem">
            <img src={props.image} width="300" height="200" alt={props.name} />
            <h1>{props.name}</h1>
            <p>Amount : Ksh {props.price}</p>
            <button onClick={() => {
               props.addToCart(props.menuItem)
            }}>Add to cart</button>
        </div>
    )
}

export default MenuCard