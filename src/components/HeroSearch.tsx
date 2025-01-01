import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "All Categories",
  "Gyms",
  "Yoga Studios",
  "Sports Centers",
  "Swimming Pools",
  "Fitness Classes",
  "Wellness Centers",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
];

const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (category) params.append("category", category);
    if (city) params.append("city", city);
    if (country) params.append("country", country);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#0a0118]">
      {/* Background Image with Improved Overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')] bg-cover bg-center"
        style={{ opacity: "0.15" }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/80 to-pink-900/70" />
      
      {/* Animated Background Elements with Improved Visibility */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl w-full px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Find Your Perfect
          </span>{" "}
          <span className="text-white">Fitness Space</span>
        </h1>
        <p className="text-white/90 text-center mb-12 text-lg md:text-xl font-medium">
          Discover fitness centers, wellness spaces, and sports events near you
        </p>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-[2]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
              <Input
                placeholder="Search for centers, events..."
                className="pl-10 h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 w-full md:w-[160px] bg-white/10 backdrop-blur-sm border-white/30 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12 w-full md:w-[140px] bg-white/10 backdrop-blur-sm border-white/30 text-white">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-12 w-full md:w-[140px] bg-white/10 backdrop-blur-sm border-white/30 text-white">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              type="submit" 
              className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-white font-medium"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroSearch;