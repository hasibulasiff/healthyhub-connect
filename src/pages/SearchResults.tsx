import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, Star, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dummyResults = [
  {
    id: 1,
    title: "Elite Fitness Center",
    type: "Gym",
    rating: 4.8,
    reviews: 234,
    price: "$$",
    location: "Downtown, California",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    description: "State-of-the-art equipment and expert trainers"
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
    description: "Peaceful environment for mind and body wellness"
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
    description: "Multi-sport facility with professional coaching"
  }
];

const SearchResults = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">Filters</h3>
              
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
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-neutral">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <span className="text-neutral">{dummyResults.length} results found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyResults.map((result) => (
                <Link to={`/center/${result.id}`} key={result.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded-full text-sm">
                        {result.type}
                      </span>
                    </div>

                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{result.title}</span>
                        <span className="text-sm flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                          {result.rating}
                        </span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {result.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-neutral line-clamp-2">{result.description}</p>
                    </CardContent>

                    <CardFooter className="flex justify-between text-sm text-neutral">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {result.reviews} reviews
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {result.price}
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

export default SearchResults;