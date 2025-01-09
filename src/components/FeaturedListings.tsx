// Split into smaller components for better maintainability
import { ListingCard } from "./listings/ListingCard";
import { ListingCarousel } from "./listings/ListingCarousel";
import { dummyListings } from "./listings/dummyData";

const FeaturedListings = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0a0118] to-purple-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Featured Listings</h2>
        <p className="text-white/70 text-center mb-12">Discover top-rated fitness and wellness centers near you</p>
        <ListingCarousel listings={dummyListings} />
      </div>
    </section>
  );
};

export default FeaturedListings;