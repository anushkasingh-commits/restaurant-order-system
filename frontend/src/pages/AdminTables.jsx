import React, { useState, useEffect, use } from 'react'
import { getTables, createTable, updateTable, deleteTable } from '../api/tableApi'
import TableForm from '../components/TableForm'
import StatusMessage from '../components/StatusMessage'

export default function AdminTables() {
    const [tables, setTables] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [editingId, setEditingId] = useState(null)

    const loadTables = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await getTables()
            setTables(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadTables()
    }, [])
    const handleSave = async (data) => {
        setSaving(true)
        setError('')
        try {
            if (editingId) {
                await updateTable(editingId, data)
            } else {
                await createTable(data)
            }
            setEditingId(null)
            await loadTables()
        }
        catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this table?')) {
            return
        }
        setError('')
        try {
            await deleteTable(id)
            await loadTables()
        } catch (err) {
            setError(err.message)
        }
    }
    const editingTable = tables.find((table) => table._id === editingId)
    const initialValues = editingTable ?
        { tableNumber: editingTable.tableNumber, capacity: editingTable.capacity } : { tableNumber: '', capacity: '' }
    return (
        <div>
            <h2>Tables</h2>
            {error && <p>{error}</p>}
            <h3>{editingId ? 'Edit table' : 'Add table'}</h3>
            <TableForm key={editingId || 'new'} initialValues={initialValues}
                onSubmit={handleSave} submitLabel={editingId ? 'Save changes' : 'Add table'} loading={saving} />
            {editingId && (
                <button onClick={() => setEditingId(ull)}>Cancel edit</button>
            )}
            <h3>All tables</h3>
            <StatusMessage loading={loading} empty={!loading && tables.length === 0} emptyText='No tables yet.' />
            {!loading && tables.map((table) => (
                <div key={table._id}>
                    <p>Table {table.tableNumber} . seats {table.capacity}</p>
                    <button onClick={() => setEditingId(table._id)}>Edit</button>
                    <button onClick={() => handleDelete(table._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}
