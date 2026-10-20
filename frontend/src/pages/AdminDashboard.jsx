import React, { useState, useEffect } from 'react'
import { getDashboard } from '../api/dashboardApi'
import StatusMessage from '../components/StatusMessage'

export default function AdminDashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const result = await getDashboard()
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadDashboard()
    }, [])
    if (loading || error) {
        return (
            <div>
                <h2>Dashboard</h2>
                <StatusMessage loading={loading} error={error} />
            </div>
        )
    }
    const categories = Object.entries(data?.categorySale || {})
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Showing today: {new Date(data.date).toLocaleDateString()}</p>
            <div>
                <h3>Orders today</h3>
                <p>{data.ordersToday}</p>
            </div>
            <div>
                <h3>Revenue today</h3>
                <p>₹{data.revenueToday}</p>
            </div>
            <div>
                <h3>Top 5 selling items</h3>
                {data.topItems.length === 0 && <p>No sales yet today.</p>}
                <ol>
                    {data.topItems.map((item) => {
                        <li key={item.name}>
                            {item.name} ({item.quantity} sold)
                        </li>
                    })}
                </ol>
            </div>
            <div>
                <h3>Category-wise sales</h3>
                {categories.length === 0 && <p>No sales yet today.</p>}
                <ul>
                    {categories.map(([category, total]) => (
                        <li key={category}>
                            {category} : ₹{total}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
