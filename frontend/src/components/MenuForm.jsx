import React, { useState } from 'react'

export default function MenuForm({ initialValues, onSubmit, submitLabel, loading }) {
    const [form, setForm] = useState(initialValues)
    const [error, setError] = useState('')
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    }
    const handleSubmit = (e) => {
        e.preventDefault
        setError('')
        if (!form.name || form.price === '') {
            setError('Name and preice are required')
            return
        }
        onSubmit({
            name: form.name,
            category: form.category,
            price: Number(form.price),
            foodType: form.foodType,
            isAvailable: form.isAvailable,
            imageUrl: form.imageUrl
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder='Dish name' value={form.value} onChange={handleChange} />
            <select name="category" value={form.category} onChange={handleChange}>
                <option value="starters">Starters</option>
                <option value="main-course">Main course</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
            </select>
            <input type="numbrt" name="price" placeholder='Price' min='0' value={form.price} onChange={handleChange} />
            <select name="foodType" value={form.foodType} onChange={handleChange}>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-veg</option>
            </select>
            <label>
                <input type="checkbox" name="isAvailable" value={form.isAvailable} onChange={handleChange} />Available
            </label>
            <input type="text" name="imageUrl" placeholder='Image URL' value={form.imageUrl} onChange={handleChange} />
            {error && <p>{error}</p>}
            <button type='submit' disabled={loading}>
                {loading ? 'Saving...' : submitLabel}
            </button>
        </form>
    )
}
