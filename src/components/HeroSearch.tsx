import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSearch = () => {
  return (
    <div className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-10 max-w-4xl w-full px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Find Your Perfect <span className="text-primary">Fitness Space</span>
        </h1>
        <p className="text-neutral text-center mb-8 text-lg">
          Discover fitness centers, wellness spaces, and sports events near you
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral" size={20} />
            <Input
              placeholder="Search for centers, events..."
              className="pl-10 h-12 bg-white/90 backdrop-blur-sm"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral" size={20} />
            <Input
              placeholder="Location"
              className="pl-10 h-12 bg-white/90 backdrop-blur-sm"
            />
          </div>
          <Button className="h-12 px-8 bg-accent hover:bg-accent/90">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;