import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, Star, Users, DollarSign, Clock, Car, Shower, 
  Pool, UserPlus, Female, Award, Phone, Mail, Search,
  ChevronDown, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

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

const SearchResults = () => {
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [searchAsMapMoves, setSearchAsMapMoves] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  const handleRequestInfo = (listingId: number) => {
    toast.success("Request sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Top Search Bar */}
        <div className="mb-8 p-4 rounded-lg glass-effect">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search for gyms, classes, events..." 
                className="pl-10"
              />
            </div>
            <div className="w-64">
              <Input placeholder="Location" />
            </div>
            <Select defaultValue={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 shrink-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="flex gap-2">
                    {['$', '$$', '$$$', '$$$$'].map((price) => (
                      <Button
                        key={price}
                        variant={priceRange.includes(price) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setPriceRange(prev => 
                            prev.includes(price) 
                              ? prev.filter(p => p !== price)
                              : [...prev, price]
                          );
                        }}
                      >
                        {price}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Facility Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Facility Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gym">Gyms</SelectItem>
                      <SelectItem value="studio">Fitness Studios</SelectItem>
                      <SelectItem value="sports">Sports Centers</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amenities</label>
                  <div className="space-y-2">
                    {[
                      { id: 'parking', label: 'Parking', icon: Car },
                      { id: 'showers', label: 'Showers', icon: Shower },
                      { id: 'pool', label: 'Pool', icon: Pool },
                      { id: 'trainers', label: 'Personal Trainers', icon: UserPlus },
                    ].map(({ id, label, icon: Icon }) => (
                      <div key={id} className="flex items-center space-x-2">
                        <Checkbox
                          id={id}
                          checked={amenities.includes(id)}
                          onCheckedChange={(checked) => {
                            setAmenities(prev =>
                              checked
                                ? [...prev, id]
                                : prev.filter(a => a !== id)
                            );
                          }}
                        />
                        <label
                          htmlFor={id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {label}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Features */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Features</label>
                  <div className="space-y-2">
                    {[
                      { id: 'women-only', label: 'Women Only', icon: Female },
                      { id: 'free-trial', label: 'Free Trial', icon: Award },
                      { id: 'kid-friendly', label: 'Kid Friendly', icon: Users },
                      { id: 'group-discount', label: 'Group Discount', icon: Users },
                    ].map(({ id, label, icon: Icon }) => (
                      <div key={id} className="flex items-center space-x-2">
                        <Checkbox
                          id={id}
                          checked={features.includes(id)}
                          onCheckedChange={(checked) => {
                            setFeatures(prev =>
                              checked
                                ? [...prev, id]
                                : prev.filter(f => f !== id)
                            );
                          }}
                        />
                        <label
                          htmlFor={id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {label}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="open-now"
                    checked={isOpenNow}
                    onCheckedChange={setIsOpenNow}
                  />
                  <label
                    htmlFor="open-now"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Open Now
                    </div>
                  </label>
                </div>

                {/* Distance Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Distance</label>
                  <Slider
                    defaultValue={[5]}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0 km</span>
                    <span>50 km</span>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
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
                            {result.amenities.map((amenity, index) => (
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
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Map View</CardTitle>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="search-as-map-moves"
                      checked={searchAsMapMoves}
                      onCheckedChange={setSearchAsMapMoves}
                    />
                    <label
                      htmlFor="search-as-map-moves"
                      className="text-sm font-medium"
                    >
                      Search as map moves
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[calc(100vh-200px)] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
