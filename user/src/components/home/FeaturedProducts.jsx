import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const products = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 99.99,
      discountedPrice: 79.99,
      discountPercentage: 20,
      imageUrl: '/assets/images/headphones.jpg',
      rating: 4.5,
      inStock: true
    },
    {
      id: '2',
      name: 'Premium Leather Wallet',
      category: 'Accessories',
      price: 49.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/wallet.jpg',
      rating: 4.8,
      inStock: true
    },
    {
      id: '3',
      name: 'Smart Fitness Tracker',
      category: 'Electronics',
      price: 129.99,
      discountedPrice: 99.99,
      discountPercentage: 23,
      imageUrl: '/assets/images/fitness-tracker.jpg',
      rating: 4.2,
      inStock: true
    },
    {
      id: '4',
      name: 'Cotton Graphic T-Shirt',
      category: 'Clothing',
      price: 24.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/tshirt.jpg',
      rating: 4.0,
      inStock: true
    },
    {
      id: '5',
      name: 'Stainless Steel Water Bottle',
      category: 'Lifestyle',
      price: 34.99,
      discountedPrice: 29.99,
      discountPercentage: 14,
      imageUrl: '/assets/images/water-bottle.jpg',
      rating: 4.7,
      inStock: true
    },
    {
      id: '6',
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 149.99,
      discountedPrice: null,
      discountPercentage: 0,
      imageUrl: '/assets/images/keyboard.jpg',
      rating: 4.9,
      inStock: false
    },
    {
      id: '7',
      name: 'Ceramic Coffee Mug',
      category: 'Home & Kitchen',
      price: 19.99,
      discountedPrice: 14.99,
      discountPercentage: 25,
      imageUrl: '/assets/images/coffee-mug.jpg',
      rating: 4.3,
      inStock: true
    },
    {
      id: '8',
      name: 'Wireless Charging Pad',
      category: 'Electronics',
      price: 39.99,
      discountedPrice: 34.99,
      discountPercentage: 12,
      imageUrl: '/assets/images/charging-pad.jpg',
      rating: 4.4,
      inStock: true
    }
  ];
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <a href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}