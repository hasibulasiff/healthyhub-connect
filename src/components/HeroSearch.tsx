import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (location) params.append("location", location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-[#0a0118]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')] bg-cover bg-center opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black/50 to-pink-900/50" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
      
      <div className="relative z-10 max-w-4xl w-full px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Find Your Perfect <span className="text-white">Fitness Space</span>
        </h1>
        <p className="text-white/70 text-center mb-8 text-lg">
          Discover fitness centers, wellness spaces, and sports events near you
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
            <Input
              placeholder="Search for centers, events..."
              className="pl-10 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
            <Input
              placeholder="Location"
              className="pl-10 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 transition-all duration-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSearch;