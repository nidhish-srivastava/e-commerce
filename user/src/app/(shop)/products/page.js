"use client"
import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { useSearchParams } from 'next/navigation';
import { mockProducts } from '@/constants/dummyData';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const categoryFromUrl = searchParams.get('category') || 'all';

  useEffect(() => {
    // Set the category from URL when it changes
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API
        // This is mock data for demonstration
        

        // Extract unique categories
        const uniqueCategories = [...new Set(mockProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.discountedPrice - b.discountedPrice;
      case 'price-high':
        return b.discountedPrice - a.discountedPrice;
      case 'discount':
        return b.discountPercentage - a.discountPercentage;
      default:
        return 0; // 'featured' doesn't change order
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
      
      {/* Search bar - Next.js will handle the routing */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-lg">
            Search results for: <span className="font-medium">{searchQuery}</span>
          </p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="category"
                  className="mr-2"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                />
                <label htmlFor="all">All Categories</label>
              </div>
              
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    className="mr-2"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
              <select
                id="sort"
                className="border rounded-md px-2 py-1"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="grid place-items-center h-64">
              <p className="text-xl text-gray-600">Loading products...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-xl text-gray-600 mb-4">No products found.</p>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}