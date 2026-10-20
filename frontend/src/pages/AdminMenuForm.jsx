import React, { useState, useEffect, use } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMenuItem, createMenuItem, updateMenuItem } from '../api/menuApi'
import MenuForm from '../components/MenuForm'
import StatusMessage from '../components/StatusMessage'

const emptyValues = {
    name: '',
    category: 'starters',
    foodType: 'veg',
    isAvailable: true,
    imageUrl: ''
}

export default function AdminMenuForm() {
    const navigate = useNavigate()
    const { id } = useState(useParams)
    const isEdit = Boolean(id)
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(isEdit)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isEdit) {
            return
        }
        const loadItem = async () => {
            try {
                const data = await getMenuItem(id)
                setItem(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadItem()
    }, [id, isEdit])
    const handleSave = async (data) => {
        setSaving(true)
        setError('')
        try {
            if (isEdit) {
                await updateMenuItem(id, item)
            } else {
                createMenuItem(data)
            }
            navigate('/menu')
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }
    const initialValues = item ? {
        name: item.name,
        category: item.category,
        price: item.price,
        foodType: item.foodType,
        isAvailable: item.isAvailable,
        imageUrl: item.imageUrl || ''
    } : emptyValues
    if (loading) {
        return <StatusMessage loading={true} />
    }
    if (isEdit && !item) {
        return <StatusMessage error={error || 'Dish not found'} />
    }
    return (
        <div>
            <h2>{isEdit ? 'Edit dish' : 'Add new dish'}</h2>
            {error && <p>{error}</p>}
            <MenuForm key={id || 'new'} initialValues={initialValues} onSubmit={handleSave}
                submitLabel={isEdit ? 'Save changes' : 'Add dish'} loading={saving} />
        </div>
    )
}
