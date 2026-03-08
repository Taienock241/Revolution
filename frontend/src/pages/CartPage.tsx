// src/pages/CartPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Your Cart is Empty</h1>
        <Link to="/products" style={{ textDecoration: 'none', padding: '1rem 2rem', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      {items.map(item => (
        <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #dee2e6', padding: '1rem 0' }}>
          <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem' }} />
          <div style={{ flex: 1 }}>
            <h3>{item.product.name}</h3>
            <p>${item.product.price}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ padding: '0.5rem', cursor: 'pointer' }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ padding: '0.5rem', cursor: 'pointer' }}>+</button>
          </div>
          <p style={{ marginLeft: '1rem' }}>${(item.product.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.product.id)} style={{ marginLeft: '1rem', padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Remove
          </button>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
        <h2>Total: ${getTotal().toFixed(2)}</h2>
        <Link to="/checkout" style={{ textDecoration: 'none', padding: '1rem 2rem', backgroundColor: '#28a745', color: 'white', borderRadius: '4px' }}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;