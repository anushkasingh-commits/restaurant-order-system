import React, {useState, useEffect} from "react";
import { getMenuItem } from '../api/menuApi'
import MenuItemCard from '../components/MenuItemCard'

export default function Menu({onAddToCart}) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [foodType, setFoodType] = useState('')
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() =>{
        const loadMenu = async()=>{
            setLoading(true)
            setError('')

            try{
                const data = await getMenuItem({search, category, foodType})
                setItems(data)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadMenu()
    }, [search, category, foodType])
  return (
    <div>
        <h2>Menu</h2>
        <div>
            <input type="text" placeholder="Search dishes" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All categories</option>
                <option value="starters">Starters</option>
                <option value="main-course">Main course</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
            </select>
            <label>
                <input type="checkbox" checked={foodType==='veg'} onChange={(e) => setFoodType(e.target.checked ? 'veg' : '')} />
                Veg only
            </label>
        </div>
        {loading && <p>Loading menu...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && items.length===0 && <p>No dishes found.</p>}
        <div className="menu-grid">
            {items.map((item) => (
                <MenuItemCard key={item._id} item={item} onAddToCart={onAddToCart} />
            ))}
        </div>
    </div>
  )
}
