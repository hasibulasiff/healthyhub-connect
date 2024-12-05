import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Star, Users, DollarSign, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Archive = () => {
  const listings = [
    {
      id: 1,
      title: "Elite Fitness Center",
      type: "Gym",
      rating: 4.8,
      reviews: 234,
      price: "$$",
      location: "Downtown, California",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
      description: "State-of-the-art equipment and expert trainers",
      features: ["24/7 Access", "Personal Training", "Group Classes"]
    },
    {
      id: 2,
      title: "Zen Wellness Studio",
      type: "Yoga Studio",
      rating: 4.9,
      reviews: 189,
      price: "$$$",
      location: "West Side, California",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
      description: "Peaceful environment for mind and body wellness",
      features: ["Meditation", "Hot Yoga", "Workshops"]
    },
    {
      id: 3,
      title: "Power Athletics",
      type: "Sports Center",
      rating: 4.7,
      reviews: 156,
      price: "$$",
      location: "North Beach, California",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
      description: "Multi-sport facility with professional coaching",
      features: ["Swimming Pool", "Tennis Courts", "Basketball"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="gym">Gyms</SelectItem>
                      <SelectItem value="yoga">Yoga Studios</SelectItem>
                      <SelectItem value="sports">Sports Centers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Enter location" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>$</span>
                    <span>$$$$</span>
                  </div>
                  <Slider defaultValue={[2]} max={4} step={1} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Select defaultValue="4">
                    <SelectTrigger>
                      <SelectValue placeholder="Minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3+ stars</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Fitness & Wellness Directory</h1>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Link to={`/center/${listing.id}`} key={listing.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-4 right-4 bg-accent/90 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                        {listing.type}
                      </span>
                    </div>

                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{listing.title}</span>
                        <span className="text-sm flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                          {listing.rating}
                        </span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {listing.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{listing.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {listing.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {listing.reviews} reviews
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {listing.price}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Archive;