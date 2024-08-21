import React from 'react'
import '../styles/home.css'
import { Link } from "react-router-dom"
function Home() {
  return (
    <div className="home">
        <div className="headerContainer">
            <h1>Pizzahut</h1>
            <p>Pizza to fit any taste.</p>
            <button>
                <Link to="/menu" style={{ textDecoration: "none", color: "black"}}>Order Now</Link>
            </button>
        </div>
    </div>
  )
}

export default Home