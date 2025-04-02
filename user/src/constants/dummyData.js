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
      rating: 4.5,
      stock: 25,
      features: ['Noise cancellation', 'Bluetooth 5.0', '30-hour battery life'],
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
      rating: 4.2,
      stock: 18,
      features: ['Heart rate monitor', 'GPS', 'Water resistant'],
    },
    {
      id: '3',
      name: 'Leather Backpack',
      category: 'Fashion',
      price: 89.99,
      discountPercentage: 20,
      discountedPrice: 71.99,
      imageUrl: '/images/backpack.jpg',
      description: 'Stylish leather backpack perfect for work or travel.',
      rating: 4.7,
      stock: 12,
      features: ['Genuine leather', 'Laptop compartment', 'Water resistant'],
    },
    {
      id: '4',
      name: 'Coffee Maker',
      category: 'Home',
      price: 149.99,
      discountPercentage: 10,
      discountedPrice: 134.99,
      imageUrl: '/images/coffeemaker.jpg',
      description: 'Programmable coffee maker with built-in grinder.',
      rating: 4.3,
      stock: 15,
      features: ['Built-in grinder', 'Programmable timer', '12-cup capacity'],
    },
    {
      id: '5',
      name: 'Yoga Mat',
      category: 'Sports',
      price: 49.99,
      discountPercentage: 0,
      discountedPrice: 49.99,
      imageUrl: '/images/yogamat.jpg',
      description: 'Non-slip yoga mat made from eco-friendly materials.',
      rating: 4.8,
      stock: 30,
      features: ['Eco-friendly', 'Non-slip surface', 'Extra thick padding'],
    },
    {
      id: '6',
      name: 'Modern Desk Lamp',
      category: 'Home',
      price: 79.99,
      discountPercentage: 25,
      discountedPrice: 59.99,
      imageUrl: '/images/lamp.jpg',
      description: 'Adjustable LED desk lamp with wireless charging base.',
      rating: 4.6,
      stock: 8,
      features: ['LED bulbs', 'Wireless charging', 'Adjustable brightness'],
    },
  ];

  const mockCategories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Smartphones, laptops, audio devices, and more electronic gadgets.',
      imageUrl: '/images/electronics-category.jpg',
      productCount: 42,
      featured: true
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Clothing, shoes, accessories, and jewelry for all styles.',
      imageUrl: '/images/fashion-category.jpg',
      productCount: 78,
      featured: true
    },
    {
      id: 'home',
      name: 'Home',
      description: 'Furniture, decor, kitchenware, and everything for your living space.',
      imageUrl: '/images/home-category.jpg',
      productCount: 53,
      featured: true
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'Equipment, apparel, and accessories for all types of sports and fitness.',
      imageUrl: '/images/sports-category.jpg',
      productCount: 36,
      featured: false
    },
    {
      id: 'books',
      name: 'Books',
      description: 'Fiction, non-fiction, textbooks, and more for all readers.',
      imageUrl: '/images/books-category.jpg',
      productCount: 91,
      featured: false
    },
    {
      id: 'beauty',
      name: 'Beauty',
      description: 'Skincare, makeup, fragrances, and personal care products.',
      imageUrl: '/images/beauty-category.jpg',
      productCount: 64,
      featured: false
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      description: 'Entertainment for all ages - from board games to action figures.',
      imageUrl: '/images/toys-category.jpg',
      productCount: 47,
      featured: false
    },
    {
      id: 'grocery',
      name: 'Grocery',
      description: 'Food, beverages, and pantry essentials for your kitchen.',
      imageUrl: '/images/grocery-category.jpg',
      productCount: 112,
      featured: false
    }
  ];

export {mockProducts,mockCategories}  