import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";

// Mock data for demonstration
const dummyResults = [
  {
    id: 1,
    title: "Elite Fitness Center",
    type: "Gym",
    sponsored: true,
    rating: 4.8,
    reviews: 234,
    price: "$$",
    location: "Downtown, California",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    description: "State-of-the-art equipment and expert trainers",
    amenities: ["Parking", "Showers", "Pool", "Personal Training"],
    features: ["Women Only", "Free Trial"],
    openNow: true
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

const SearchResultsPage = () => {
  const [sortBy, setSortBy] = useState("recommended");

  const handleRequestInfo = (listingId: number) => {
    toast.success("Request sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 mt-16">
        <SearchBar sortBy={sortBy} onSortChange={setSortBy} />

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <span className="text-muted-foreground">{dummyResults.length} results found</span>
            </div>

            <div className="space-y-6">
              {dummyResults.map((result) => (
                <Link to={`/center/${result.id}`} key={result.id}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-64 h-48 relative overflow-hidden">
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                        {result.sponsored && (
                          <Badge className="absolute top-2 left-2 bg-accent text-white">
                            Sponsored
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{result.title}</h3>
                            <p className="text-muted-foreground text-sm">{result.type}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                            <span className="font-semibold">{result.rating}</span>
                            <span className="text-muted-foreground">({result.reviews})</span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <p className="text-muted-foreground">{result.description}</p>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {result.location}
                          </div>

                          <div className="flex gap-2 mt-2">
                            {result.amenities?.map((amenity, index) => (
                              <Badge key={index} variant="secondary">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex gap-4">
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                          </div>
                          <Button onClick={() => handleRequestInfo(result.id)}>
                            Request Information
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Map Sidebar */}
          <aside className="w-96 shrink-0">
            <Card className="sticky top-24">
              <div className="h-[calc(100vh-200px)] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map will be implemented here</p>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SearchResultsPage;