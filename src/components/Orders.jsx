import React, { useEffect } from 'react'
import '../styles/orders.css'
import { db } from "../firebase/config"
import { getDocs, collection } from "firebase/firestore"
import { useState } from "react"
function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const ordersCol = collection(db, "Orders");
                const ordersSnapshot = await getDocs(ordersCol);
                const ordersList = ordersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(ordersList);
            } catch (error) {
                console.log(error.message);

            }
        };
        getOrders();
    }, []);

    console.log(orders);

    return (
        <div id="orders">
            <h1>Orders</h1>
            <table id="ordersTable" border="1">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Ordered Items</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>{order.orderedItems.map((item) => <ul>
                                <li>{item.pizzaName}</li>
                                <li> <span>Qty</span> {item.Qty}</li>
                                <li><span>Total : Ksh. </span> {item.total}</li>

                            </ul>)}</td>
                            <td>{order.totalAmnt}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default Orders