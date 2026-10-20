import React from 'react'

export default function StatusMessage({loading, error, empty, emptyText}) {
    if (loading) {
        return <p>Loading...</p>
    } 
    if (error) {
        return <p>{error}</p>
    }
    if (empty) {
        return <p>{emptyText || 'Nothing to show yet.'}</p>
    }
    return null
}
