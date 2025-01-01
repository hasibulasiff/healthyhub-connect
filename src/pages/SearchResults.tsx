import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import { SearchResultsContent } from "@/components/search/SearchResultsContent";
import MapView from "@/components/search/MapView";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const city = searchParams.get("city") || "";
  const sortBy = searchParams.get("sort") || "recommended";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const params = new URLSearchParams(searchParams);
    
    params.set("q", formData.get("search") as string);
    params.set("city", formData.get("location") as string);
    params.delete("page"); // Reset to first page on new search
    setSearchParams(params);
  };

  const handleFiltersChange = (filters: any) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });
    params.delete("page"); // Reset to first page on filter change
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8 p-4 rounded-lg glass-effect">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                name="search"
                defaultValue={query}
                placeholder="Search for gyms, classes, events..." 
                className="pl-10"
              />
            </div>
            <div className="w-64">
              <Input 
                name="location"
                defaultValue={city}
                placeholder="Location" 
              />
            </div>
            <Select defaultValue={sortBy} onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);
              params.set("sort", value);
              setSearchParams(params);
            }}>
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
        </form>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 shrink-0">
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <SearchResultsContent />
          </div>

          {/* Map Sidebar */}
          <aside className="w-96 shrink-0">
            <MapView 
              onSearchAsMapMovesChange={(value) => {
                const params = new URLSearchParams(searchParams);
                params.set("searchAsMapMoves", value.toString());
                setSearchParams(params);
              }} 
            />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}