import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  },
  {
    id: 4,
    title: "PowerFit Studio",
    description: "High-intensity training and CrossFit",
    location: "North Side, California",
    rating: 4.6,
    category: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 112,
  },
  {
    id: 5,
    title: "Wellness Hub",
    description: "Holistic wellness and meditation center",
    location: "South Bay, California",
    rating: 4.9,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 89,
  },
  {
    id: 6,
    title: "CrossFit Arena",
    description: "Professional CrossFit training facility",
    location: "Marina District, California",
    rating: 4.8,
    category: "CrossFit",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 167,
  },
  {
    id: 7,
    title: "Mindful Movement",
    description: "Pilates and mindful exercise studio",
    location: "Hayes Valley, California",
    rating: 4.7,
    category: "Pilates",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 143,
  },
  {
    id: 8,
    title: "Peak Performance",
    description: "Athletic training and recovery center",
    location: "Mission District, California",
    rating: 4.8,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 178,
  },
  {
    id: 9,
    title: "Urban Fitness Hub",
    description: "Modern fitness facility with expert trainers",
    location: "Richmond District, California",
    rating: 4.7,
    category: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 134,
  },
  {
    id: 10,
    title: "Serenity Wellness",
    description: "Holistic wellness and meditation center",
    location: "Pacific Heights, California",
    rating: 4.9,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 92,
  },
  {
    id: 11,
    title: "Flex Fitness Club",
    description: "24/7 access to premium equipment",
    location: "North Beach, California",
    rating: 4.6,
    category: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 167,
  },
  {
    id: 12,
    title: "Balance Studio",
    description: "Yoga and pilates fusion classes",
    location: "Russian Hill, California",
    rating: 4.8,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 145,
  },
  {
    id: 13,
    title: "Strong Athletics",
    description: "Strength training and conditioning",
    location: "SOMA, California",
    rating: 4.7,
    category: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 189,
  },
  {
    id: 14,
    title: "Mind & Body Center",
    description: "Integrated wellness programs",
    location: "Nob Hill, California",
    rating: 4.9,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 156,
  },
  {
    id: 15,
    title: "Peak Performance",
    description: "Elite training facility",
    location: "Financial District, California",
    rating: 4.8,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 201,
  },
];

const FeaturedListings = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0a0118] to-purple-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">Featured Listings</h2>
        <p className="text-white/70 text-center mb-12">Discover top-rated fitness and wellness centers near you</p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {dummyListings.map((listing) => (
              <CarouselItem key={listing.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50">
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
                  
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-sm text-white/50 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {listing.reviews} reviews
                    </span>
                    <Button variant="secondary" className="bg-purple-500/20 hover:bg-purple-500/30 text-white">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedListings;
