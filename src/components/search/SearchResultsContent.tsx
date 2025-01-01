import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchResultCard from "./SearchResultCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 10;

export function SearchResultsContent() {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const city = searchParams.get("city") || "";
  const sortBy = searchParams.get("sort") || "recommended";

  const { data: results, isLoading, error } = useQuery({
    queryKey: ['search-results', query, category, city, sortBy, currentPage],
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

      // Transform the data
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
          sponsored: false, // You might want to add this field to your database
          amenities: [] // You might want to add this to your database
        };
      });

      return {
        items: transformedData || [],
        total: count || 0
      };
    }
  });

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading results. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  const totalPages = Math.ceil((results?.total || 0) / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <span className="text-muted-foreground">
          {results?.total || 0} results found
        </span>
      </div>

      {results?.items.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(currentPage - 1));
              window.history.pushState({}, "", `?${params.toString()}`);
            }}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("page", String(i + 1));
                window.history.pushState({}, "", `?${params.toString()}`);
              }}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", String(currentPage + 1));
              window.history.pushState({}, "", `?${params.toString()}`);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}