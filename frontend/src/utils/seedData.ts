// src/utils/seedData.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const seedProducts = async () => {
  const products = [
    {
      name: 'Modern Portfolio Website',
      description: 'A sleek, modern portfolio website template perfect for designers and freelancers.',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Portfolio+Website',
      category: 'Portfolio',
      inStock: true,
    },
    {
      name: 'E-commerce Store Template',
      description: 'Fully responsive e-commerce website template with shopping cart functionality.',
      price: 79.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=E-commerce+Template',
      category: 'E-commerce',
      inStock: true,
    },
    {
      name: 'Blog Website Design',
      description: 'Clean and minimal blog website template with article layouts.',
      price: 39.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Blog+Website',
      category: 'Blog',
      inStock: true,
    },
    {
      name: 'Business Landing Page',
      description: 'Professional landing page template for businesses and startups.',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/300x200?text=Business+Landing',
      category: 'Landing Page',
      inStock: true,
    },
  ];

  try {
    for (const product of products) {
      await addDoc(collection(db, 'products'), product);
    }
    console.log('Sample products added successfully');
  } catch (error) {
    console.error('Error adding products:', error);
  }
};