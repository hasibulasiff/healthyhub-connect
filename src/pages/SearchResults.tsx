import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResultCard from "@/components/search/SearchResultCard";
import MapView from "@/components/search/MapView";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ITEMS_PER_PAGE = 10;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "recommended");

  // Get search parameters
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const city = searchParams.get("city") || "";
  const country = searchParams.get("country") || "";

  const { data: results, isLoading } = useQuery({
    queryKey: ['search-results', query, category, city, country, sortBy, currentPage],
    queryFn: async () => {
      let queryBuilder = supabase
        .from('centers')
        .select(`
          *,
          reviews (
            rating,
            id
          )
        `);

      if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
      }
      if (category) {
        queryBuilder = queryBuilder.eq('type', category.toLowerCase());
      }
      if (city) {
        queryBuilder = queryBuilder.ilike('location', `%${city}%`);
      }

      // Add pagination
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      queryBuilder = queryBuilder
        .range(start, start + ITEMS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      const { data, error, count } = await queryBuilder;

      if (error) throw error;

      // Transform the data to match SearchResultCard props
      const transformedData = data?.map(center => {
        const avgRating = center.reviews?.length 
          ? center.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / center.reviews.length 
          : undefined;

        return {
          id: center.id,
          name: center.name,
          type: center.type || 'Fitness Center',
          location: center.location,
          description: center.description,
          rating: avgRating,
          reviews: center.reviews?.length,
          // You might want to add these fields to your database later
          sponsored: false,
          amenities: []
        };
      });

      return {
        items: transformedData || [],
        total: count || 0
      };
    }
  });

  const totalPages = Math.ceil((results?.total || 0) / ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const params = new URLSearchParams(searchParams);
    
    params.set("q", formData.get("search") as string);
    setSearchParams(params);
    setCurrentPage(1);
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
    setSearchParams(params);
    setCurrentPage(1);
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
        </form>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 shrink-0">
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <span className="text-muted-foreground">
                {results?.total || 0} results found
              </span>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div>Loading...</div>
              ) : results?.items.map((result) => (
                <SearchResultCard key={result.id} result={result} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
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
};

export default SearchResults;