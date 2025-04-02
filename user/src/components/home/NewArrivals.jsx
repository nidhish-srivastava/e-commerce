"use client"
import { useState } from 'react';
import ProductCard from '@/components/products/ProductCard';

export default function NewArrivals() {
  // Dummy categories for filtering
  const categories = ["All", "Electronics", "Clothing", "Home", "Accessories"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Dummy new arrivals data
  const allProducts = [
    {
      id: '101',
      name: 'Ultra-light Running Shoes',
      category: 'Clothing',
      price: 129.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/running-shoes.jpg',
      rating: 4.6,
      inStock: true
    },
    {
      id: '102',
      name: 'Smartwatch Pro',
      category: 'Electronics',
      price: 199.99,
      discountedPrice: 179.99,
      discountPercentage: 10,
      imageUrl: '/assets/images/smartwatch.jpg',
      rating: 4.8,
      inStock: true
    },
    {
      id: '103',
      name: 'Aromatherapy Diffuser',
      category: 'Home',
      price: 49.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/diffuser.jpg',
      rating: 4.5,
      inStock: true
    },
    {
      id: '104',
      name: 'Designer Sunglasses',
      category: 'Accessories',
      price: 89.99,
      discountedPrice: 79.99,
      discountPercentage: 11,
      imageUrl: '/assets/images/sunglasses.jpg',
      rating: 4.3,
      inStock: true
    },
    {
      id: '105',
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 69.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/speaker.jpg',
      rating: 4.7,
      inStock: true
    },
    {
      id: '106',
      name: 'Scented Candle Set',
      category: 'Home',
      price: 34.99,
      discountedPrice: 29.99,
      discountPercentage: 14,
      imageUrl: '/assets/images/candles.jpg',
      rating: 4.4,
      inStock: true
    },
    {
      id: '107',
      name: 'Premium Leather Belt',
      category: 'Accessories',
      price: 45.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/belt.jpg',
      rating: 4.5,
      inStock: true
    },
    {
      id: '108',
      name: 'Casual Denim Jacket',
      category: 'Clothing',
      price: 79.99,
      discountedPrice: 69.99,
      discountPercentage: 12,
      imageUrl: '/assets/images/denim-jacket.jpg',
      rating: 4.6,
      inStock: true
    }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === "All" 
    ? allProducts
    : allProducts.filter(product => product.category === activeCategory);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">New Arrivals</h2>
        
        <div className="flex items-center justify-center mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}