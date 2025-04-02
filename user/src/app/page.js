import BrandsSection from "@/components/home/BrandsSection"
import CategoryShowcase from "@/components/home/CategoryShowcase"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import HeroBanner from "@/components/home/HeroBanner"
import NewArrivals from "@/components/home/NewArrivals"
import NewsletterSection from "@/components/home/Newsletter"
import SpecialOffers from "@/components/home/SpecialOffers"

function Home() {
  return (
    <main className="min-h-screen flex flex-col">

      <HeroBanner />
      <CategoryShowcase />
      <FeaturedProducts />
      <SpecialOffers />
      <NewArrivals />
      <BrandsSection />
      <NewsletterSection />
    </main>
  )
}

export default Home