"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockCategories } from '@/constants/dummyData';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // In a real app, you would fetch from your API
        // This is mock data for demonstration
        setCategories(mockCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Separate featured categories
  const featuredCategories = categories.filter(category => category.featured);
  const otherCategories = categories.filter(category => !category.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Categories</h1>
      <p className="text-gray-600 mb-8">Browse our wide selection of products by category</p>

      {loading ? (
        <div className="grid place-items-center h-64">
          <p className="text-xl text-gray-600">Loading categories...</p>
        </div>
      ) : (
        <>
          {/* Featured Categories */}
          {featuredCategories.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {featuredCategories.map((category) => (
                  <Link 
                    href={`/categories/${category.id}`} 
                    key={category.id}
                    className="group"
                  >
                    <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                        <p className="text-white/80 text-sm">{category.productCount} products</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* All Categories */}
          <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                href={`/categories/${category.id}`} 
                key={category.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-40 relative overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 flex-1">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{category.productCount} products</span>
                    <span className="text-blue-600 text-sm">View all →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}