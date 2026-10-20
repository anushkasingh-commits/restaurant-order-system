import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders, cancelOrder } from '../api/orderApi'

export default function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        const loadOrders = async () => {
            try{
                const data = await getMyOrders()
                setOrders(data)
            } catch (err) {
                setError(err.message)
            } finally{
                setLoading(false)
            }
        }
        loadOrders()
    }, [])
    const handleCancel = async(id) => {
        setError('')
        try {
            await cancelOrder(id)
            const data = await getMyOrders()
            setOrders(data)
        } catch(err) {
            setError(err.message)
        }
    }
    if (loading) {
        <p>Loading your orders...</p>
    }
  return (
    <div>
        <h2>MyOrders</h2>
        {error && <p>{error}</p>}
        {orders.length === 0 && !error && <p>You have not placed any orders yet.</p>}
        {orders.map((order) => (
            <div key={order._id}>
                <h3>{order.table ? `Table ${order.table.tableNumber}` : 'Table removed'}</h3>
                <p>Status : {order.status}</p>
                <p>Total : ₹{order.grandTotal}</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
                <Link to={`/orders/${order._id}`} className='btn'>View bill</Link>
                {order.status === 'placed' && (
                    <button onClick={() => handleCancel(order._id)}>Cancel order</button>
                )}
            </div>
        ))}
    </div>
  )
}
