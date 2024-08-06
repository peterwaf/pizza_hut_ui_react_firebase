import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "../styles/footer.css"
function Footer() {
    return (
        <div className="footer">
            <div className="socialMedia">
                <FaInstagramSquare />
                <FaXTwitter />
                <FaFacebook />
                <FaLinkedin />
            </div>
            <p>&copy; 2024 pizzaHut.com</p>
        </div>
    )
}

export default Footer