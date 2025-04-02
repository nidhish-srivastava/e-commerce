import Image from 'next/image';
import Link from 'next/link';

export default function BrandsSection() {
  // Dummy brands data
  const brands = [
    {
      id: '1',
      name: 'TechPro',
      logoUrl: '/assets/images/brands/techpro.png',
      slug: 'techpro'
    },
    {
      id: '2',
      name: 'EcoStyle',
      logoUrl: '/assets/images/brands/ecostyle.png',
      slug: 'ecostyle'
    },
    {
      id: '3',
      name: 'LuxuryLine',
      logoUrl: '/assets/images/brands/luxuryline.png',
      slug: 'luxuryline'
    },
    {
      id: '4',
      name: 'SportMax',
      logoUrl: '/assets/images/brands/sportmax.png',
      slug: 'sportmax'
    },
    {
      id: '5',
      name: 'HomeComfort',
      logoUrl: '/assets/images/brands/homecomfort.png',
      slug: 'homecomfort'
    },
    {
      id: '6',
      name: 'UrbanWear',
      logoUrl: '/assets/images/brands/urbanwear.png',
      slug: 'urbanwear'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Top Brands</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <Link 
              href={`/brands/${brand.slug}`} 
              key={brand.id}
              className="flex items-center justify-center group"
            >
              <div className="relative h-20 w-full bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4 flex items-center justify-center">
                <Image 
                  src={brand.logoUrl} 
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-full max-w-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}