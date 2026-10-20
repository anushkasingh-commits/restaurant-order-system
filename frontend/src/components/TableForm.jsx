import React, { useState } from 'react'

export default function TableForm({ initialValues, onSubmit, submitLabel, loading }) {
    const [form, setForm] = useState(initialValues)
    const [error, setError] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault
        setError('')
        if (form.tableNumber==='' || form.capacity === '') {
            setError('Table number and capacity are required')
            return
        }
        onSubmit({
            tableNumber: Number(form.tableNumber),
            capacity: Number(form.capacity)
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="tableNumber" placeholder='Table number' min='1' value={form.tableNumber} onChange={handleChange} />
            <input type="numbrt" name="capacity" placeholder='Seats' min='1' value={form.capacity} onChange={handleChange} />
            {error && <p>{error}</p>}
            <button type='submit' disabled={loading}>
                {loading ? 'Saving...' : submitLabel}
            </button>
        </form>
    )
}
