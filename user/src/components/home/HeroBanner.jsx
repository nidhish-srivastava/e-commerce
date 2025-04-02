import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  // Dummy banner data
  const bannerData = {
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends and exclusive deals",
    buttonText: "Shop Now",
    buttonLink: "/products/summer-collection",
    imageUrl: "/assets/images/hero-banner.jpg"
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={bannerData.imageUrl}
          alt="Summer Collection Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-lg text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{bannerData.title}</h1>
          <p className="text-xl mb-8">{bannerData.subtitle}</p>
          <Link 
            href={bannerData.buttonLink} 
            className="bg-white text-black hover:bg-gray-100 py-3 px-8 rounded-md text-lg font-semibold inline-block transition-colors"
          >
            {bannerData.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}