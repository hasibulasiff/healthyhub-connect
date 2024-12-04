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
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Listings</h2>
        <p className="text-neutral text-center mb-12">Discover top-rated fitness and wellness centers near you</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-white">
                  {listing.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{listing.title}</span>
                  <span className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                    {listing.rating}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-neutral" />
                  {listing.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-neutral">{listing.description}</p>
              </CardContent>
              
              <CardFooter className="text-sm text-neutral">
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