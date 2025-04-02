"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/products/ProductCard';
import { mockProducts,mockCategories } from '@/constants/dummyData';

export default function CategoryPage() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filterBrands, setFilterBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  const params = useParams();
  const categoryId = params.categoryId;

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {

        // Find the requested category
        const foundCategory = mockCategories.find((category)=>category.id === categoryId)
        
        if (foundCategory) {
          setCategory(foundCategory);
          
          // Filter products by category
          const categoryProducts = mockProducts.filter(p => 
            p.category.toLowerCase() === foundCategory.name.toLowerCase()
          );
          
          // Get unique brands for filters
          const brands = [...new Set(categoryProducts.map(p => p.brand))];
          setFilterBrands(brands);
          
          setProducts(categoryProducts);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryAndProducts();
    }
  }, [categoryId]);

  // Handle brand filter changes
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Handle price range changes
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  // Filter products by selected brands and price range
  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.discountedPrice >= priceRange[0] && product.discountedPrice <= priceRange[1];
    return matchesBrand && matchesPrice;
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
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // 'featured' doesn't change order
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p className="text-xl">Loading category...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg p-8 text-center shadow">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link href="/categories" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            View All Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="flex mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/categories" className="text-gray-500 hover:text-gray-700">Categories</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>
      
      {/* Category Banner */}
      <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={category.bannerUrl || category.imageUrl}
          alt={category.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-white/80 max-w-2xl">{category.description}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 mb-6">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-semibold mb-4">Price Range</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <div className="flex gap-4">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[0]} 
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full"
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  min="0" 
                  max={priceRange[1]} 
                  value={priceRange[0]} 
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full border rounded p-1 text-sm"
                />
                <span className="self-center">-</span>
                <input 
                  type="number" 
                  min={priceRange[0]} 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full border rounded p-1 text-sm"
                />
              </div>
            </div>
          </div>
          
          {filterBrands.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Brands</h2>
              <div className="space-y-2">
                {filterBrands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      className="mr-2"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <label htmlFor={`brand-${brand}`}>{brand}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} in {category.name}
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
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-xl text-gray-600 mb-4">No products found.</p>
              <p className="text-gray-500">Try adjusting your filters.</p>
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