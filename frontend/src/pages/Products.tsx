// src/pages/Products.tsx
import React from 'react';
import ProductList from '../components/ProductList';

const Products: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Products</h1>
      <ProductList />
    </div>
  );
};

export default Products;