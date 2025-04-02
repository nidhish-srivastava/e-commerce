"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.productId;
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, you would fetch from your API with the productId
        // This is mock data for demonstration
        const mockProducts = [
          {
            id: '1',
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: 129.99,
            discountPercentage: 15,
            discountedPrice: 110.49,
            imageUrl: '/images/headphones.jpg',
            description: 'High-quality wireless headphones with noise cancellation features.',
            detailedDescription: 'Experience crystal-clear sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones allow you to immerse yourself in your music without any distractions. With comfortable ear cups and an adjustable headband, you can enjoy hours of listening in complete comfort.',
            rating: 4.5,
            reviewCount: 128,
            stock: 25,
            features: ['Noise cancellation', 'Bluetooth 5.0', '30-hour battery life'],
            specifications: {
              'Battery Life': '30 hours',
              'Connectivity': 'Bluetooth 5.0',
              'Weight': '250g',
              'Color Options': 'Black, White, Blue',
              'Warranty': '1 year'
            },
            galleryImages: [
              '/images/headphones-1.jpg',
              '/images/headphones-2.jpg',
              '/images/headphones-3.jpg',
            ]
          },
          {
            id: '2',
            name: 'Smart Watch',
            category: 'Electronics',
            price: 199.99,
            discountPercentage: 0,
            discountedPrice: 199.99,
            imageUrl: '/images/smartwatch.jpg',
            description: 'Track your fitness and stay connected with this premium smartwatch.',
            detailedDescription: 'This advanced smartwatch helps you track your fitness goals while keeping you connected throughout the day. With heart rate monitoring, GPS tracking, and smartphone notifications, you\'ll never miss a beat. The water-resistant design means you can wear it during your workouts without worry.',
            rating: 4.2,
            reviewCount: 94,
            stock: 18,
            features: ['Heart rate monitor', 'GPS', 'Water resistant'],
            specifications: {
              'Battery Life': '3 days',
              'Connectivity': 'Bluetooth 5.0, WiFi',
              'Water Resistance': '5 ATM',
              'Display': '1.4 inch AMOLED',
              'Warranty': '2 years'
            },
            galleryImages: [
              '/images/smartwatch-1.jpg',
              '/images/smartwatch-2.jpg',
              '/images/smartwatch-3.jpg',
            ]
          },
          // Add more mock products here
        ];

        // Find the requested product
        const foundProduct = mockProducts.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Find related products (same category)
          const related = mockProducts
            .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p className="text-xl">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg p-8 text-center shadow">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href={`/products?category=${product.category}`} className="text-gray-500 hover:text-gray-700">
          {product.category}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>
      
      {/* Product main section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 rounded-lg">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover object-center w-full h-full"
              />
            </div>
            
            {product.galleryImages && (
              <div className="grid grid-cols-3 gap-2">
                {product.galleryImages.map((img, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden bg-gray-100 rounded">
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover object-center w-full h-full cursor-pointer hover:opacity-75"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-4">{product.category}</p>
              
              <div className="flex items-center mb-4">
                {/* Star rating */}
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              
              {/* Price */}
              <div className="flex items-center mt-4 mb-6">
                {product.discountPercentage > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">${product.discountedPrice.toFixed(2)}</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-3 bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex items-center mb-6">
                <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} text-sm font-medium`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
              
              {/* Key features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Quantity selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity} 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={incrementQuantity} 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to cart button */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 px-6 py-3 rounded-md font-medium text-white 
                    ${product.stock > 0 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  Add to Cart
                </button>
                <button className="p-3 rounded-md border border-gray-300 hover:bg-gray-50">
                  ♡
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for additional information */}
        <div className="border-t border-gray-200 mt-8">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                selectedTab === 'description'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('description')}
            >
              Description
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                selectedTab === 'specifications'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                selectedTab === 'reviews'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('reviews')}
            >
              Reviews
            </button>
          </div>
          
          <div className="p-6">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <p>{product.detailedDescription || product.description}</p>
              </div>
            )}
            
            {selectedTab === 'specifications' && (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{value}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-3 px-4 text-sm text-gray-500" colSpan="2">
                          No specifications available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-medium">
                    {product.rating} out of 5
                  </span>
                </div>
                <p className="text-gray-600">
                  Based on {product.reviewCount} reviews
                </p>
                
                <div className="mt-6">
                  <p className="text-gray-600">Reviews will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}