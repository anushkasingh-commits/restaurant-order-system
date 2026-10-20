import React from 'react'

export default function MenuItemCard({item, onAddToCart}) {
  return (
    <div className='menu-card'>
        {item.imageUrl && <img src={item.imageUrl} alt={item.name} width='200' />}
        <h3>{item.name}</h3>
        <p>
            {item.foodType === 'veg' ? 'Veg' : 'Non-veg'} . {item.category}
        </p>
        <p>₹{item.price}</p>
        {!item.isAvailable && <p>Currently unavailable</p>}
        {onAddToCart && (
            <button onClick={() => onAddToCart(item)} disabled={!item.isAvailable}>Add to cart</button>
        )}
    </div>
  )
}
