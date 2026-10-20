import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    return (
        <nav>
            <NavLink to='/menu'>Menu</NavLink>
            {!user && (
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </>
            )}
            {user && user.role === 'customer' && (
                <>
                    <NavLink to='/cart'>Cart</NavLink>
                    <NavLink to='/my-orders'>My Orders</NavLink>
                </>
            )}
            {user && user.role === 'admin' && (
                <>
                    <NavLink to='/admin/dashboard'>Dashboard</NavLink>
                    <NavLink to='/admin/orders'>Orders</NavLink>
                    <NavLink to='/admin/tables'>Tables</NavLink>
                    <NavLink to='/admin/menu/new'>Add Item</NavLink>
                </>
            )}
            {user && (
                <>
                    <span>Hi, {user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    )
}
