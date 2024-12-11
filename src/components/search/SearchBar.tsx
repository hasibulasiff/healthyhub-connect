import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SearchBar = ({ sortBy, onSortChange }: SearchBarProps) => {
  return (
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
        <Select defaultValue={sortBy} onValueChange={onSortChange}>
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
  );
};

export default SearchBar;