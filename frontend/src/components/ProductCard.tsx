// src/components/ProductCard.tsx
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '1rem', margin: '1rem', maxWidth: '300px' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p style={{ fontWeight: 'bold' }}>${product.price}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          disabled={!product.inStock}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;