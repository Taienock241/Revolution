// src/pages/Home.tsx
import React from 'react';
import ProductList from '../components/ProductList';
import { seedProducts } from '../utils/seedData';

const Home: React.FC = () => {
  const handleSeed = async () => {
    await seedProducts();
    alert('Sample data seeded!');
    window.location.reload();
  };

  return (
    <div>
      <section style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#e9ecef' }}>
        <h1>Welcome to Website Photos Ecommerce</h1>
        <p>Discover and purchase stunning website designs and templates.</p>
        <button onClick={handleSeed} style={{ padding: '0.5rem 1rem', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Seed Sample Data (Dev Only)
        </button>
      </section>
      <section style={{ padding: '2rem' }}>
        <h2>Featured Products</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default Home;