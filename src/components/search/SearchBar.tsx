import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types/database";

interface SearchBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}

interface SearchState {
  query: string;
  location: string;
  sortBy: string;
  [key: string]: any;
}

const SearchBar = ({ sortBy, onSortChange, initialQuery = "", initialLocation = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const { user } = useAuth();

  // Load last search from profile
  useEffect(() => {
    const loadLastSearch = async () => {
      if (!user) return;

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('last_search')
          .eq('id', user.id)
          .single();

        if (profile?.last_search) {
          const lastSearch = profile.last_search as SearchState;
          setSearchQuery(lastSearch.query || "");
          setLocation(lastSearch.location || "");
          if (lastSearch.sortBy) {
            onSortChange(lastSearch.sortBy);
          }
        }
      } catch (error) {
        console.error('Error loading last search:', error);
      }
    };

    loadLastSearch();
  }, [user]);

  // Save search state to profile
  useEffect(() => {
    const saveSearchState = async () => {
      if (!user) return;

      try {
        const searchState: SearchState = {
          query: searchQuery,
          location,
          sortBy
        };

        await supabase
          .from('profiles')
          .update({
            last_search: searchState as Json
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error saving search state:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      saveSearchState();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, location, sortBy]);

  return (
    <div className="mb-8 p-4 rounded-lg glass-effect">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for gyms, classes, events..." 
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-64">
          <Input 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location" 
          />
        </div>
        <Select defaultValue={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviewed</SelectItem>
            <SelectItem value="distance">Nearest</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary" className="w-full md:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;