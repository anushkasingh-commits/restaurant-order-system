import React, { useState, useEffect, use } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../api/orderApi'

export default function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        const loadOrder = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await getOrder(id)
                setOrder(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadOrder()
    }, [id])
    if (loading) {
        return <p>Loading bill...</p>
    }
    if (error) {
        return (
            <div>
                <p>{error}</p>
                <Link to='/my-orders'>Back to my orders</Link>
            </div>
        )
    }
    return (
        <div>
            <Link to='/my-orders' className="back-link">Back to my orders</Link>
            <h2>Bill</h2>
            <p>Table: {order.table ? order.table.tableNumber : 'Removed'}</p>
            <p>Status: {order.status}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>₹{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Subtotal: ₹{order.subtotl}</p>
            <p>GST (5%): ₹{order.gst}</p>
            <p><strong>Grand Total: ₹{order.grandTotal}</strong></p>
        </div>
    )
}
