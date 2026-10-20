import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/apiAuth'

export default function Login({setUser}) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await loginUser(email, password)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            setUser(data.user)

            if (data.user.role ==='admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/menu')
            }
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Password' autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            {error && <p>{error}</p>}
            <p>New here? <Link to='/register'>Create an account</Link></p>
        </div>
    )
}