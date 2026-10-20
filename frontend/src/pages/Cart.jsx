import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getTables } from '../api/tableApi'
import { createOrder } from '../api/orderApi'

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  const [tables, setTables] = useState([])
  const [tableId, setTableId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load the table list once, when the page opens
  useEffect(() => {
    const loadTables = async () => {
      try {
        const data = await getTables()
        setTables(data)
      } catch (err) {
        setError(err.message)
      }
    }

    loadTables()
  }, [])

  // Change how many of one dish are in the cart
  const changeQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      return
    }

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id))
  }

  // Estimate for the customer only. The server calculates the real bill.
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handlePlaceOrder = async () => {
    setError('')

    if (!tableId) {
      setError('Please choose a table')
      return
    }

    setLoading(true)

    try {
      // Send only the IDs and quantities. The server looks up the prices.
      const items = cart.map((item) => ({
        menuItemId: item._id,
        quantity: item.quantity,
      }))

      await createOrder(tableId, items)

      setCart([])
      navigate('/my-orders')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Shown when there is nothing in the cart
  if (cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <Link to='/menu'>Browse the menu</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>₹{item.price} each</p>

          <button onClick={() => changeQuantity(item._id, item.quantity - 1)}>-</button>
          <span> {item.quantity} </span>
          <button onClick={() => changeQuantity(item._id, item.quantity + 1)}>+</button>

          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}

      <p>Estimated subtotal: ₹{subtotal}</p>
      <p>GST (5%) and the final total are calculated when you place the order.</p>

      <div>
        <label>Table: </label>
        <select value={tableId} onChange={(e) => setTableId(e.target.value)}>
          <option value=''>Choose a table</option>
          {tables.map((table) => (
            <option key={table._id} value={table._id}>
              Table {table.tableNumber} (seats {table.capacity})
            </option>
          ))}
        </select>
      </div>

      {error && <p>{error}</p>}

      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? 'Placing order...' : 'Place order'}
      </button>
    </div>
  )
}