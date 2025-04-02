import Link from 'next/link';
import Image from 'next/image';

export default function CategoryShowcase() {
  // Dummy categories data
  const categories = [
    {
      id: "1",
      name: "Electronics",
      imageUrl: "/assets/images/electronics.jpg",
      slug: "electronics",
      itemCount: 156
    },
    {
      id: "2",
      name: "Clothing",
      imageUrl: "/assets/images/clothing.jpg",
      slug: "clothing",
      itemCount: 243
    },
    {
      id: "3",
      name: "Home & Kitchen",
      imageUrl: "/assets/images/home-kitchen.jpg",
      slug: "home-kitchen",
      itemCount: 189
    },
    {
      id: "4",
      name: "Sports & Outdoors",
      imageUrl: "/assets/images/sports.jpg",
      slug: "sports-outdoors",
      itemCount: 112
    },
    {
      id: "5",
      name: "Beauty & Personal Care",
      imageUrl: "/assets/images/beauty.jpg",
      slug: "beauty-personal-care",
      itemCount: 98
    },
    {
      id: "6",
      name: "Toys & Games",
      imageUrl: "/assets/images/toys.jpg",
      slug: "toys-games",
      itemCount: 76
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              href={`/categories/${category.slug}`} 
              key={category.id}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden shadow-md h-40 md:h-48 transition-transform group-hover:scale-105">
                <Image 
                  src={category.imageUrl} 
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <h3 className="text-white font-medium">{category.name}</h3>
                  <span className="text-gray-200 text-sm">{category.itemCount} items</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}