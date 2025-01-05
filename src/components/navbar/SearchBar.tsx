import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  return (
    <div className="hidden md:flex items-center gap-2 max-w-xl w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search for gyms, studios, centers..." 
          className="pl-10 bg-white/5"
        />
      </div>
      <Button variant="outline" className="gap-2 bg-white/5">
        <MapPin className="h-4 w-4" />
        Location
      </Button>
    </div>
  );
};