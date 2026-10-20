import React, { useState, useEffect } from 'react'
import { getAllOrders, updateOrderStatus } from '../api/orderApi'
import StatusMessage from '../components/StatusMessage'

const nextStatuses = {
  placed: ['preparing', 'cancelled'],
  preparing: ['served'],
  served: ['paid'],
  paid: [],
  cancelled: [],
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const loadOrders = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getAllOrders(statusFilter)
      setOrders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadOrders()
  }, [statusFilter])

  const handleMove = async (id, newStatus) => {
    setError('')
    try {
      await updateOrderStatus(id, newStatus)
      await loadOrders()
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div>
      <h2>Orders</h2>
      <label>Filter by status:{' '}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value=''>All</option>
          <option value='placed'>Placed</option>
          <option value='preparing'>Preparing</option>
          <option value='served'>Served</option>
          <option value='paid'>Paid</option>
          <option value='cancelled'>Cancelled</option>
        </select>
      </label>
      {error && <p>{error}</p>}
      <StatusMessage loading={loading} empty={!loading && orders.length === 0} emptyText='No orders found.' />
      {!loading && orders.map((order) => (
          <div key={order._id}>
            <h3>{order.table ? `Table ${order.table.tableNumber}` : 'Table removed'}</h3>
            <p>Status: {order.status}</p>
            <p>
              Items:{' '}
              {order.items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}
            </p>
            <p>Total: ₹{order.grandTotal}</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
            {nextStatuses[order.status].map((status) => (
              <button key={status} onClick={() => handleMove(order._id, status)}>Mark as {status}</button>
            ))}
          </div>
        ))}
    </div>
  )
}