import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Menu from './pages/Menu'
import MenuItem from './pages/MenuItem'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import OrderDetail from './pages/OrderDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminMenuForm from './pages/AdminMenuForm'
import AdminOrders from './pages/AdminOrders'
import AdminTables from './pages/AdminTables'
import './index.css'
import './App.css'

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  const addToCart = (item) => {
    const existing = cart.find((cartItem) => cartItem._id === item._id)
    if (existing) {
      setCart(cart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }
  const canOrder = user && user.role === 'customer'
  return (
    <div>
      <Navbar user={user} setUser={setUser}></Navbar>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />}></Route>
        <Route path='/register' element={<Register setUser={setUser} />}></Route>
        <Route path='/menu' element={<Menu onAddToCart={canOrder ? addToCart : undefined} />} />
        <Route path='/menu/:id' element={<MenuItem onAddToCart={canOrder ? addToCart : undefined} />} />
        <Route path='/cart' element={
          <ProtectedRoute user={user} allowedRoles={['customer']}>
            <Cart cart={cart} setCart={setCart} />
          </ProtectedRoute>} />
        <Route path='/my-orders' element={
          <ProtectedRoute user={user} allowedRoles={['customer']}><MyOrders /></ProtectedRoute>} />
        <Route path='/orders/:id' element={
          <ProtectedRoute user={user}><OrderDetail /></ProtectedRoute>} />
        <Route path='/admin/dashboard' element={
          <ProtectedRoute user={user} allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path='/admin/orders' element={
          <ProtectedRoute user={user} allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>} />
        <Route path='/admin/tables' element={
          <ProtectedRoute user={user} allowedRoles={['admin']}><AdminTables /></ProtectedRoute>} />
        <Route path='/admin/menu/new' element={
          <ProtectedRoute user={user} allowedRoles={['admin']}><AdminMenuForm /></ProtectedRoute>} />
        <Route path='/admin/menu/:id/edit' element={
          <ProtectedRoute user={user} allowedRoles={['admin']}><AdminMenuForm /></ProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<h2>Page not found</h2>}></Route>
      </Routes>
    </div>
  )
}
