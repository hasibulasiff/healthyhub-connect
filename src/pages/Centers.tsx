import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Filter } from "lucide-react";
import CenterCard from "@/components/centers/CenterCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/components/events/types";

const Centers = () => {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedType, setSelectedType] = useState("");

  const { data: centers, isLoading } = useQuery({
    queryKey: ['centers', search, priceRange, selectedType],
    queryFn: async () => {
      let query = supabase
        .from('centers')
        .select(`
          *,
          reviews (
            rating
          )
        `);

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      if (selectedType) {
        query = query.eq('type', selectedType);
      }

      if (priceRange) {
        query = query.gte('price_range', priceRange[0])
          .lte('price_range', priceRange[1]);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Transform the centers data to match the Event interface
      return data?.map(center => ({
        id: center.id,
        title: center.name,
        description: center.description || '',
        date: center.created_at,
        location: center.location || '',
        category: center.type || 'Center',
        image: center.placeholder_image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80',
        attendees: center.reviews?.length || 0,
        type: 'center' as const
      })) || [];
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search centers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Center type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gym">Gym</SelectItem>
            <SelectItem value="yoga">Yoga Studio</SelectItem>
            <SelectItem value="fitness">Fitness Center</SelectItem>
            <SelectItem value="sports">Sports Complex</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))
        ) : centers?.map((center) => (
          <CenterCard key={center.id} center={center} />
        ))}
      </div>
    </div>
  );
};

export default Centers;