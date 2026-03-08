// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
        Website Photos Ecommerce
      </Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link>
        <Link to="/products" style={{ textDecoration: 'none', color: '#007bff' }}>Products</Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: '#007bff', position: 'relative' }}>
          Cart ({cartItemCount})
        </Link>
        {user ? (
          <>
            <span>Welcome, {user.displayName || user.email}</span>
            <button onClick={logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;