import Image from 'next/image';
import Link from 'next/link';

export default function SpecialOffers() {
  // Dummy offers data
  const offers = [
    {
      id: "1",
      title: "Flash Sale",
      description: "Up to 50% off on selected items",
      imageUrl: "/assets/images/flash-sale.jpg",
      buttonText: "Shop Sale",
      link: "/promotions/flash-sale",
      endDate: "2025-04-15T00:00:00Z"
    },
    {
      id: "2",
      title: "Free Shipping",
      description: "On orders over $50",
      imageUrl: "/assets/images/free-shipping.jpg",
      buttonText: "Learn More",
      link: "/promotions/free-shipping",
      endDate: null
    },
    {
      id: "3",
      title: "Bundle & Save",
      description: "Buy 2 get 1 free on accessories",
      imageUrl: "/assets/images/bundle-save.jpg",
      buttonText: "Shop Bundles",
      link: "/promotions/bundles",
      endDate: "2025-04-30T00:00:00Z"
    }
  ];

  // Function to calculate time remaining
  const getTimeRemaining = (endDateStr) => {
    if (!endDateStr) return null;
    const endDate = new Date(endDateStr);
    const now = new Date();
    const totalSeconds = Math.floor((endDate - now) / 1000);
    
    if (totalSeconds <= 0) return null;
    
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    
    return { days, hours };
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Special Offers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const timeRemaining = getTimeRemaining(offer.endDate);
            
            return (
              <div 
                key={offer.id} 
                className="rounded-xl overflow-hidden shadow-lg border border-gray-200 group"
              >
                <div className="relative h-56">
                  <Image 
                    src={offer.imageUrl} 
                    alt={offer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  
                  {timeRemaining && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center justify-center space-x-2">
                      <span className="font-semibold">Ends in:</span>
                      <span>{timeRemaining.days} days, {timeRemaining.hours} hours</span>
                    </div>
                  )}
                  
                  <Link 
                    href={offer.link} 
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {offer.buttonText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}