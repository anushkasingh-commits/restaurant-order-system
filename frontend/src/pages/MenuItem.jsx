import React, {use, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { getMenuItem } from '../api/menuApi'
import MenuItemCard from '../components/MenuItemCard'

export default function MenuItem({onAddToCart}) {
    const {id} = useParams()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadItem = async () => {
            setLoading(true)
            setError('')
            try{
                const data = await getMenuItem(id)
                setItem(data)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadItem()
    }, [id])
    if (loading) {
        return <p>Loading dishes...</p>
    }
    if (error) {
        return(
            <div>
                <p>{error}</p>
                <Link to='/menu'>Back to menu</Link>
            </div>
        )
    }
  return (
    <div>
        <Link to='/menu'>Back to menu</Link>
        <MenuItemCard item={item} onAddToCart={onAddToCart} />
    </div>
  )
}
