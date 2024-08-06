import React from 'react'
import { useState } from "react"
import "../styles/contact.css"
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prevFormData => { return { ...prevFormData, [name]: value } })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log("SUBMITTED", formData);
    // console.log(nodemailer)
  }
  return (
    <div className="contact">
      <div className="leftSide"></div>
      <div className="rightSide">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
          <label htmlFor="message">Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter message" rows="6" id="message"></textarea>
          <button>Send message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact