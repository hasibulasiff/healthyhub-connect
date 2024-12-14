import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const ListingManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['listings', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('centers')
        .select('*')
        .eq('owner_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: Boolean(user?.id),
    meta: {
      onError: (error: Error) => {
        console.error('Listings error:', error);
        toast({
          title: "Error loading listings",
          description: "Could not load your listings. Please try again.",
          variant: "destructive"
        });
      }
    }
  });

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Listing Management</h1>

      <div className="grid gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : error ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-destructive">Error loading listings</p>
            </CardContent>
          </Card>
        ) : listings?.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">No listings found</p>
            </CardContent>
          </Card>
        ) : (
          listings?.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle>{listing.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{listing.description}</p>
                <p className="text-sm text-muted-foreground mt-2">Location: {listing.location}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ListingManagement;