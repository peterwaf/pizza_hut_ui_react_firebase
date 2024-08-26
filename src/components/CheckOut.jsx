import React from 'react'
import { useState } from "react"
import '../styles/checkout.css'
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function CheckOut(props) {
    const [checkOutFormData, setCheckOutFormData] = useState({
        orderedItems: props.cartList,
        howMany: '',
        totalAmnt: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        address: ''
    })
    const [checkOutErrorMessage, setCheckOutErrorMessage] = useState("");
    const validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const navigate = useNavigate();

    const handleCheckOutData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCheckOutFormData(prevData => {
            return {
                ...prevData,
                howMany: props.howMany,
                totalAmnt: props.totalAmnt,
                [name]: value
            }
        })

    }


    const handleCheckoutSubmit = async (event) => {
        event.preventDefault();
        if (checkOutFormData.firstName === '' || checkOutFormData.lastName === '' || checkOutFormData.email === '' || checkOutFormData.phone === '' || checkOutFormData.address === '' || checkOutFormData.city === '') {
            setCheckOutErrorMessage("Please fill in all the fields");
        }
        else if (!checkOutFormData.email.match(validEmailFormat)) {
            setCheckOutErrorMessage("Invalid Email, please enter the correct email");
        }
        else {

            try {
                const docRef = await addDoc(collection(db, "Orders"), checkOutFormData);
                console.log("Document written with ID: ", docRef.id);
                navigate('/success');
                setCheckOutFormData({
                    orderedItems: props.cartList,
                    howMany: '',
                    totalAmnt: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    city: '',
                    address: ''
                });
                props.resetCart();

            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    }

    return (
        <div id="checkOutDiv">
            <h1>Check Out</h1>
            {props.cartList.length > 0 ? <p>Order Summary</p> : <p>Your cart is empty</p>}
            <div id="checkoutContents" className={`${props.cartList.length > 0 ? 'show' : 'hide'}`}>
                <table id="checkOutTable">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>

                        {props.cartList.map(cartItm =>
                            <tr key={cartItm.key}>
                                <td><img src={cartItm.file} width="20" height="auto" /></td>
                                <td>{cartItm.pizzaName}</td>
                                <td>{cartItm.amount}</td>
                                <td>{cartItm.Qty}</td>
                                <td>{cartItm.total}</td>
                            </tr>
                        )}
                        <tr>
                            <td></td>
                            <td></td>
                            <td style={{ fontWeight: 'bold' }}> Quantity</td>
                            <td style={{ fontWeight: 'bold' }}> {props.howMany}</td>
                            <td style={{ fontWeight: 'bold' }}> Total Amount : Ksh {props.totalAmnt}</td>
                        </tr>
                    </tbody>
                </table>
                <form id="checkoutForm">
                    <input type="text" name="firstName"
                        placeholder="First Name"
                        value={checkOutFormData.firstName}
                        onChange={handleCheckOutData} />
                    <input type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={checkOutFormData.lastName}
                        onChange={handleCheckOutData} />
                    <input type="text"
                        name="phone"
                        placeholder="Phone"
                        value={checkOutFormData.phone}
                        onChange={handleCheckOutData} />
                    <select name="city"
                        id="city"
                        value={checkOutFormData.city}
                        onChange={handleCheckOutData}>
                        <option value="">Choose City</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Eldoret">Eldoret</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Mombasa">Mombasa</option>
                    </select>
                    
                    <input type="text"
                        name="address"
                        placeholder="Delivery Address"
                        value={checkOutFormData.address}
                        onChange={handleCheckOutData} />

                    
                    <input type="email"
                        name="email"
                        placeholder="Email"
                        value={checkOutFormData.email}
                        onChange={handleCheckOutData} />
                    <button type="submit" onClick={handleCheckoutSubmit}>Place Order</button>
                    <div id="errorDiv"><p style={{ color: "red" }}>{checkOutErrorMessage}</p></div>

                </form>
            </div>

        </div>
    )
}

export default CheckOut