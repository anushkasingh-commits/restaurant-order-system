import React, { use, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/apiAuth'

export default function Register({setUser}) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await registerUser(name, email, password)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            setUser(data.user)
            navigate('/menu')
        } catch(error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder='Email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder='Password (atleast 6 characters)' autoComplete='current-password' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit' disabled={loading}>
                {loading ? 'Creating account' : 'Register'}
            </button>
        </form>
        {error && <p>{error}</p>}
        <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  )
}
