import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dummyListings = [
  {
    id: 1,
    title: "FitZone Gym",
    description: "Modern gym with state-of-the-art equipment",
    location: "Downtown, California",
    rating: 4.8,
    category: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 128,
  },
  {
    id: 2,
    title: "Zen Yoga Studio",
    description: "Peaceful yoga sessions for all levels",
    location: "West Side, California",
    rating: 4.9,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 95,
  },
  {
    id: 3,
    title: "Elite Sports Center",
    description: "Multi-sport facility for athletes",
    location: "Eastside, California",
    rating: 4.7,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 156,
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0a0118] to-purple-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Featured Listings</h2>
        <p className="text-white/70 text-center mb-12">Discover top-rated fitness and wellness centers near you</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyListings.map((listing) => (
            <Card key={listing.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600">
                  {listing.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="flex justify-between items-start text-white">
                  <span className="group-hover:text-purple-400 transition-colors">{listing.title}</span>
                  <span className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                    {listing.rating}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-white/70">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-white/70">{listing.description}</p>
              </CardContent>
              
              <CardFooter className="text-sm text-white/50">
                <Users className="w-4 h-4 mr-1" />
                {listing.reviews} reviews
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;